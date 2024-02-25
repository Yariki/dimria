import axios from 'axios';

export const fetchAdverts = async () => {
    return await axios.get('https://dimria-advert-prices.azurewebsites.net/api/get_advertisements');
}

export const fetchAdvertDetails = async (advertId: string) => {
    return await axios.get(`https://dimria-advert-prices.azurewebsites.net/api/get_advert_details/${advertId}`);
}
