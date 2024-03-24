from datetime import datetime
import logging
import os

import requests
from dimria.cosmos_db import get_adverts, get_adverts_filtered
from dimria.models.AdvertDetailsRequest import AdvertDetailsResult
from dimria.models.AdvertDto import AdvertDto
from dimria.models.PriceDto import PriceDto

API_KEY = os.getenv("DIMRIA_API_KEY")


def get_adverts_statistics(cityId: int) -> list: # type: ignore

    adverts = get_adverts() if cityId == -1 else get_adverts_filtered(cityId)
    if not adverts:
        logging.error("No adverts found")
        return None

    groups = dict()

    for advert in adverts:
        if advert["advert_id"] not in groups.keys():
            groups[advert["advert_id"]] = []
            groups[advert["advert_id"]].append(advert)
        else:
            groups[advert["advert_id"]].append(advert)

    result = []

    for key, value in groups.items():
        value.sort(key=lambda x: datetime.strptime(x["created_at"], "%Y-%m-%d %H:%M:%S"))
        price1 = value[0]["price"]
        price2 = value[-1]["price"]

        prices : list = [] # type: ignore
        for advert in value:
            prices.append(PriceDto(price=advert["price"], date=advert["created_at"]))

        advertDto = AdvertDto(
            advert_id=key,
            city_name=value[0]["city_name"],
            rooms_count=value[0]["rooms_count"],
            direction=1 if price2 > price1 else -1 if price2 < price1 else 0,
            prices=prices)

        result.append(advertDto)

    return result


def get_http_advert_details(advert_id: int):
    details_url = f"https://developers.ria.com/dom/info/{advert_id}?api_key={API_KEY}"

    response = requests.get(details_url)

    if response.status_code != 200:
        return None

    json = response.json()

    if not json:
        return None

    return json
