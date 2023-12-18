import requests
import os
import logging

from dimria.models import SearchResponse, AdvertDetails

API_KEY = os.getenv("DIMRIA_API_KEY")

state_id = 2
city_ids = 2
n_id = 6696

SEARCH_URL = f"https://developers.ria.com/dom/search?category=1&realty_type=0&operation_type=1&state_id={state_id}&city_ids={city_ids}&api_key={API_KEY}&n_id={n_id}"


def search_adverts() -> SearchResponse:
    response = requests.get(SEARCH_URL)
    json = response.json()
    searchResponse: SearchResponse = SearchResponse(**json)

    if not searchResponse:
        logging.error("No adverts found")
        return None

    if searchResponse.count == 0:
        logging.error("No adverts found")
        return None

    logging.info(f"Found {searchResponse.count} adverts")
    return searchResponse


def get_details(advertId: int) -> AdvertDetails:
    details_url = f"https://developers.ria.com/dom/info/{advertId}?api_key={API_KEY}"

    response = requests.get(details_url)
    json = response.json()
    details: AdvertDetails = AdvertDetails(**json, advert_id=advertId)

    if not details:
        return None

    return details
