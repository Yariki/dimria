
export interface PriceDto {
    price: number;
    date: string;
    currency: string;
}

export interface AdvertDto {
    advert_id: number;
    city_name: string;
    room_count: number;
    direction: number;
    prices: PriceDto[] | null;
}