import json
import azure.functions as func
from datetime import datetime
import logging
import time
from pydantic.tools import parse_obj_as
from dimria.cosmos_db import process_advert, get_adverts

from dimria.dimria_requests import get_details, search_adverts
from dimria.models import AdvertDetails, AdvertsList
from dimria.service_bus import send_advert_detail_message, send_advert_list_message

app = func.FunctionApp()

#@app.route(route="search_adverts", auth_level=func.AuthLevel.ANONYMOUS)
@app.schedule(schedule="0 */30 * * * *", arg_name="mytimer", run_on_startup=True, use_monitor=False)
def timer_search_adverts(mytimer: func.TimerRequest) -> None:

    searchResponse = search_adverts()
    if not searchResponse:
        logging.error("No adverts found")
        return None

    if searchResponse.count > 0:
        logging.info("Send message about adverts")
        advertList = AdvertsList(items=searchResponse.items)
        send_advert_list_message(advertList)


@app.function_name("adverts_list_message_handler")
@app.service_bus_queue_trigger(
    arg_name="msg",
    queue_name="advertisements",
    connection="SERVICE_BUS_CONNECTION_STRING_SEND_LISTEN")
def adverts_list_message_handler(msg: func.ServiceBusMessage):

    str_data = msg.get_body().decode('utf-8')
    json_data = json.loads(str_data)
    advertList = parse_obj_as(AdvertsList, json_data)

    logging.info(f"Received message: {advertList}")

    if not advertList or advertList.items is None:
        logging.error("No adverts revceived")
        return

    for advertId in advertList.items:
        logging.info(f"Get details for advert {advertId}")
        details = get_details(advertId)
        if details is not None:
            logging.info(f"City: {details.city_id}: Rooms: {details.rooms_count}: Price: {details.currency_type_uk}{details.price}")
            send_advert_detail_message(details)
        else:
            logging.error(f"Error getting details for advert {advertId}")



@app.function_name("advert_details_save_db")
@app.service_bus_queue_trigger(
    arg_name="msg",
    queue_name="advert_details",
    connection="SERVICE_BUS_CONNECTION_STRING_SEND_LISTEN")
def advert_details_save_db(msg: func.ServiceBusMessage):

    try:
        str_data = msg.get_body().decode('utf-8')
        json_data = json.loads(str_data)
        advert = parse_obj_as(AdvertDetails, json_data)

        process_advert(advert)
    except Exception as e:
        logging.error(f"Error processing advert: {e}")


@app.route("get_advertisements", methods=["GET"], auth_level=func.AuthLevel.ANONYMOUS)
def get_advertisements(req: func.HttpRequest) -> func.HttpResponse:

    adverts = get_adverts()
    if not adverts:
        logging.error("No adverts found")
        return None

    results = dict()

    for advert in adverts:
        if advert["advert_id"] not in results.keys():
            results[advert["advert_id"]] = []
            results[advert["advert_id"]].append(advert)
        else:
            results[advert["advert_id"]].append(advert)

    data = json.dumps(results)

    return data
