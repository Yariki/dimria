
export interface AdvertDetailsDto{
    advert_id: number;
    city_name: string;
    description: string;
    price: number;
    currency: string;
    floor: string;
    rooms_count: number;
    main_photo: string;
    lat?: number;
    lon?: number;
    building_name: string;
    url: string;
    photos: string[][];
}