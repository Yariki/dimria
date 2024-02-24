from typing import List, Dict
from datetime import datetime
from pydantic import BaseModel


class Agency (BaseModel):
    agency_id: int
    agency_type: int
    good_partner: str
    logo: str
    name: str
    state_id: str
    user_id: int


class TagUk (BaseModel):
    tag_id: str
    tag_synonym: str


class User(BaseModel):
    good_partner_top: str
    image: str
    name: str

class AdvertDetailsResult(BaseModel):
    city_name: str
    street_id: int
    realty_type_name: str
    currency_type_uk: str
    state_id: int
    living_square_meters: int
    partner_id: int
    agency: Agency
    price_total: int
    beautiful_url: str
    realty_type_id: int
    city_name_uk: str
    range_factor_top_quality: int
    number_not_assigned: int
    advert_type_name: str
    is_binotel: int
    wall_type_uk: str
    date_end_ts: int
    user: User
    street_name_uk: str
    realty_type_name_uk: str
    kitchen_square_meters: int
    secondary_utp: List[str]
    city_id: int
    youtube_link: str
    web_id: str
    realty_type_parent_id: int
    street_name: str
    is_bargain: int
    building_number_str: str
    is_calltracking: int
    flat_number: int
    created_at: datetime
    latitude: float
    advert_type_id: int
    wall_type: str
    publishing_date_ts: int
    user_newbuild_id: int
    date_end: datetime
    currency_type_id: int
    photos_count: int
    updated_at_ts: int
    price_type_uk: str
    description_uk: str
    total_square_meters: int
    location: str
    price_type: str
    district_id: int
    return_on_moderation_date_ts: int
    is_exclusive: int
    user_newbuild_name: str
    add_form_version: int
    deleted_by: str
    quality: int
    show_on_map: int
    realty_type_parent_name_uk: str
    moderation_date_ts: int
    user_id: int
    price: int
    rooms_count: int
    price_arr: Dict[str, str]
    realty_sale_type: int
    price_item_arr: Dict[str, int]
    agency_id: int
    is_developer: int
    district_name_uk: str
    radius_location: int
    complete_time: float
    district_type_name: str
    publishing_date: datetime
    realty_type_parent_name: str
    created_at_ts: int
    advert_publish_type: int
    longitude: float
    floor_info: str
    currency_type: str
    realtor_verified: bool
    user_newbuild_name_uk: str
    description: str
    district_name: str
    state_name: str
    advert_type_name_uk: str
    price_item: int
    publishing_date_info: str
    newbuild_id: int
    call_price: int
    tag_uk: List[TagUk]
    floor: int
    realty_id: int
    is_notepad: bool
    state_name_uk: str
    agency_verified: bool
    user_package_id: int
    is_commercial: int
    main_photo: str
    floors_count: int
    district_type_id: int