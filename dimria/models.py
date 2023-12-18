from pydantic import BaseModel

class SearchResponse(BaseModel):
    count: int
    items: list[int]


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

class AdvertsList(BaseModel):
    items: list[int]
