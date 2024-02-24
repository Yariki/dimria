import json
from json import JSONEncoder

class AdvertDetailsResponse:

    def __init__(self, advert_id, city_name,  description, price, currency,floor, rooms_count) -> None:
        self.advert_id = advert_id
        self.city_name = city_name
        self.description = description
        self.price = price
        self.currency = currency
        self.floor = floor
        self.rooms_count = rooms_count


class AdvertDetailsResponseEncoder (JSONEncoder):

    def default(self, o):
        return o.__dict__
