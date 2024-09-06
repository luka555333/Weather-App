<template>
  <p class="next-2-days-p">Next 2 days</p>
  <div class="next-2-days" >
    <div v-for="day in weatherByDay" :key="day" class="next-2-days-inner">
      <div class="weather-for-2-days">
        <p class="weather-for-2-days-first-p">{{ getDayForNextTwoDays(day) }}</p>
        <p class="weather-for-2-days-second-p">{{ getDateForNextTwoDays(day) }}</p>
      </div>
      <div class="weather-for-2-days weather-for-2-days-svg">
        <img :src="WEATHER_ICON_MAP[getWeatherTypeByDays(day)]">
      </div>
      <div class="weather-for-2-days">
        <p class="weather-for-2-days-first-p">{{ Math.round(props.weatherDay[day].temp_min_today) }}&deg;</p>
        <p class="weather-for-2-days-second-p">Lowest</p>
      </div>
      <div class="weather-for-2-days">
        <p class="weather-for-2-days-first-p">{{ Math.round(props.weatherDay[day].temp_max_today) }}&deg;</p>
        <p class="weather-for-2-days-second-p">Highest</p>
      </div>
      <div class="weather-for-2-days">
        <p class="weather-for-2-days-first-p">{{ props.weatherDay[day].max_wind }} m/s</p>
        <p class="weather-for-2-days-second-p">Wind</p>
      </div>
      <div class="weather-for-2-days">
        <p class="weather-for-2-days-first-p">{{ Math.round(props.weatherDay[day].feels_like_today) }}&deg;</p>
        <p class="weather-for-2-days-second-p">Feels like</p>
      </div>
    </div>
  </div>
</template>

<script setup>

import {WEATHER_ICON_MAP} from "@/constants/index.js";
const props = defineProps({
  weatherDay: Array
})
const weatherByDay = [0,1]
const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']

function getWeatherTypeByDays(days){
  return props.weatherDay[days]?.forecast_today;
}

function getDayForNextTwoDays(day){
  let date = new Date(props.weatherDay[day].date)
  return days[date.getDay()];
}

function getDateForNextTwoDays(days){
  return props.weatherDay[days]?.date?.split('').slice(5).join('')
}
</script>

<style lang="scss" scoped>

</style>