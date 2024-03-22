from pydantic import BaseModel


class AdvertDetails(BaseModel):
    advert_id: int
    city_name: str
    state_id: int
    city_id: int
    currency_type_id: int
    price: int
    rooms_count: int
    currency_type_uk: str
    """$"""

def parse_details_from_json(json_details, advert_id = -1) -> AdvertDetails:
    return AdvertDetails(
        advert_id=json_details['advert_id'] if advert_id == -1 else advert_id,
        city_name=json_details['city_name'] if 'city_name' in json_details else 'Unknown',
        state_id=json_details['state_id'] if 'state_id' in json_details else 0,
        city_id=json_details['city_id'] if 'city_id' in json_details else 0,
        currency_type_id=json_details['currency_type_id'] if 'currency_type_id' in json_details else 0,
        price=json_details['price'] if 'price' in json_details else 0,
        rooms_count=json_details['rooms_count'] if 'rooms_count' in json_details else 0,
        currency_type_uk=json_details['currency_type_uk'] if 'currency_type_uk' in json_details else '$'
    )

