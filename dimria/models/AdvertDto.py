from dimria.models.PriceDto import PriceDto


class AdvertDto ():
    advert_id: int
    city_name: str
    rooms_count: int
    direction: int
    prices: list[PriceDto] = []

    def __init__(self, advert_id, city_name, rooms_count, direction, prices) -> None:
        self.advert_id = advert_id
        self.city_name = city_name
        self.rooms_count = rooms_count
        self.direction = direction
        self.prices = prices


