import axios from "axios";


export default function getWeather (city) {
    const url = `${import.meta.env.VITE_API_WEATHER}?q=${city}&appid=${import.meta.env.VITE_API_WEATHER_KEY}`
    return axios.get(url)
}