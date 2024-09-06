<template>
  <p class="todays-weather-text">Todays weather</p>
  <div class="todays-weather">
    <div class="todays-days" v-for="hour in weatherByTimeOfTheDay" :key="hour" >
      <p class="todays-p">{{ hour }}h</p>
      <div class="todays-svg">
        <img :src="WEATHER_ICON_MAP[getWeatherTypeByHour(hour)]" />
      </div>
      <p class="todays-p">{{ Math.round(props.weatherTime[hour][`temperature_at_${hour}h`]) }}&#176;</p>
    </div>
  </div>
</template>

<script setup>
import {WEATHER_ICON_MAP} from "@/constants/index.js";

const props = defineProps ({
  weatherTime: Object,
});
const weatherByTimeOfTheDay = [3,6,9,12,15,18,21]
function getWeatherTypeByHour(hour){
  return props.weatherTime[hour]?.[`forecast_${hour}h`];
}
</script>

<style lang="scss" scoped>
@import '../assets/style';
</style>