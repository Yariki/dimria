import axios from 'axios';

export const fetchAdverts = async (cityId: number) => {
    //return await axios.get('https://dimria-advert-prices.azurewebsites.net/api/get_advertisements');
    return await axios.get(`http://localhost:7071/api/get_advertisements/${cityId}`);
}

export const fetchAdvertDetails = async (advertId: string) => {
    //return await axios.get(`https://dimria-advert-prices.azurewebsites.net/api/get_advert_details/${advertId}`);
    return await axios.get(`http://localhost:7071/api/get_advert_details/${advertId}`);
}

export const fetchCities = async () => {
    //return await axios.get('https://dimria-advert-prices.azurewebsites.net/api/get_cities');
    return await axios.get('http://localhost:7071/api/get_cities');
}


export const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

