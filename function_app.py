import json
import azure.functions as func
from datetime import datetime
import logging
import time
from pydantic.tools import parse_obj_as
from dimria.cosmos_db import process_advert

from dimria.dimria_requests import get_http_cities, search_adverts, get_advert_details
from dimria.handle_details import build_ptoho_url, parse_photos, build_main_advert_url
from dimria.models.AdvertDetails import AdvertDetails, parse_details_from_json
from dimria.models.AdvertsList import AdvertsList
from dimria.models.AdvertDetailsResponse import AdvertDetailsResponse, AdvertDetailsResponseEncoder
from dimria.models.AdvertDtoEncoder import AdvertDtoEncoder
from dimria.requests_handle import get_adverts_statistics, get_http_advert_details
from dimria.service_bus import send_advert_detail_message, send_advert_list_message

HEADERS = {
            "Access-Control-Allow-Origin" : "*",
            "Access-Control-Allow-Credentials" : "true",
            "Access-Control-Allow-Methods" : "GET, POST, OPTIONS",
            "Access-Control-Allow-Headers" : "Origin, Content-Type, Accept"}

app = func.FunctionApp()

################################################################################################

# @app.route(route="search_adverts", auth_level=func.AuthLevel.ANONYMOUS)
#@app.schedule(schedule="0 */30 * * * *", arg_name="mytimer", run_on_startup=True, use_monitor=False)
def timer_search_adverts(mytimer: func.TimerRequest) -> None: # req: func.HttpRequest  func.HttpResponse: #  mytimer: func.TimerRequest -> None:

    searchResponse = search_adverts()
    if not searchResponse:
        logging.error("No adverts found")
        return None

    if searchResponse.count > 0:
        logging.info("Send message about adverts")
        advertList = AdvertsList(items=searchResponse.items)
        send_advert_list_message(advertList)

    # return func.HttpResponse(f"Found {searchResponse.count} adverts", status_code=200)

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
        details = get_http_advert_details(advertId)
        if details is not None:
            details = parse_details_from_json(details, advertId)
            # logging.info(f"City: {details["city_id"]}: Rooms: {details["rooms_count"]}: Price: {details["currency_type_uk"]}{details["price"]}")
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
        advert = parse_details_from_json(json_data)

        process_advert(advert)
    except Exception as e:
        logging.error(f"Error processing advert: {e}")

################################################################################################

@app.route("get_advertisements/{cityId:int?}", methods=["GET"], auth_level=func.AuthLevel.ANONYMOUS)
def get_advertisements(req: func.HttpRequest) -> func.HttpResponse:

    cityId = req.route_params.get('cityId')

    if(cityId is None):
        cityId = -1

    results = get_adverts_statistics(int(cityId))

    if(results is None):
        return func.HttpResponse("No adverts found", status_code=404, headers=HEADERS)

    data = json.dumps(results, cls=AdvertDtoEncoder)

    return func.HttpResponse(data, status_code=200, headers=HEADERS)

################################################################################################

@app.route("get_advert_details/{id:int?}", methods=["GET"], auth_level=func.AuthLevel.ANONYMOUS )
def get_advert_details(req: func.HttpRequest) -> func.HttpResponse:

    advert_id = req.route_params.get('id')

    if(advert_id is None):
        return func.HttpResponse("No advert id found", status_code=404, headers=HEADERS)

    resultRequest = get_http_advert_details(advert_id)

    if(resultRequest is None):
        return func.HttpResponse(f"No advert details found for advert id - {advert_id}", status_code=404, headers=HEADERS)

    # print(resultRequest)

    cityName = resultRequest['city_name'] if 'city_name' in resultRequest else 'Unknown'
    state_id = resultRequest['state_id'] if 'state_id' in resultRequest else 0
    city_id = resultRequest['city_id'] if 'city_id' in resultRequest else 0
    currency_type_id = resultRequest['currency_type_id'] if 'currency_type_id' in resultRequest else 0
    price = resultRequest['price'] if 'price' in resultRequest else 0
    rooms_count = resultRequest['rooms_count'] if 'rooms_count' in resultRequest else 0
    currency_type_uk = resultRequest['currency_type_uk'] if 'currency_type_uk' in resultRequest else '$'
    description = resultRequest['description_uk'] if 'description_uk' in resultRequest else ''
    floor=resultRequest['floor'] if 'floor' in resultRequest else 0
    photos = parse_photos(resultRequest['photos']) if 'photos' in resultRequest else []
    main_photo = build_ptoho_url(resultRequest['main_photo']) if 'main_photo' in resultRequest else ''
    lat = resultRequest['latitude'] if 'latitude' in resultRequest else 0
    lon = resultRequest['longitude'] if 'longitude' in resultRequest else 0
    building_name = resultRequest['user_newbuild_name'] if 'user_newbuild_name' in resultRequest else ''
    url = build_main_advert_url(resultRequest['beautiful_url']) if 'beautiful_url' in resultRequest else ''

    resultResponse: AdvertDetailsResponse = AdvertDetailsResponse(
        advert_id,
        city_name=cityName,
        price=price,
        rooms_count=rooms_count,
        currency=currency_type_uk,
        description=description,
        floor=floor,
        main_photo=main_photo,
        lat=lat,
        lon=lon,
        building_name=building_name,
        url=url,
        photos=photos
    )

    data = json.dumps(resultResponse, cls=AdvertDetailsResponseEncoder)

    return func.HttpResponse(data, status_code=200, headers=HEADERS)

@app.route("get_cities", methods=["GET"], auth_level=func.AuthLevel.ANONYMOUS )
def get_cities(req: func.HttpRequest) -> func.HttpResponse:
    items = get_http_cities()

    return func.HttpResponse(json.dumps(items), status_code=200, headers=HEADERS)

