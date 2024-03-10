import json
from json import JSONEncoder

class SearchResponse:

    def __init__(self, count, items) -> None:
        self.count = count
        self.items = items


class SearchResponseEncoder (JSONEncoder):

    def default(self, o):
        return o.__dict__