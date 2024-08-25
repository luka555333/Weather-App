import {defineStore} from "pinia";
import axios from "axios";
import {ref} from "vue";

export const useWeatherStore = defineStore('weahter', () => {
    const weather = ref(null)

    const fetchDataFromApi = async (city) => {
        try {
           const { data } = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=cee71b1b0f08435abfc112252222601&q=${city}&days=10&aqi=no&alerts=no`)
           weather.value = data
        } catch (e) {

        }
    }

    return {
        weather,
        fetchDataFromApi
    }
})