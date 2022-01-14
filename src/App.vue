<template>
  <div id="app">
    <body :style="{ backgroundImage: `url(${getWeatherType()})`}"  v-if="weather.data != undefined">
    <div class="weather-wrapper">
      <div class="search-weather">
        <input 
        type="text" 
        placeholder="Search..." 
        class="input-search"
        v-model="input"
        @keyup.enter="fetchWeather"
        >
      </div>
      <div class="searched-town">
        <p>{{ weather.data.name }}</p>
      </div>
      <div class="searched-celsius">
        <p> {{ Math.round(weather.data.main.temp) }}&#8451; </p>
      </div>
      <div class="weather-forecast">
        <p>{{ weather.data.weather[0].main }}</p>
      </div>
    </div>
    </body>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'App',
  data() {
    return {
      api_key: '9b4489ce7401a706d600d26a991bba11',
      input: '',
      url: 'https://api.openweathermap.org/data/2.5/',
      weather: {},
      weatherTypes:{
      hot: require('./assets/hot.jpg'),
      cold: require('./assets/cold.jpg'),
      },
    }
  },
 methods: {
   async fetchWeather() {
     this.weather = await axios.get(`${this.url}weather?q=${this.input}&units=metric&appid=${this.api_key}`)
     .catch(err => {
       console.log(err);
        this.input= '';
     });
     this.input= '';
   },
   getWeatherType(){
     if(this.weather.data.main.temp > 20){
       return this.weatherTypes.hot
     }
     else
     return this.weatherTypes.cold;
   }
 },
 mounted(){
  if(localStorage.weather){
    this.weather = JSON.parse(localStorage.weather);
  }

 },
watch: {
  weather(newValue) {
    localStorage.weather = JSON.stringify(newValue);
  }
},
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap');

*{
  padding: 0px;
  margin: 0px;
  box-sizing: border-box;
  font-family: 'Montserrat', sans-serif;
}
html, body{
  height: 70vh;
}
body{
  background-repeat: no-repeat;
  background-size: contain;
  background-position: 50% 10%;
  transition: background 1s;
}
.weather-wrapper{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.search-weather{
  margin-top: 20px;
}
.input-search{
outline: none;
border-radius: 0 14px 0 14px;
background-color: rgba(255,255,255,0.3);
border: none;
padding: 10px;
box-shadow: 1px 1px 1px 1px grey;
}
.input-search:focus{
background-color: rgba(255,255,255,0.5);
}
.searched-town{
  margin-top: 20px;
}
p{
  color: white;
  text-shadow: 1px 1px grey;
  font-size: 2rem;
  font-weight: 700;
  text-align:center;
}
.searched-celsius{
  margin-top: 20px;
  background-color: rgba(0,0,0,0.1);
  padding: 20px;
  border-radius: 10px;
}
.weather-forecast{
  margin-top: 20px;
}












</style>
