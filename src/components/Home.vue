<template>
    <div class="main-container">
      <div class="search-weather">
        <input
            type="text"
            placeholder="Enter city name..."
            class="input-search"
            v-model="city"
            @keyup.enter="getWeather()"
        >
      </div>
      <div v-if="error" class="error-p">
        Sorry, the city that you searched doesn't exist. <br> Please try again.
      </div>
      <div class="location-and-date">
          <p class="searched-town-p">{{ weather.city }}</p>
          <p class="date-p">{{ getDate() }}</p>
      </div>
      <div class="searched-weather">
        <div class="weather-of-searched-town">
          <div class="temperature-img">
          <img :src="WEATHER_ICON_MAP[getCurrentWeather()]" />
          </div>
          <div class="temperature-in-town">
            <p> {{ Math.round(weather.temperature) }}&#8451; </p>
            <div class="text-temperature">
            <p class="">{{ weather.forecast }}</p>
            </div>
          </div>
        </div>
        <div class="weather-in-details">
          <div class="weather-in-details-inner">
            <div class="highest">
              <p>{{ Math.round(weather.temp_max) }}&deg;</p>
              <p class="weather-text-inner">Highest</p>
            </div>
            <div class="lowest">
              <p>{{ Math.round(weather.temp_min) }}&deg;</p>
              <p class="weather-text-inner">Lowest</p>
            </div>
            <div class="rain">
              <p>{{ Math.round(weather.feels_like) }}&deg;</p>
              <p class="weather-text-inner">Feels like</p>
            </div>
          </div>
          <div class="weather-in-details-inner">
            <div class="highest">
              <p>{{ weather.sunset }}</p>
              <p class="weather-text-inner">Sunset</p>
            </div>
            <div class="lowest">
              <p>{{ weather.sunrise }}</p>
              <p class="weather-text-inner">Sunrise</p>
            </div>
            <div class="rain">
              <p>{{ weather.wind}} m/s</p>
              <p class="weather-text-inner">Wind</p>
            </div>
          </div>
        </div>
      </div>
      <p class="todays-weather-text">Todays weather</p>
      <div class="todays-weather">
        <div class="todays-days" v-for="hour in weatherByTimeOfTheDay" :key="hour" >
          <p class="todays-p">{{ hour }}h</p>
          <div class="todays-svg">
          <img :src="WEATHER_ICON_MAP[getWeatherTypeByHour(hour)]" />
          </div>
          <p class="todays-p">{{ Math.round( weatherTime[hour][`temperature_at_${hour}h`] ) }}&#176;</p>
        </div>
      </div>
     <p class="next-2-days-p">Next 2 days</p>
     <div class="next-2-days" v-if="weatherDay?.length">
       <div v-for="day in weatherByDay" :key="day" class="next-2-days-inner">
         <div class="weather-for-2-days">
           <p class="weather-for-2-days-first-p">{{ getDayForNextTwoDays(day) }}</p>
           <p class="weather-for-2-days-second-p">{{ getDateForNextTwoDays(day) }}</p>
         </div>
         <div class="weather-for-2-days weather-for-2-days-svg">
          <img :src="WEATHER_ICON_MAP[getWeatherTypeByDays(day)]">
         </div>
         <div class="weather-for-2-days">
           <p class="weather-for-2-days-first-p">{{ Math.round(weatherDay[day].temp_min_today) }}&deg;</p>
           <p class="weather-for-2-days-second-p">Lowest</p>
         </div>
         <div class="weather-for-2-days">
           <p class="weather-for-2-days-first-p">{{ Math.round(weatherDay[day].temp_max_today) }}&deg;</p>
           <p class="weather-for-2-days-second-p">Highest</p>
         </div>
         <div class="weather-for-2-days">
           <p class="weather-for-2-days-first-p">{{ weatherDay[day].max_wind }} m/s</p>
           <p class="weather-for-2-days-second-p">Wind</p>
         </div>
         <div class="weather-for-2-days">
           <p class="weather-for-2-days-first-p">{{ Math.round(weatherDay[day].feels_like_today) }}&deg;</p>
           <p class="weather-for-2-days-second-p">Feels like</p>
         </div>
       </div>
     </div>
    </div>
</template>

<script setup>

import {onMounted, ref} from "vue";
import {useWeatherStore} from "@/store/weather.js";
import {WEATHER_ICON_MAP} from "@/constants/index.js";
const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
const months = ['January','February','March','April','May','June','July','August','September','October','November','December']
const weatherByTimeOfTheDay = [3,6,9,12,15,18,21]
const weatherByDay = [0,1]
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
    weatherByTimeOfTheDay.forEach(time => {
      weatherTime.value[time] ={
        [`forecast_${time}h`]: weatherStore.weather.forecast.forecastday[0].hour[time].condition.text,
        [`temperature_at_${time}h`]: weatherStore.weather.forecast.forecastday[0].hour[time].temp_c,
      }

    })
    weatherByDay.forEach(days => {
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
  weatherByTimeOfTheDay.forEach(time => {
    weatherTime.value[time] ={
      [`forecast_${time}h`]: 0,
      [`temperature_at_${time}h`]: 0
    }
  })
  return weatherTime.value;
}

function catchErrorForDailyWeather(){
  weatherByDay.forEach(days => {
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

function getWeatherTypeByHour(hour){
  return weatherTime.value[hour]?.[`forecast_${hour}h`];
}

function getCurrentWeather(){
  return weather.value.forecast;
}

function getWeatherTypeByDays(days){
  return weatherDay.value[days]?.forecast_today;
}

function getDate(){
  let date = new Date();
  return days[date.getDay()] + ' ' + date.getDate() + ' ' + months[date.getMonth()];
}

function getDayForNextTwoDays(day){
  let date = new Date(weatherDay.value[day].date)
  return days[date.getDay()];
}

function getDateForNextTwoDays(days){
  return weatherDay.value[days]?.date?.split('').slice(5).join('')
}

getWeather()
catchErrorForHourlyWeather();
catchErrorForMainWeather();

</script>

<style lang="scss">
@import '../assets/style';
</style>