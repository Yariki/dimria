import requests
import os
import logging
from pydantic.tools import parse_obj_as

from dimria.models.searchresponse import SearchResponse
from dimria.models.AdvertDetails import AdvertDetails

API_KEY = os.getenv("DIMRIA_API_KEY")

search_items = [
    {
        'state_id': 2,
        'city_id': 2,
        'n_id': 6696
    },
    {
        'state_id': 10,
        'city_id': 17306,
        'n_id': None
    }
]

def search_adverts() -> SearchResponse:

    count = 0
    items = []


    for item in search_items:

        url = _get_url(item.get('state_id'), item.get('city_id'), item.get('n_id'))

        response = requests.get(url)

        advertDetails = response.json()

        count += advertDetails["count"]
        items.extend(advertDetails["items"])

    searchResponse = SearchResponse(
        count=count,
        items=items
    )

    if not searchResponse:
        logging.error("No adverts found")
        return None

    if searchResponse.count == 0: 
        logging.error("No adverts found")
        return None

    logging.info(f"Found {searchResponse.count} adverts")
    return searchResponse


def get_advert_details(advertId: int) -> AdvertDetails:
    details_url = f"https://developers.ria.com/dom/info/{advertId}?api_key={API_KEY}"

    response = requests.get(details_url)
    json = response.json()
    details: AdvertDetails = AdvertDetails(**json, advert_id=advertId)

    if not details:
        return None

    return details



def _get_url(state_id, city_id, n_id = None):

    if n_id is None:
        return f"https://developers.ria.com/dom/search?category=1&realty_type=0&operation_type=1&state_id={state_id}&city_ids={city_id}&api_key={API_KEY}"

    return  f"https://developers.ria.com/dom/search?category=1&realty_type=0&operation_type=1&state_id={state_id}&city_ids={city_id}&api_key={API_KEY}&n_id={n_id}"
