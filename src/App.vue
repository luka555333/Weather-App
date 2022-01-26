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
              <p class="weather-text-inner">Highest</p>
            </div>
            <div class="lowest">
              <p>{{ Math.round(this.weather.temp_min) }}&deg;</p>
              <p class="weather-text-inner">Lowest</p>
            </div>
            <div class="rain">
              <p>{{ Math.round(this.weather.feels_like) }}&deg;</p>
              <p class="weather-text-inner">Feels like</p>
            </div>
          </div>
          <div class="weather-in-details-inner">
            <div class="highest">
              <p>{{ this.weather.sunset }}</p>
              <p class="weather-text-inner">Sunset</p>
            </div>
            <div class="lowest">
              <p>{{ this.weather.sunrise }}</p>
              <p class="weather-text-inner">Sunrise</p>
            </div>
            <div class="rain">
              <p>{{ this.weather.wind}} m/s</p>
              <p class="weather-text-inner">Wind</p>
            </div>
          </div>
        </div>
      </div>
      <p class="todays-weather-text">Todays weather</p>
      <div class="todays-weather">
        <div class="todays-days">
          <p class="todays-p">3h</p>
          <img :src="`${getWeatherTypeAt3h()}`"/>
          <p class="todays-p">{{ Math.round(this.weather_at_3h.temperature_at_3h) }}&#176;</p>
        </div>
        <div class="todays-days">
          <p class="todays-p">6h</p>
          <img :src="`${getWeatherTypeAt6h()}`"/>
          <p class="todays-p">{{ Math.round(this.weather_at_6h.temperature_at_6h) }}&#176;</p>
        </div>
        <div class="todays-days">
          <p class="todays-p">9h</p>
          <img :src="`${getWeatherTypeAt9h()}`"/>
          <p class="todays-p">{{ Math.round(this.weather_at_9h.temperature_at_9h) }}&#176;</p>
        </div>
        <div class="todays-days">
          <p class="todays-p">12h</p>
          <img :src="`${getWeatherTypeAt12h()}`"/>
          <p class="todays-p">{{ Math.round(this.weather_at_12h.temperature_at_12h) }}&#176;</p>
        </div>
        <div class="todays-days">
          <p class="todays-p">15h</p>
          <img :src="`${getWeatherTypeAt15h()}`"/>
          <p class="todays-p">{{ Math.round(this.weather_at_15h.temperature_at_15h) }}&#176;</p>
        </div>
        <div class="todays-days">
          <p class="todays-p">18h</p>
          <img :src="`${getWeatherTypeAt18h()}`"/>
          <p class="todays-p">{{ Math.round(this.weather_at_18h.temperature_at_18h) }}&#176;</p>
        </div>
        <div class="todays-days">
          <p class="todays-p">21h</p>
          <img :src="`${getWeatherTypeAt21h()}`"/>
          <p class="todays-p">{{ Math.round(this.weather_at_21h.temperature_at_21h) }}&#176;</p>
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
      url_hourly: 'https://api.weatherapi.com/v1/forecast.json',
      api_key_hourly: 'cee71b1b0f08435abfc112252222601',
      weather: {},
      weather_at_3h:{},
      weather_at_6h:{},
      weather_at_9h:{},
      weather_at_12h:{},
      weather_at_15h:{},
      weather_at_18h:{},
      weather_at_21h:{},
      error: false,
      weatherTypes: {
        overcast: require('./assets/animated/cloudy.svg'),
        snow: require('./assets/animated/snowy-6.svg'),
        rainy: require('./assets/animated/rainy-7.svg'),
        clear: require('./assets/animated/day.svg'),
        mist: require('./assets/animated/mist.svg'),
        fog: require('./assets/animated/fog.svg'),
        drizzle: require('./assets/animated/rainy-4.svg'),
        partly_cloudy: require('./assets/animated/partly-cloudy-day.svg'),
        heavy_snow: require('./assets/animated/extreme-snow.svg'),
        sleet: require('./assets/animated/sleet.svg'),
        patchy_rain_possible: require('./assets/animated/patchy_rain_possible.svg'),
      },
    }/*this.url}weather?q=${this.city}&units=metric&appid=${this.api_key*/
  },
  methods: {
    async fetchWeather() {
      try {
        const {data} = await axios.get(`${this.url_hourly}?key=${this.api_key_hourly}&q=${this.city}&days=1&aqi=no&alerts=no`);
        console.log(data);
        this.error = false;
        this.weather = {
          city: data.location.name,
          temparature: data.current.temp_c,
          forecast: data.current.condition.text,
          temp_min: data.forecast.forecastday[0].day.mintemp_c,
          temp_max: data.forecast.forecastday[0].day.maxtemp_c,
          wind: data.current.wind_mph,
          sunrise: data.forecast.forecastday[0].astro.sunrise,
          sunset: data.forecast.forecastday[0].astro.sunset,
          feels_like: data.current.feelslike_c,
        },
        this.weather_at_3h ={
          forecast_3h: data.forecast.forecastday[0].hour[3].condition.text,
          temperature_at_3h: data.forecast.forecastday[0].hour[3].temp_c,
        },
        this.weather_at_6h = {
          forecast_6h: data.forecast.forecastday[0].hour[6].condition.text,
          temperature_at_6h: data.forecast.forecastday[0].hour[6].temp_c,
        },
        this.weather_at_9h = {
          forecast_9h: data.forecast.forecastday[0].hour[9].condition.text,
          temperature_at_9h: data.forecast.forecastday[0].hour[9].temp_c,
        },
        this.weather_at_12h = {
          forecast_12h: data.forecast.forecastday[0].hour[12].condition.text,
          temperature_at_12h: data.forecast.forecastday[0].hour[12].temp_c,
        },
        this.weather_at_15h = {
          forecast_15h: data.forecast.forecastday[0].hour[15].condition.text,
          temperature_at_15h: data.forecast.forecastday[0].hour[15].temp_c,
        },
        this.weather_at_18h = {
          forecast_18h: data.forecast.forecastday[0].hour[18].condition.text,
          temperature_at_18h: data.forecast.forecastday[0].hour[18].temp_c,
        },
        this.weather_at_21h = {
          forecast_21h: data.forecast.forecastday[0].hour[21].condition.text,
          temperature_at_21h: data.forecast.forecastday[0].hour[21].temp_c,
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
    if(obj.indexOf('Cloudy') !== -1 || obj.indexOf('Overcast') !== -1){
      return this.weatherTypes.overcast;
    }
    else if(obj.indexOf('Snow')!== -1 || obj.indexOf('Moderate snow')!== -1 || obj.indexOf('Light snow')!== -1){
      return this.weatherTypes.snow;
    }
    else if(obj.indexOf('Rainy') !== -1 || obj.indexOf('Light rain shower')!== -1){
      return this.weatherTypes.rainy;
    }
    else if(obj.indexOf('Clear')!== -1 || obj.indexOf('Sunny') !== -1){
      return this.weatherTypes.clear;
    }
    else if(obj.indexOf('Mist') !== -1){
      return this.weatherTypes.mist;
    }
    else if(obj.indexOf('Fog') !== -1 || obj.indexOf('Freezing fog')!== -1 ){
      return this.weatherTypes.fog;
    }
    else if(obj.indexOf('Drizzle') !== -1 || obj.indexOf('Light drizzle')!== -1 || obj.indexOf('Light rain')!== -1){
      return this.weatherTypes.drizzle;
    }
    else if(obj.indexOf('Partly cloudy') !== -1){
      return this.weatherTypes.partly_cloudy;
    }
    else if(obj.indexOf('Heavy snow') !== -1){
      return this.weatherTypes.heavy_snow;
    }
    else if(obj.indexOf('Light sleet') !== -1){
      return this.weatherTypes.sleet;
    }
    else if(obj.indexOf('Patchy rain possible') !== -1){
      return this.weatherTypes.patchy_rain_possible;
    }
  },
  getWeatherTypeAt3h(){
      let obj = Object.values(this.weather_at_3h);
     if(obj.indexOf('Cloudy') !== -1 || obj.indexOf('Overcast') !== -1){
      return this.weatherTypes.overcast;
    }
    else if(obj.indexOf('Snow')!== -1 || obj.indexOf('Moderate snow')!== -1 || obj.indexOf('Light snow')!== -1){
      return this.weatherTypes.snow;
    }
    else if(obj.indexOf('Rainy') !== -1 || obj.indexOf('Light rain shower')!== -1){
      return this.weatherTypes.rainy;
    }
    else if(obj.indexOf('Clear')!== -1 || obj.indexOf('Sunny') !== -1){
      return this.weatherTypes.clear;
    }
    else if(obj.indexOf('Mist') !== -1){
      return this.weatherTypes.mist;
    }
    else if(obj.indexOf('Fog') !== -1 || obj.indexOf('Freezing fog')!== -1 ){
      return this.weatherTypes.fog;
    }
    else if(obj.indexOf('Drizzle') !== -1 || obj.indexOf('Light drizzle')!== -1 || obj.indexOf('Light rain')!== -1){
      return this.weatherTypes.drizzle;
    }
    else if(obj.indexOf('Partly cloudy') !== -1){
      return this.weatherTypes.partly_cloudy;
    }
    else if(obj.indexOf('Heavy snow') !== -1){
      return this.weatherTypes.heavy_snow;
    }
    else if(obj.indexOf('Light sleet') !== -1){
      return this.weatherTypes.sleet;
    }
    else if(obj.indexOf('Patchy rain possible') !== -1){
      return this.weatherTypes.patchy_rain_possible;
    }
  },
  getWeatherTypeAt6h(){
      let obj = Object.values(this.weather_at_6h);
    if(obj.indexOf('Cloudy') !== -1 || obj.indexOf('Overcast') !== -1){
      return this.weatherTypes.overcast;
    }
    else if(obj.indexOf('Snow')!== -1 || obj.indexOf('Moderate snow')!== -1 || obj.indexOf('Light snow')!== -1){
      return this.weatherTypes.snow;
    }
    else if(obj.indexOf('Rainy') !== -1 || obj.indexOf('Light rain shower')!== -1){
      return this.weatherTypes.rainy;
    }
    else if(obj.indexOf('Clear')!== -1 || obj.indexOf('Sunny') !== -1){
      return this.weatherTypes.clear;
    }
    else if(obj.indexOf('Mist') !== -1){
      return this.weatherTypes.mist;
    }
    else if(obj.indexOf('Fog') !== -1 || obj.indexOf('Freezing fog')!== -1 ){
      return this.weatherTypes.fog;
    }
    else if(obj.indexOf('Drizzle') !== -1 || obj.indexOf('Light drizzle')!== -1 || obj.indexOf('Light rain')!== -1){
      return this.weatherTypes.drizzle;
    }
    else if(obj.indexOf('Partly cloudy') !== -1){
      return this.weatherTypes.partly_cloudy;
    }
    else if(obj.indexOf('Heavy snow') !== -1){
      return this.weatherTypes.heavy_snow;
    }
    else if(obj.indexOf('Light sleet') !== -1){
      return this.weatherTypes.sleet;
    }
    else if(obj.indexOf('Patchy rain possible') !== -1){
      return this.weatherTypes.patchy_rain_possible;
    }
  },
  getWeatherTypeAt9h(){
      let obj = Object.values(this.weather_at_9h);
   if(obj.indexOf('Cloudy') !== -1 || obj.indexOf('Overcast') !== -1){
      return this.weatherTypes.overcast;
    }
    else if(obj.indexOf('Snow')!== -1 || obj.indexOf('Moderate snow')!== -1 || obj.indexOf('Light snow')!== -1){
      return this.weatherTypes.snow;
    }
    else if(obj.indexOf('Rainy') !== -1 || obj.indexOf('Light rain shower')!== -1){
      return this.weatherTypes.rainy;
    }
    else if(obj.indexOf('Clear')!== -1 || obj.indexOf('Sunny') !== -1){
      return this.weatherTypes.clear;
    }
    else if(obj.indexOf('Mist') !== -1){
      return this.weatherTypes.mist;
    }
    else if(obj.indexOf('Fog') !== -1 || obj.indexOf('Freezing fog')!== -1 ){
      return this.weatherTypes.fog;
    }
    else if(obj.indexOf('Drizzle') !== -1 || obj.indexOf('Light drizzle')!== -1 || obj.indexOf('Light rain')!== -1){
      return this.weatherTypes.drizzle;
    }
    else if(obj.indexOf('Partly cloudy') !== -1){
      return this.weatherTypes.partly_cloudy;
    }
    else if(obj.indexOf('Heavy snow') !== -1){
      return this.weatherTypes.heavy_snow;
    }
    else if(obj.indexOf('Light sleet') !== -1){
      return this.weatherTypes.sleet;
    }
    else if(obj.indexOf('Patchy rain possible') !== -1){
      return this.weatherTypes.patchy_rain_possible;
    }
  },
  getWeatherTypeAt12h(){
      let obj = Object.values(this.weather_at_12h);
   if(obj.indexOf('Cloudy') !== -1 || obj.indexOf('Overcast') !== -1){
      return this.weatherTypes.overcast;
    }
    else if(obj.indexOf('Snow')!== -1 || obj.indexOf('Moderate snow')!== -1 || obj.indexOf('Light snow')!== -1){
      return this.weatherTypes.snow;
    }
    else if(obj.indexOf('Rainy') !== -1 || obj.indexOf('Light rain shower')!== -1){
      return this.weatherTypes.rainy;
    }
    else if(obj.indexOf('Clear')!== -1 || obj.indexOf('Sunny') !== -1){
      return this.weatherTypes.clear;
    }
    else if(obj.indexOf('Mist') !== -1){
      return this.weatherTypes.mist;
    }
    else if(obj.indexOf('Fog') !== -1 || obj.indexOf('Freezing fog')!== -1 ){
      return this.weatherTypes.fog;
    }
    else if(obj.indexOf('Drizzle') !== -1 || obj.indexOf('Light drizzle')!== -1 || obj.indexOf('Light rain')!== -1){
      return this.weatherTypes.drizzle;
    }
    else if(obj.indexOf('Partly cloudy') !== -1){
      return this.weatherTypes.partly_cloudy;
    }
    else if(obj.indexOf('Heavy snow') !== -1){
      return this.weatherTypes.heavy_snow;
    }
    else if(obj.indexOf('Light sleet') !== -1){
      return this.weatherTypes.sleet;
    }
    else if(obj.indexOf('Patchy rain possible') !== -1){
      return this.weatherTypes.patchy_rain_possible;
    }
  },
  getWeatherTypeAt15h(){
      let obj = Object.values(this.weather_at_15h);
   if(obj.indexOf('Cloudy') !== -1 || obj.indexOf('Overcast') !== -1){
      return this.weatherTypes.overcast;
    }
    else if(obj.indexOf('Snow')!== -1 || obj.indexOf('Moderate snow')!== -1 || obj.indexOf('Light snow')!== -1){
      return this.weatherTypes.snow;
    }
    else if(obj.indexOf('Rainy') !== -1 || obj.indexOf('Light rain shower')!== -1){
      return this.weatherTypes.rainy;
    }
    else if(obj.indexOf('Clear')!== -1 || obj.indexOf('Sunny') !== -1){
      return this.weatherTypes.clear;
    }
    else if(obj.indexOf('Mist') !== -1){
      return this.weatherTypes.mist;
    }
    else if(obj.indexOf('Fog') !== -1 || obj.indexOf('Freezing fog')!== -1 ){
      return this.weatherTypes.fog;
    }
    else if(obj.indexOf('Drizzle') !== -1 || obj.indexOf('Light drizzle')!== -1 || obj.indexOf('Light rain')!== -1){
      return this.weatherTypes.drizzle;
    }
    else if(obj.indexOf('Partly cloudy') !== -1){
      return this.weatherTypes.partly_cloudy;
    }
    else if(obj.indexOf('Heavy snow') !== -1){
      return this.weatherTypes.heavy_snow;
    }
    else if(obj.indexOf('Light sleet') !== -1){
      return this.weatherTypes.sleet;
    }
    else if(obj.indexOf('Patchy rain possible') !== -1){
      return this.weatherTypes.patchy_rain_possible;
    }
  },
  getWeatherTypeAt18h(){
      let obj = Object.values(this.weather_at_18h);
   if(obj.indexOf('Cloudy') !== -1 || obj.indexOf('Overcast') !== -1){
      return this.weatherTypes.overcast;
    }
    else if(obj.indexOf('Snow')!== -1 || obj.indexOf('Moderate snow')!== -1 || obj.indexOf('Light snow')!== -1){
      return this.weatherTypes.snow;
    }
    else if(obj.indexOf('Rainy') !== -1 || obj.indexOf('Light rain shower')!== -1){
      return this.weatherTypes.rainy;
    }
    else if(obj.indexOf('Clear')!== -1 || obj.indexOf('Sunny') !== -1){
      return this.weatherTypes.clear;
    }
    else if(obj.indexOf('Mist') !== -1){
      return this.weatherTypes.mist;
    }
    else if(obj.indexOf('Fog') !== -1 || obj.indexOf('Freezing fog')!== -1 ){
      return this.weatherTypes.fog;
    }
    else if(obj.indexOf('Drizzle') !== -1 || obj.indexOf('Light drizzle')!== -1 || obj.indexOf('Light rain')!== -1){
      return this.weatherTypes.drizzle;
    }
    else if(obj.indexOf('Partly cloudy') !== -1){
      return this.weatherTypes.partly_cloudy;
    }
    else if(obj.indexOf('Heavy snow') !== -1){
      return this.weatherTypes.heavy_snow;
    }
    else if(obj.indexOf('Light sleet') !== -1){
      return this.weatherTypes.sleet;
    }
    else if(obj.indexOf('Patchy rain possible') !== -1){
      return this.weatherTypes.patchy_rain_possible;
    }
  },
  getWeatherTypeAt21h(){
      let obj = Object.values(this.weather_at_21h);
   if(obj.indexOf('Cloudy') !== -1 || obj.indexOf('Overcast') !== -1){
      return this.weatherTypes.overcast;
    }
    else if(obj.indexOf('Snow')!== -1 || obj.indexOf('Moderate snow')!== -1 || obj.indexOf('Light snow')!== -1){
      return this.weatherTypes.snow;
    }
    else if(obj.indexOf('Rainy') !== -1 || obj.indexOf('Light rain shower')!== -1){
      return this.weatherTypes.rainy;
    }
    else if(obj.indexOf('Clear')!== -1 || obj.indexOf('Sunny') !== -1){
      return this.weatherTypes.clear;
    }
    else if(obj.indexOf('Mist') !== -1){
      return this.weatherTypes.mist;
    }
    else if(obj.indexOf('Fog') !== -1 || obj.indexOf('Freezing fog')!== -1 ){
      return this.weatherTypes.fog;
    }
    else if(obj.indexOf('Drizzle') !== -1 || obj.indexOf('Light drizzle')!== -1 || obj.indexOf('Light rain')!== -1){
      return this.weatherTypes.drizzle;
    }
    else if(obj.indexOf('Partly cloudy') !== -1){
      return this.weatherTypes.partly_cloudy;
    }
    else if(obj.indexOf('Heavy snow') !== -1){
      return this.weatherTypes.heavy_snow;
    }
    else if(obj.indexOf('Light sleet') !== -1){
      return this.weatherTypes.sleet;
    }
    else if(obj.indexOf('Patchy rain possible') !== -1){
      return this.weatherTypes.patchy_rain_possible;
    }
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
.todays-p{
  font-size: 1.2rem;
}

</style>