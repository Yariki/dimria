from pydantic import BaseModel


class SearchResponse(BaseModel):
    count: int
    items: list[int]
