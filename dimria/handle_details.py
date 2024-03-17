
def build_ptoho_url(file):
    split = file.split(".")
    file = split[0] + "xl." + split[1]
    return f'https://cdn.riastatic.com/photos/{file}'

def parse_photos(photos) -> []:
    result = []
    for photoId in photos:
        photo = photos[photoId]
        result.append(build_ptoho_url(photo["file"]))
    return result

def build_main_advert_url(url):
    return f'https://dom.ria.com/uk/{url}'
