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
          <img src="../assets/animated/cloudy.svg" v-if="getCurrentWeather() === 'Cloudy' || getCurrentWeather() === 'Overcast'">
          <img src="../assets/animated/snowy-6.svg" v-if="getCurrentWeather() === 'Moderate snow' || getCurrentWeather() === 'Snow' || getCurrentWeather() === 'Light snow' || getCurrentWeather() === 'Light snow showers'">
          <img src="../assets/animated/rainy-7.svg" v-if="getCurrentWeather() === 'Heavy rain' || getCurrentWeather() === 'Light rain showers' || getCurrentWeather() === 'Moderate rain' || getCurrentWeather() === 'Light rain shower' || getCurrentWeather() === 'Light freezing rain'">
          <img src="../assets/animated/day.svg" v-if="getCurrentWeather() === 'Clear' || getCurrentWeather() === 'Sunny'">
          <img src="../assets/animated/mist.svg" v-if="getCurrentWeather() === 'Mist'">
          <img src="../assets/animated/fog.svg" v-if="getCurrentWeather() === 'Fog' || getCurrentWeather() === 'Freezing fog'"> 
          <img src="../assets/animated/rainy-4.svg" v-if="getCurrentWeather() === 'Drizzle' || getCurrentWeather() === 'Light rain' || getCurrentWeather() === 'Light drizzle' || getCurrentWeather() === 'Rainy' || getCurrentWeather() === 'Patchy light drizzle' || getCurrentWeather() === 'Patchy light rain'">
          <img src="../assets/animated/partly-cloudy-day.svg" v-if="getCurrentWeather() === 'Partly cloudy'"> 
          <img src="../assets/animated/extreme-snow.svg" v-if="getCurrentWeather() === 'Heavy snow' || getCurrentWeather() === 'Moderate or heavy snow showers' || getCurrentWeather() === 'Patchy moderate snow'">
          <img src="../assets/animated/sleet.svg" v-if="getCurrentWeather() === 'Light sleet' || getCurrentWeather() === 'Light sleet showers'">
          <img src="../assets/animated/patchy_rain_possible.svg" v-if="getCurrentWeather() === 'Patchy rain possible'">
          <img src="../assets/animated/thunderstorms-extreme.svg" v-if="getCurrentWeather() === 'Thundery outbreaks possible'">
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
        <div class="todays-days" v-for="hour in weatherTimes" :key="hour" >
          <p class="todays-p">{{ hour }}h</p>
          <div class="todays-svg">
          <img src="../assets/animated/cloudy.svg" v-if="getWeatherTypeByHour(hour) === 'Cloudy' || getWeatherTypeByHour(hour) === 'Overcast'">
          <img src="../assets/animated/snowy-6.svg" v-if="getWeatherTypeByHour(hour) === 'Moderate snow' || getWeatherTypeByHour(hour) === 'Snow' || getWeatherTypeByHour(hour) === 'Light snow' || getWeatherTypeByHour(hour) === 'Light snow showers'">
          <img src="../assets/animated/rainy-7.svg" v-if="getWeatherTypeByHour(hour) === 'Heavy rain' || getWeatherTypeByHour(hour) === 'Light rain showers' || getWeatherTypeByHour(hour) === 'Moderate rain' || getWeatherTypeByHour(hour) === 'Light rain shower' || getWeatherTypeByHour(hour) === 'Light freezing rain'">
          <img src="../assets/animated/day.svg" v-if="getWeatherTypeByHour(hour) === 'Clear' || getWeatherTypeByHour(hour) === 'Sunny'">
          <img src="../assets/animated/mist.svg" v-if="getWeatherTypeByHour(hour) === 'Mist'">
          <img src="../assets/animated/fog.svg" v-if="getWeatherTypeByHour(hour) === 'Fog' || getWeatherTypeByHour(hour) === 'Freezing fog'"> 
          <img src="../assets/animated/rainy-4.svg" v-if="getWeatherTypeByHour(hour) === 'Drizzle' || getWeatherTypeByHour(hour) === 'Rainy' || getWeatherTypeByHour(hour) === 'Light rain' || getWeatherTypeByHour(hour) === 'Light drizzle' || getWeatherTypeByHour(hour) === 'Patchy light drizzle' || getWeatherTypeByHour(hour) === 'Patchy light rain'">
          <img src="../assets/animated/partly-cloudy-day.svg" v-if="getWeatherTypeByHour(hour) === 'Partly cloudy'"> 
          <img src="../assets/animated/extreme-snow.svg" v-if="getWeatherTypeByHour(hour) === 'Heavy snow' || getWeatherTypeByHour(hour) === 'Moderate or heavy snow showers' || getWeatherTypeByHour(hour) === 'Patchy moderate snow'">
          <img src="../assets/animated/sleet.svg" v-if="getWeatherTypeByHour(hour) === 'Light sleet' || getWeatherTypeByHour(hour) === 'Light sleet showers'">
          <img src="../assets/animated/patchy_rain_possible.svg" v-if="getWeatherTypeByHour(hour) === 'Patchy rain possible'">
          <img src="../assets/animated/thunderstorms-extreme.svg" v-if="getWeatherTypeByHour(hour) === 'Thundery outbreaks possible'">
          </div>
          <p class="todays-p">{{ Math.round( weatherTime[hour][`temperature_at_${hour}h`] ) }}&#176;</p>
        </div>
      </div>
     <p class="next-2-days-p">Next 2 days</p>
     <div class="next-2-days" v-if="weatherDay?.length">
       <div v-for="days in weatherDays" :key="days" class="next-2-days-inner">
         <div class="weather-for-2-days">
           <p class="weather-for-2-days-first-p">{{ getDayForNextTwoDays(days) }}</p>
           <p class="weather-for-2-days-second-p">{{ getDateForNextTwoDays(days) }}</p>
         </div>
         <div class="weather-for-2-days weather-for-2-days-svg">
          <img src="../assets/animated/cloudy.svg" v-if="getWeatherTypeByDays(days) === 'Cloudy' || getWeatherTypeByDays(days) === 'Overcast'">
          <img src="../assets/animated/snowy-6.svg" v-if="getWeatherTypeByDays(days) === 'Moderate snow' || getWeatherTypeByDays(days) === 'Snow' || getWeatherTypeByDays(days) === 'Light snow' || getWeatherTypeByDays(days) === 'Light snow showers' || getWeatherTypeByDays(days) === 'Light snow showers'">
          <img src="../assets/animated/rainy-7.svg" v-if="getWeatherTypeByDays(days) === 'Heavy rain' || getWeatherTypeByDays(days) === 'Light rain showers' || getWeatherTypeByDays(days) === 'Moderate rain' || getWeatherTypeByDays(days) === 'Light rain shower' || getWeatherTypeByDays(days) === 'Light freezing rain'">
          <img src="../assets/animated/day.svg" v-if="getWeatherTypeByDays(days) === 'Clear' || getWeatherTypeByDays(days) === 'Sunny'">
          <img src="../assets/animated/mist.svg" v-if="getWeatherTypeByDays(days) === 'Mist'">
          <img src="../assets/animated/fog.svg" v-if="getWeatherTypeByDays(days) === 'Fog' || getWeatherTypeByDays(days) === 'Freezing fog'"> 
          <img src="../assets/animated/rainy-4.svg" v-if="getWeatherTypeByDays(days) === 'Drizzle' || getWeatherTypeByDays(days) === 'Rainy' || getWeatherTypeByDays(days) === 'Light rain' || getWeatherTypeByDays(days) === 'Light drizzle' || getWeatherTypeByDays(days) === 'Patchy light drizzle' || getWeatherTypeByHour(days) === 'Patchy light rain'">
          <img src="../assets/animated/partly-cloudy-day.svg" v-if="getWeatherTypeByDays(days) === 'Partly cloudy'"> 
          <img src="../assets/animated/extreme-snow.svg" v-if="getWeatherTypeByDays(days) === 'Heavy snow' || getWeatherTypeByDays(days) === 'Moderate or heavy snow showers' || getWeatherTypeByDays(days) === 'Patchy moderate snow'">
          <img src="../assets/animated/sleet.svg" v-if="getWeatherTypeByDays(days) === 'Light sleet' || getWeatherTypeByDays(days) === 'Light sleet showers'">
          <img src="../assets/animated/patchy_rain_possible.svg" v-if="getWeatherTypeByDays(days) === 'Patchy rain possible'">
          <img src="../assets/animated/thunderstorms-extreme.svg" v-if="getWeatherTypeByHour(days) === 'Thundery outbreaks possible'">
         </div>
         <div class="weather-for-2-days">
           <p class="weather-for-2-days-first-p">{{ Math.round(weatherDay[days].temp_min_today) }}&deg;</p>
           <p class="weather-for-2-days-second-p">Lowest</p>
         </div>
         <div class="weather-for-2-days">
           <p class="weather-for-2-days-first-p">{{ Math.round(weatherDay[days].temp_max_today) }}&deg;</p>
           <p class="weather-for-2-days-second-p">Highest</p>
         </div>
         <div class="weather-for-2-days">
           <p class="weather-for-2-days-first-p">{{ weatherDay[days].max_wind }} m/s</p>
           <p class="weather-for-2-days-second-p">Wind</p>
         </div>
         <div class="weather-for-2-days">
           <p class="weather-for-2-days-first-p">{{ Math.round(weatherDay[days].feels_like_today) }}&deg;</p>
           <p class="weather-for-2-days-second-p">Feels like</p>
         </div>
       </div>
     </div>
    </div>
</template>

<script setup>

import {onMounted, ref} from "vue";
import {useWeatherStore} from "@/store/weather.js";

const city = ref('belgrade')
const url = ref('https://api.weatherapi.com/v1/forecast.json')
const days = ref(['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'])
const months = ref(['January','February','March','April','May','June','July','August','September','October','November','December'])
const weather = ref(null)
const weatherTimes = ref([3,6,9,12,15,18,21])
const weatherTime = ref([])
const weatherDays = ref([0,1])
const weatherDay = ref([])
const error = ref(false)
const weatherStore = useWeatherStore()

async function getWeather() {
  try {
    await weatherStore.fetchDataFromApi(city.value)
    error.value = false;
    fillWeatherObjectWithApiData();
    weatherTimes.value.forEach(time => {
      weatherTime.value[time] ={
        [`forecast_${time}h`]: weatherStore.weather.forecast.forecastday[0].hour[time].condition.text,
        [`temperature_at_${time}h`]: weatherStore.weather.forecast.forecastday[0].hour[time].temp_c,
      }

    })
    weatherDays.value.forEach(days => {
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
  weatherTimes.value.forEach(time => {
    weatherTime.value[time] ={
      [`forecast_${time}h`]: 0,
      [`temperature_at_${time}h`]: 0
    }
  })
  return weatherTime.value;
}

function catchErrorForDailyWeather(){
  weatherDays.value.forEach(days => {
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
  return days.value[date.getDay()] + ' ' + date.getDate() + ' ' + months.value[date.getMonth()];
}

function getDayForNextTwoDays(day){
  let date = new Date(weatherDay.value[day].date)
  return days.value[date.getDay()];
}

function getDateForNextTwoDays(days){
  return weatherDay.value[days]?.date?.split('').slice(5).join('')
}

onMounted(async () => {
  await getWeather()
})
catchErrorForHourlyWeather();
catchErrorForMainWeather();

</script>

<style lang="scss">
@import '../assets/style';
</style>