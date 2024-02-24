import json
from json import JSONEncoder

class AdvertDtoEncoder(JSONEncoder):

    def default(self, o):
        return o.__dict__