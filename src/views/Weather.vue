<template>
    <div class="main-container">
      <div class="search-weather">
        <WeatherTownInput v-model="city" @keyup.enter="getWeather()"/>
      </div>
      <div v-if="error" class="error-p">
        Sorry, the city that you searched doesn't exist. <br> Please try again.
      </div>
      <WeatherBasicInfo :weather />
      <WeatherToday v-if="weatherTime.length" :weather-time="weatherTime" />
      <WeatherInNextTwoDays v-if="weatherDay?.length" :weather-day="weatherDay" />
    </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {useWeatherStore} from "@/store/weather.js";
import {WEATHER_BY_DAY, WEATHER_BY_TIME_OF_THE_DAY, WEATHER_ICON_MAP} from "@/constants/index.js";
import WeatherToday from "@/components/WeatherToday.vue";
import WeatherInNextTwoDays from "@/components/WeatherInNextTwoDays.vue";
import WeatherBasicInfo from "@/components/WeatherBasicInfo.vue";
import WeatherTownInput from "@/components/WeatherTownInput.vue";

const city = ref('belgrade')
const weather = ref(null)
const weatherTime = ref([])
const weatherDay = ref([])
const error = ref(false)
const weatherStore = useWeatherStore()

async function getWeather() {
  try {
    await weatherStore.fetchDataFromApi(city.value)
    error.value = false;
    fillWeatherObjectWithApiData();
    WEATHER_BY_TIME_OF_THE_DAY.forEach(time => {
      weatherTime.value[time] ={
        [`forecast_${time}h`]: weatherStore.weather.forecast.forecastday[0].hour[time].condition.text,
        [`temperature_at_${time}h`]: weatherStore.weather.forecast.forecastday[0].hour[time].temp_c,
      }

    })
    WEATHER_BY_DAY.forEach(days => {
      weatherDay.value[days] = {
        temp_min_today: weatherStore.weather.forecast.forecastday[days].day.mintemp_c,
        temp_max_today: weatherStore.weather.forecast.forecastday[days].day.maxtemp_c,
        max_wind: weatherStore.weather.forecast.forecastday[days].day.maxwind_mph,
        forecast_today: weatherStore.weather.forecast.forecastday[days].day.condition.text,
        feels_like_today: weatherStore.weather.forecast.forecastday[days].hour[18].feelslike_c,
        date: weatherStore.weather.forecast.forecastday[days].date
      }
    })
  } catch (err) {
    error.value = true;
    catchErrorForHourlyWeather();
    catchErrorForDailyWeather();
    catchErrorForMainWeather();
    city.value = '';
  }

}

function catchErrorForHourlyWeather(){
  WEATHER_BY_TIME_OF_THE_DAY.forEach(time => {
    weatherTime.value[time] ={
      [`forecast_${time}h`]: 0,
      [`temperature_at_${time}h`]: 0
    }
  })
  return weatherTime.value;
}

function catchErrorForDailyWeather(){
  WEATHER_BY_DAY.forEach(days => {
    weatherDay.value[days] = {
      temp_min_today: 0,
      temp_max_today: 0,
      feels_like_today: 0,
      forecast_today: 'Unknown',
    }
  })
}
function catchErrorForMainWeather(){
  weather.value = {
    city: 'Unknown',
    temperature: 0,
    forecast: 'Unknown',
    temp_min: 0,
    temp_max: 0,
    wind: 0,
    sunrise: 'Unknown',
    sunset: 'Unknown',
    feels_like: 0
  }
}

function fillWeatherObjectWithApiData(){
  weather.value = {
    city: weatherStore.weather.location.name,
    temperature: weatherStore.weather.current.temp_c,
    forecast: weatherStore.weather.current.condition.text,
    temp_min: weatherStore.weather.forecast.forecastday[0].day.mintemp_c,
    temp_max: weatherStore.weather.forecast.forecastday[0].day.maxtemp_c,
    wind: weatherStore.weather.current.wind_mph,
    sunrise: weatherStore.weather.forecast.forecastday[0].astro.sunrise,
    sunset: weatherStore.weather.forecast.forecastday[0].astro.sunset,
    feels_like: weatherStore.weather.current.feelslike_c
  }
}

getWeather()
</script>

<style lang="scss">
@import '../assets/style';
</style>