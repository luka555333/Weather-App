<template>
  <div class="location-and-date">
    <p class="searched-town-p">{{ weather?.city }}</p>
    <p class="date-p">{{ getDate() }}</p>
  </div>
  <div class="searched-weather">
    <div class="weather-of-searched-town">
      <div class="temperature-img">
        <img :src="WEATHER_ICON_MAP[getCurrentWeather()]" />
      </div>
      <div class="temperature-in-town">
        <p> {{ Math.round(weather?.temperature) }}&#8451; </p>
        <div class="text-temperature">
          <p class="">{{ weather?.forecast }}</p>
        </div>
      </div>
    </div>
    <div class="weather-in-details">
      <div class="weather-in-details-inner">
        <div class="highest">
          <p>{{ Math.round(weather?.temp_max) }}&deg;</p>
          <p class="weather-text-inner">Highest</p>
        </div>
        <div class="lowest">
          <p>{{ Math.round(weather?.temp_min) }}&deg;</p>
          <p class="weather-text-inner">Lowest</p>
        </div>
        <div class="rain">
          <p>{{ Math.round(weather?.feels_like) }}&deg;</p>
          <p class="weather-text-inner">Feels like</p>
        </div>
      </div>
      <div class="weather-in-details-inner">
        <div class="highest">
          <p>{{ weather?.sunset }}</p>
          <p class="weather-text-inner">Sunset</p>
        </div>
        <div class="lowest">
          <p>{{ weather?.sunrise }}</p>
          <p class="weather-text-inner">Sunrise</p>
        </div>
        <div class="rain">
          <p>{{ weather?.wind}} m/s</p>
          <p class="weather-text-inner">Wind</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

import {DAYS, MONTHS, WEATHER_ICON_MAP} from "@/constants/index.js";

const props = defineProps({
  weather: Object
})
function getCurrentWeather(){
  return props.weather?.forecast;
}

function getDate(){
  let date = new Date();
  return DAYS[date.getDay()] + ' ' + date.getDate() + ' ' + MONTHS[date.getMonth()];
}
</script>

<style lang="scss" scoped>

</style>