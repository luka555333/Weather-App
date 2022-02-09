<template>
  <div>
    <div class="main-container">
      <div class="search-weather">
        <input
            type="text"
            placeholder="Enter city name..."
            class="input-search"
            v-model="city"
            @keyup.enter="fetchWeather()"
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
          <img src="./assets/animated/cloudy.svg" v-if="getCurrentWeather() === 'Cloudy' || getCurrentWeather() === 'Overcast'">
          <img src="./assets/animated/snowy-6.svg" v-if="getCurrentWeather() === 'Moderate snow' || getCurrentWeather() === 'Snow' || getCurrentWeather() === 'Light snow' || getCurrentWeather() === 'Light snow showers'">
          <img src="./assets/animated/rainy-7.svg" v-if="getCurrentWeather() === 'Rainy' || getCurrentWeather() === 'Light rain showers'">
          <img src="./assets/animated/day.svg" v-if="getCurrentWeather() === 'Clear' || getCurrentWeather() === 'Sunny'">
          <img src="./assets/animated/mist.svg" v-if="getCurrentWeather() === 'Mist'">
          <img src="./assets/animated/fog.svg" v-if="getCurrentWeather() === 'Fog' || getCurrentWeather() === 'Freezing fog'"> 
          <img src="./assets/animated/rainy-4.svg" v-if="getCurrentWeather() === 'Drizzle' || getCurrentWeather() === 'Light rain' || getCurrentWeather() === 'Light drizzle'">
          <img src="./assets/animated/partly-cloudy-day.svg" v-if="getCurrentWeather() === 'Partly cloudy'"> 
          <img src="./assets/animated/extreme-snow.svg" v-if="getCurrentWeather() === 'Heavy snow'">
          <img src="./assets/animated/sleet.svg" v-if="getCurrentWeather() === 'Light sleet'">
          <img src="./assets/animated/patchy_rain_possible.svg" v-if="getCurrentWeather() === 'Patchy rain possible'">
          </div>
          <div class="temperature-in-town">
            <p> {{ Math.round(weather.temperature) }}&#8451; </p>
            <div class="text-temperature">
            <p>{{ this.weather.forecast }}</p>
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
          <img src="./assets/animated/cloudy.svg" v-if="getWeatherTypeByHour(hour) === 'Cloudy' || getWeatherTypeByHour(hour) === 'Overcast'">
          <img src="./assets/animated/snowy-6.svg" v-if="getWeatherTypeByHour(hour) === 'Moderate snow' || getWeatherTypeByHour(hour) === 'Snow' || getWeatherTypeByHour(hour) === 'Light snow' || getWeatherTypeByHour(hour) === 'Light snow showers'">
          <img src="./assets/animated/rainy-7.svg" v-if="getWeatherTypeByHour(hour) === 'Rainy' || getWeatherTypeByHour(hour) === 'Light rain showers'">
          <img src="./assets/animated/day.svg" v-if="getWeatherTypeByHour(hour) === 'Clear' || getWeatherTypeByHour(hour) === 'Sunny'">
          <img src="./assets/animated/mist.svg" v-if="getWeatherTypeByHour(hour) === 'Mist'">
          <img src="./assets/animated/fog.svg" v-if="getWeatherTypeByHour(hour) === 'Fog' || getWeatherTypeByHour(hour) === 'Freezing fog'"> 
          <img src="./assets/animated/rainy-4.svg" v-if="getWeatherTypeByHour(hour) === 'Drizzle' || getWeatherTypeByHour(hour) === 'Light rain' || getWeatherTypeByHour(hour) === 'Light drizzle'">
          <img src="./assets/animated/partly-cloudy-day.svg" v-if="getWeatherTypeByHour(hour) === 'Partly cloudy'"> 
          <img src="./assets/animated/extreme-snow.svg" v-if="getWeatherTypeByHour(hour) === 'Heavy snow'">
          <img src="./assets/animated/sleet.svg" v-if="getWeatherTypeByHour(hour) === 'Light sleet'">
          <img src="./assets/animated/patchy_rain_possible.svg" v-if="getWeatherTypeByHour(hour) === 'Patchy rain possible'">
          </div>
          <p class="todays-p">{{ Math.round( weatherTime[hour][`temperature_at_${hour}h`] ) }}&#176;</p>
        </div>
      </div>
     <p class="next-2-days-p">Next 2 days</p>
     <div class="next-2-days">
       <div v-for="days in weatherDays" :key="days" class="next-2-days-inner">
         <div class="weather-for-2-days">
           <p class="weather-for-2-days-first-p">{{ getDayForNextTwoDays(days) }}</p>
           <p class="weather-for-2-days-second-p">{{ getDateForNextTwoDays(days) }}</p>
         </div>
         <div class="weather-for-2-days weather-for-2-days-svg">
          <img src="./assets/animated/cloudy.svg" v-if="getWeatherTypeByDays(days) === 'Cloudy' || getWeatherTypeByDays(days) === 'Overcast'">
          <img src="./assets/animated/snowy-6.svg" v-if="getWeatherTypeByDays(days) === 'Moderate snow' || getWeatherTypeByDays(days) === 'Snow' || getWeatherTypeByDays(days) === 'Light snow' || getWeatherTypeByDays(days) === 'Light snow showers'">
          <img src="./assets/animated/rainy-7.svg" v-if="getWeatherTypeByDays(days) === 'Rainy' || getWeatherTypeByDays(days) === 'Light rain showers'">
          <img src="./assets/animated/day.svg" v-if="getWeatherTypeByDays(days) === 'Clear' || getWeatherTypeByDays(days) === 'Sunny'">
          <img src="./assets/animated/mist.svg" v-if="getWeatherTypeByDays(days) === 'Mist'">
          <img src="./assets/animated/fog.svg" v-if="getWeatherTypeByDays(days) === 'Fog' || getWeatherTypeByDays(days) === 'Freezing fog'"> 
          <img src="./assets/animated/rainy-4.svg" v-if="getWeatherTypeByDays(days) === 'Drizzle' || getWeatherTypeByDays(days) === 'Light rain' || getWeatherTypeByDays(days) === 'Light drizzle'">
          <img src="./assets/animated/partly-cloudy-day.svg" v-if="getWeatherTypeByDays(days) === 'Partly cloudy'"> 
          <img src="./assets/animated/extreme-snow.svg" v-if="getWeatherTypeByDays(days) === 'Heavy snow'">
          <img src="./assets/animated/sleet.svg" v-if="getWeatherTypeByDays(days) === 'Light sleet'">
          <img src="./assets/animated/patchy_rain_possible.svg" v-if="getWeatherTypeByDays(days) === 'Patchy rain possible'">
         </div>
         <div class="weather-for-2-days">
           <p class="weather-for-2-days-first-p">{{ Math.round(weatherDay[days].temp_min_today) }}&deg;</p>
           <p class="weather-for-2-days-second-p">Low</p>
         </div>
         <div class="weather-for-2-days">
           <p class="weather-for-2-days-first-p">{{ Math.round(weatherDay[days].temp_max_today) }}&deg;</p>
           <p class="weather-for-2-days-second-p">High</p>
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
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'App',
  data() {
    return {
      city: 'belgrade',
      url: 'https://api.weatherapi.com/v1/forecast.json',
      api_key: 'cee71b1b0f08435abfc112252222601',
      days: ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
      months: ['January','February','March','April','May','June','July','August','September','October','November','December'],
      weather: {},
      weatherTimes: [3,6,9,12,15,18,21],
      weatherTime: [],
      weatherDays: [1,2],
      weatherDay: [],
      error: false,
    }
  },
  methods: {
    async fetchWeather() {
      try {
        const {data} = await axios.get(`${this.url}?key=${this.api_key}&q=${this.city}&days=10&aqi=no&alerts=no`);
        console.log(data);
        this.error = false;
        this.weather = {
          city: data.location.name || 'Unknown',
          temperature: data.current.temp_c || 0,
          forecast: data.current.condition.text || 'Unknown',
          temp_min: data.forecast.forecastday[0].day.mintemp_c || 0,
          temp_max: data.forecast.forecastday[0].day.maxtemp_c || 0,
          wind: data.current.wind_mph || 0,
          sunrise: data.forecast.forecastday[0].astro.sunrise || 'Unknown',
          sunset: data.forecast.forecastday[0].astro.sunset || 'Unknown',
          feels_like: data.current.feelslike_c || 0
        },
        
        this.weatherTimes.forEach(time => {
          this.weatherTime[time] ={
          [`forecast_${time}h`]: data.forecast.forecastday[0].hour[time].condition.text,
          [`temperature_at_${time}h`]: data.forecast.forecastday[0].hour[time].temp_c,
          }
        })

      this.weatherDays.forEach(days => {
        this.weatherDay[days] = {
          temp_min_today: data.forecast.forecastday[days].day.mintemp_c,
          temp_max_today: data.forecast.forecastday[days].day.maxtemp_c,
          max_wind: data.forecast.forecastday[days].day.maxwind_mph,
          forecast_today: data.forecast.forecastday[days].day.condition.text,
          feels_like_today: data.forecast.forecastday[days].hour[18].feelslike_c,
          date: data.forecast.forecastday[days].date
        }
      })

      } catch (err) {
       this.error = true;

       this.catchErrorForHourlyWeather();
       this.catchErrorForDailyWeather();
      this.city = '';
    }
    },
    catchErrorForHourlyWeather(){
      this.weatherTimes.forEach(time => {
          this.weatherTime[time] ={
          [`forecast_${time}h`]: 0,
          [`temperature_at_${time}h`]: 0
        }
        })
        return this.weatherTime;
    },
    catchErrorForDailyWeather(){
      this.weatherDays.forEach(days => {
        this.weatherDay[days] = {
          temp_min_today: 0,
          temp_max_today: 0,
          feels_like_today: 0,
          forecast_today: 'Unknown',
        }
      })
    },
    getWeatherTypeByHour(hour){
      return this.weatherTime[hour]?.[`forecast_${hour}h`];
    },
    getCurrentWeather(){
     return this.weather.forecast;
    },
    getWeatherTypeByDays(days){
     return this.weatherDay[days]?.forecast_today;
    },
    getDate(){
      let date = new Date();
      return this.days[date.getDay()] + ' ' + date.getDate() + ' ' + this.months[date.getMonth()];
    },
    getDayForNextTwoDays(days){
      let date = new Date(this.weatherDay[days].date)
      return this.days[date.getDay()];
    },
    getDateForNextTwoDays(days){
      return this.weatherDay[days]?.date?.split('').slice(5).join('')
    },
},
    async mounted() {
      await this.fetchWeather();
},
    created(){
      this.catchErrorForHourlyWeather();
      this.catchErrorForDailyWeather();
}
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
html{
  width: 100%;
}
body {
background: -webkit-linear-gradient(to right, #0072ff, #00c6ff);
background: linear-gradient(to right, #0072ff, #00c6ff);
background-attachment: fixed;
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
  color: white;
}
.error-p{
  color: red;
  margin-top: 15px;
  text-align: center;
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
  flex-wrap: wrap;
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
  flex-basis: 33.3333333333%;
  max-width: 33.3333333333%;
}
.lowest{
  display: flex;
  align-items: center;
  flex-direction: column;
  flex-basis: 33.3333333333%;
  max-width: 33.3333333333%;
}
.rain{
  display: flex;
  align-items: center;
  flex-direction: column;
  flex-basis: 33.3333333333%;
  max-width: 33.3333333333%;
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
  margin-top: 1rem;
  color: white;
  flex-wrap: wrap;
  justify-content: center;
}
.todays-days{
  display: flex;
  flex-direction: column;
  flex-basis: calc(14.2857142857% - 15px);
  max-width: calc(14.2857142857% - 15px);
  align-items: center;
  padding: 0.6rem;
  margin: 15px 7.5px 0px 7.5px;
  background-color: rgba(255,255,255,0.3);
  border-radius: 0.6rem;
  height: 100%;
}
.todays-p{
  font-size: 0.9rem;
}
.todays-svg{
  width: 5em;
}
.next-2-days-p{
  color: white;
  margin-top: 1.2rem;
}
.next-2-days{
  display: flex;
  flex-direction: column;
  flex: 0 0 100%;
}
.next-2-days-inner{
  display: flex;
  flex-direction: row;
  align-items: center;
  border-width: 10px 0 0 0;
  border-style: solid none none none;
  border-image: -webkit-linear-gradient(to right, #8e2de2, #4a00e0) 1;
  border-image: linear-gradient(to right, #8e2de2, #4a00e0) 1;
  outline:none;
  margin-top: 1rem;
  text-align: center;
  justify-content: center;
}
.weather-for-2-days{
  display: block;
  flex-basis: 16.66%;
}
.weather-for-2-days-first-p{
  color: white;
}
.weather-for-2-days-second-p{
  color: rgba(255,255,255,0.5);
}
.weather-for-2-days-svg{
  max-width: 5em;
}
@media(max-width: 975px){
  .main-container{
    max-width: 720px;
    width: 100%;
  }
  @media(max-width: 720px){
    .main-container{
      margin: 0;
    }
   .searched-weather{
     justify-content: center;
   }
   .location-and-date{
     padding-left: 1rem;
   }
   .weather-of-searched-town{
     padding-left: 0 2.2rem;
   }
   .weather-of-searched-town{
     flex: 0 0 100%;
     max-width: 100%;
     justify-content: center;
   }
   .weather-in-details{
     flex: 0 0 90%;
     max-width: 90%;
     border-top: 1px solid white;
     border-bottom : 1px solid white;
     border-left: none;
   }
   .weather-in-details-inner{
     margin-bottom: 15px;
     padding:0.6rem;
   }
  }
  @media(max-width: 645px){
    .todays-weather{
      justify-content: center;
    }
    .todays-svg{
      width: 4.375em;
    }
    .todays-days{
      flex-basis: calc(16.6666666667% - 15px);
      max-width: calc(16.6666666667% - 15px);
    }
  }
   @media(max-width: 550px){
     .todays-svg{
      width: 3.75em;
    }
    .todays-weather-text{
      margin-left: 1rem;
    }
    .todays-days{
      flex-basis: 20%;
      max-width: 20%;
    }
    .weather-for-2-days-first-p{
      font-size: 0.7rem;
    }
    .weather-for-2-days-second-p{
      font-size: 0.7rem;
    }
    .weather-for-2-days-svg{
      max-width: 4em;
    }
    .next-2-days-inner{
      border-top: 5px solid;
    }
   }
  @media(max-width: 380px){
    .weather-in-details-inner{
      font-size: 0.8rem;
    }
    .temperature-img img{
      width: 7.5rem;
      height: 7.5rem;
    }
    .temperature-in-town{
      font-size: 4rem;
    }
    .todays-weather-text{
      margin-left: 0.8rem;
      font-size: 0.8rem;
    }
    .text-temperature{
      font-size: 1.1rem;
    }
    .todays-svg{
      width: 3.125em;
    }
    .todays-p{
      font-size: 0.7rem;
    }
  }
}
</style>