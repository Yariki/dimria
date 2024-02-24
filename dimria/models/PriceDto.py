

class PriceDto():
    price: float
    date: str
    currency: str = "$"

    def __init__(self, price, date, currency = "$") -> None:
        self.price = price
        self.date = date
        self.currency = currency
