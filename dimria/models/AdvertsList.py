from pydantic import BaseModel


class AdvertsList(BaseModel):
    items: list[int]