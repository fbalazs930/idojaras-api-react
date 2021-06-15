import axios from 'axios';

const baseUrl = 'http://api.openweathermap.org/data/2.5/weather?';
const apiKey = '2cbb02872cc7e2a1ee53454e4b98b7db';

export const api = async (city) => {
    try{
        const {data} = await axios.get(baseUrl + `q=${city}&appid=${apiKey}`);
        return data;
    }catch(error) {
        throw error;
    }
}