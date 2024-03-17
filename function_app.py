import json
import azure.functions as func
from datetime import datetime
import logging
import time
from pydantic.tools import parse_obj_as
from dimria.cosmos_db import process_advert

from dimria.dimria_requests import search_adverts, get_advert_details
from dimria.handle_details import build_ptoho_url, parse_photos, build_main_advert_url
from dimria.models.AdvertDetails import AdvertDetails
from dimria.models.AdvertsList import AdvertsList
from dimria.models.AdvertDetailsResponse import AdvertDetailsResponse, AdvertDetailsResponseEncoder
from dimria.models.AdvertDtoEncoder import AdvertDtoEncoder
from dimria.requests_handle import get_adverts_statistics, get_http_advert_details
from dimria.service_bus import send_advert_detail_message, send_advert_list_message

app = func.FunctionApp()

################################################################################################

# @app.route(route="search_adverts", auth_level=func.AuthLevel.ANONYMOUS)
@app.schedule(schedule="0 */30 * * * *", arg_name="mytimer", run_on_startup=True, use_monitor=False)
def timer_search_adverts(mytimer: func.TimerRequest) -> None: # req: func.HttpRequest  func.HttpResponse: # # mytimer: func.TimerRequest

    searchResponse = search_adverts()
    if not searchResponse:
        logging.error("No adverts found")
        return None

    if searchResponse.count > 0:
        logging.info("Send message about adverts")
        advertList = AdvertsList(items=searchResponse.items)
        send_advert_list_message(advertList)

################################################################################################

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
        details = get_advert_details(advertId)
        if details is not None:
            logging.info(f"City: {details.city_id}: Rooms: {details.rooms_count}: Price: {details.currency_type_uk}{details.price}")
            send_advert_detail_message(details)
        else:
            logging.error(f"Error getting details for advert {advertId}")

################################################################################################

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

################################################################################################

@app.route("get_advertisements", methods=["GET"], auth_level=func.AuthLevel.ANONYMOUS)
def get_advertisements(req: func.HttpRequest) -> func.HttpResponse:

    results = get_adverts_statistics()

    if(results is None):
        return func.HttpResponse("No adverts found", status_code=404)

    data = json.dumps(results, cls=AdvertDtoEncoder)
    return data

################################################################################################

@app.route("get_advert_details/{id:int?}", methods=["GET"], auth_level=func.AuthLevel.ANONYMOUS )
def get_advert_details(req: func.HttpRequest) -> func.HttpResponse:

    advert_id = req.route_params.get('id')

    if(advert_id is None):
        return func.HttpResponse("No advert id found", status_code=404)

    resultRequest = get_http_advert_details(advert_id)

    if(resultRequest is None):
        return func.HttpResponse("No advert details found", status_code=404)

    print(resultRequest)

    cityName = resultRequest['city_name']
    state_id = resultRequest['state_id']
    city_id = resultRequest['city_id']
    currency_type_id = resultRequest['currency_type_id']
    price = resultRequest['price']
    rooms_count = resultRequest['rooms_count']
    currency_type_uk = resultRequest['currency_type_uk']
    description = resultRequest['description_uk']
    floor=resultRequest['floor']
    photos = parse_photos(resultRequest['photos'])
    main_photo = build_ptoho_url(resultRequest['main_photo'])
    lat = resultRequest['latitude']
    lon = resultRequest['longitude']
    building_name = resultRequest['user_newbuild_name']
    url = build_main_advert_url(resultRequest['beautiful_url'])

    resultResponse: AdvertDetailsResponse = AdvertDetailsResponse(
        advert_id,
        cityName,
        price,
        rooms_count,
        currency_type_uk,
        description,
        floor,
        main_photo,
        lat,
        lon,
        building_name,
        url,
        photos
    )

    data = json.dumps(resultResponse, cls=AdvertDetailsResponseEncoder)
    return data
