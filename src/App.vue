<template>
  <div>
    <div class="main-container">
      <div class="search-weather">
        <input
            type="text"
            placeholder="Enter city name..."
            class="input-search"
            v-model="city"
            @keyup.enter="fetchWeather"
        >
      </div>
      <div v-if="error" style="color: red;margin-top: 15px;">
        Sorry, the city that you searched doesn't exist. <br> Please try again.
      </div>
      <div class="location-and-date">
        <p class="searched-town-p">{{ this.weather.city }}</p>
        <p class="date-p">Monday 16 january</p>
      </div>
      <div class="searched-weather">
        <div class="weather-of-searched-town">
          <div class="temperature-img">
            <img :src="`${getWeatherType()}`" />
          </div>
          <div class="temperature-in-town">
            <p> {{ Math.round(this.weather.temparature) }}&#8451; </p>
            <div class="text-temperature">
            <p>{{ this.weather.forecast }}</p>
            </div>
          </div>
        </div>
        <div class="weather-in-details">
          <div class="weather-in-details-inner">
            <div class="highest">
              <p>{{ Math.round(this.weather.temp_max) }}&deg;</p>
              <p class="weather-text-inner">High</p>
            </div>
            <div class="lowest">
              <p>{{ Math.round(this.weather.temp_min) }}&deg;</p>
              <p class="weather-text-inner">Low</p>
            </div>
            <div class="rain">
              <p>{{ Math.round(this.weather.feels_like) }}&deg;</p>
              <p class="weather-text-inner">Feels like</p>
            </div>
          </div>
          <div class="weather-in-details-inner">
            <div class="highest">
              <p>{{ `${getSunsetTime()}` }}</p>
              <p class="weather-text-inner">Sunset</p>
            </div>
            <div class="lowest">
              <p>{{ `${getSunriseTime()}` }}</p>
              <p class="weather-text-inner">Sunrise</p>
            </div>
            <div class="rain">
              <p>{{ this.weather.wind}}m/s</p>
              <p class="weather-text-inner">Wind</p>
            </div>
          </div>
        </div>
      </div>
      <p class="todays-weather-text">Todays weather</p>
      <div class="todays-weather">
        <div class="todays-days">
          <p>3h</p>
          <img src="./assets/animated/cloudy-day-1.svg"/>
          <p>23&#176;</p>
        </div>
        <div class="todays-days">
          <p>6h</p>
          <img src="./assets/animated/cloudy-day-1.svg"/>
          <p>23&#176;</p>
        </div>
        <div class="todays-days">
          <p>9h</p>
          <img src="./assets/animated/cloudy-day-1.svg"/>
          <p>23&#176;</p>
        </div>
        <div class="todays-days">
          <p>12h</p>
          <img src="./assets/animated/cloudy-day-1.svg"/>
          <p>23&#176;</p>
        </div>
        <div class="todays-days">
          <p>15h</p>
          <img src="./assets/animated/cloudy-day-1.svg"/>
          <p>23&#176;</p>
        </div>
        <div class="todays-days">
          <p>18h</p>
          <img src="./assets/animated/cloudy-day-1.svg"/>
          <p>23&#176;</p>
        </div>
        <div class="todays-days">
          <p>21h</p>
          <img src="./assets/animated/cloudy-day-1.svg"/>
          <p>23&#176;</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'App',
  data() {
    return {
      api_key: '9b4489ce7401a706d600d26a991bba11',
      city: 'belgrade',
      url: 'https://api.openweathermap.org/data/2.5/',
      weather: {},
      error: false,
      weatherTypes: {
        cloudy: require('./assets/animated/cloudy.svg'),
        snow: require('./assets/animated/snowy-6.svg'),
        rainy: require('./assets/animated/rainy-7.svg'),
        clear: require('./assets/animated/day.svg'),
        mist: require('./assets/animated/mist.svg'),
        fog: require('./assets/animated/fog.svg'),
        drizzle: require('./assets/animated/rainy-4.svg')
      },
    }
  },
  methods: {
    async fetchWeather() {
      try {
        const {data} = await axios.get(`${this.url}weather?q=${this.city}&units=metric&appid=${this.api_key}`);
        this.error = false;
        this.weather = {
          city: data.name,
          temparature: data.main.temp,
          forecast: data.weather[0].main,
          temp_min: data.main.temp_min,
          temp_max: data.main.temp_max,
          wind: data.wind.speed,
          sunrise: data.sys.sunrise,
          sunset: data.sys.sunset,
          feels_like: data.main.feels_like,
        }
      } catch (err) {
        this.error = true;
        this.weather = {
          city: 'Unknown',
          temparature: 'N/A',
          forecast: 'Unknown',
          sunrise: 'Unknown',
          sunset: 'Unknown',
        }
      }
      this.city = '';
    },
    getWeatherType(){
      let obj = Object.values(this.weather);
    if(obj.indexOf('Clouds') !== -1){
      return this.weatherTypes.cloudy;
    }
    else if(obj.indexOf('Snow') !== -1){
      return this.weatherTypes.snow;
    }
    else if(obj.indexOf('Rainy') !== -1){
      return this.weatherTypes.rainy;
    }
    else if(obj.indexOf('Clear') !== -1){
      return this.weatherTypes.clear;
    }
    else if(obj.indexOf('Mist') !== -1){
      return this.weatherTypes.mist;
    }
    else if(obj.indexOf('Fog') !== -1){
      return this.weatherTypes.fog;
    }
    else if(obj.indexOf('Drizzle') !== -1){
      return this.weatherTypes.drizzle;
    }
  },
  getSunriseTime(){
    let date = new Date(this.weather.sunrise * 1000);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let formatedDate = hours + ':' + minutes;
    return formatedDate;
  },
  getSunsetTime(){
    let date = new Date(this.weather.sunset * 1000);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let formatedDate = hours + ':' + minutes;
    return formatedDate;
  },
  },
  async mounted() {
    this.fetchWeather();
  },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&family=Open+Sans:wght@300;400;500;600;700;800&display=swap');

* {
  padding: 0px;
  margin: 0px;
  box-sizing: border-box;
  font-family: 'Open Sans', sans-serif;
}

body {
  background: #00c6ff;
background: -webkit-linear-gradient(to right, #0072ff, #00c6ff);
background: linear-gradient(to right, #0072ff, #00c6ff);

}

.main-container {
  width: 100%;
  margin: 0 auto;
  max-width: 1000px;
}

.search-weather {
  margin-top: 20px;
  justify-content:center;
  align-items:center;
  display:flex;
}

.input-search {
  outline: none;
  border-radius: 0 14px 0 14px;
  background-color: rgba(255, 255, 255, 0.3);
  border: none;
  padding: 10px;
  box-shadow: 1px 1px 1px 1px grey;
}

.input-search:focus {
  background-color: rgba(255, 255, 255, 0.5);
}

.location-and-date {
  margin-top: 20px;
  align-items: flex-start;
  display: flex;
  flex-direction:column;
}
.searched-town-p{
  color: white;
  font-size:2.5rem;
}
.date-p{
  color: white;
}
.searched-weather{
  display: flex;
  flex-basis: 100%;
  max-width: 100%;
}
.weather-of-searched-town {
  display: flex;
  flex-direction: row;
  flex-basis: 50%;
  max-width: 50%;
  margin-top: 20px;
  padding: 20px;
}
.temperature-in-town{
  display: flex;
  align-items:center;
  flex-direction: column;
  color: white;
  font-size: 4.5rem;
  padding: 20px;
}
.text-temperature{
  color: white;
  font-size: 1.3rem;
}
.temperature-img{
  display: flex;
  align-items:center;
}
.temperature-img img{
  width: 9.4rem;
  height: 9.4rem;
}
.weather-in-details{
  display:flex;
  flex-basis: 50%;
  max-width: 50%;
  margin-top: 20px;
  padding: 20px;
  flex-direction: column;
  color:white;
  border-left: 1px solid white;
}
.weather-in-details-inner{
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-basis: 100%;
  max-width: 100%; 
}
.highest{
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-basis: 33%;
  max-width: 33%;
}
.lowest{
  display: flex;
  align-items: center;
  flex-direction: column;
  flex-basis: 33%;
  max-width: 33%;
}
.rain{
  display: flex;
  align-items: center;
  flex-direction: column;
  flex-basis: 33%;
  max-width: 33%;
}
.weather-text-inner{
  color: rgba(255,255,255,0.5);
}
.todays-weather-text{
  color: white;
  margin-top: 1.2rem;
}
.todays-weather{
  display: flex;
  flex-direction: row;
  flex-basis: 100%;
  max-width: 100%;
  margin-top: 1rem;
  color: white;
}
.todays-days{
  display: flex;
  flex-direction: column;
  flex-basis: 14.2857142857%;
  max-width: 14.2857142857%;
  align-items: center;
  padding: 0.6rem;
  margin: 0px 15px 0px 0px;
  background-color: rgba(255,255,255,0.3);
  border-radius: 0.6rem;
}


</style>