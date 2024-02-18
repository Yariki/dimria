import axios from 'axios';

export const fetchAdverts = async () => {
    return await axios.get('https://dimria-advert-prices.azurewebsites.net/api/get_advertisements');
}
