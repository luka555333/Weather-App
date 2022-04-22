<template>
<div>
    <div class="my-div">
    <p>{{ $store.state.data.location.name }} Today</p>
    </div>
    <div class="searched-weather">
      <div class="weather-in-details">  
         <div class="weather-in-details-inner">
            <div class="highest">
              <p>{{ $store.state.data.current.gust_mph }}</p>
              <p class="weather-text-inner">Gust</p>
            </div>
            <div class="lowest">
              <p>{{ $store.state.data.current.humidity }}</p>
              <p class="weather-text-inner">Humidity</p>
            </div>
            <div class="rain">
              <p>{{ $store.state.data.current.precip_in }}</p>
              <p class="weather-text-inner">Precip In</p>
            </div>
         </div>
         <div class="weather-in-details-inner adding-margin">
            <div class="highest">
              <p>{{ $store.state.data.current.cloud }}</p>
              <p class="weather-text-inner">Clouds</p>
            </div>
            <div class="lowest">
              <p>{{ Math.round($store.state.data.current.pressure_in) }}</p>
              <p class="weather-text-inner">Pressure</p>
            </div>
            <div class="rain">
              <p>{{ $store.state.data.current.wind_degree }}</p>
              <p class="weather-text-inner">Wind Deg.</p>
            </div>
         </div>
      </div>
      <div class="weather-in-details adding-right-border">  
         <div class="weather-in-details-inner">
            <div class="highest">
              <p>{{ $store.state.data.current.uv }}</p>
              <p class="weather-text-inner">UV</p>
            </div>
            <div class="lowest">
              <p>{{ $store.state.data.current.vis_km }}</p>
              <p class="weather-text-inner">Vis Km</p>
            </div>
            <div class="rain">
              <p>{{ $store.state.data.location.lon }}</p>
              <p class="weather-text-inner">Lon</p>
            </div>
         </div>
         <div class="weather-in-details-inner adding-margin">
            <div class="highest">
              <p>{{ $store.state.data.forecast.forecastday[0].astro.moonrise }}</p>
              <p class="weather-text-inner">Moon rise</p>
            </div>
            <div class="lowest">
              <p>{{ $store.state.data.forecast.forecastday[0].astro.moonset }}</p>
              <p class="weather-text-inner">Moon Set</p>
            </div>
            <div class="rain">
              <p>{{ $store.state.data.forecast.forecastday[0].astro.moon_illumination }}</p>
              <p class="weather-text-inner">Moon ill.</p>
            </div>
         </div>
      </div>
    </div>
    <div class="searched-weather">
      <div class="weather-in-details">  
         <div class="weather-in-details-inner">
            <div class="highest">
              <p>{{ $store.state.data.forecast.forecastday[0].day.daily_chance_of_rain }}%</p>
              <p class="weather-text-inner">R. Chance</p>
            </div>
            <div class="lowest">
              <p>{{ $store.state.data.forecast.forecastday[0].day.daily_chance_of_snow }}%</p>
              <p class="weather-text-inner">S. Chance</p>
            </div>
            <div class="rain">
              <p>{{ $store.state.data.forecast.forecastday[0].day.avghumidity }}</p>
              <p class="weather-text-inner">Avg Hum.</p>
            </div>
         </div>
         <div class="weather-in-details-inner adding-margin">
            <div class="highest">
              <p>{{ $store.state.data.forecast.forecastday[0].day.avgvis_km }}</p>
              <p class="weather-text-inner">Avg Vis</p>
            </div>
            <div class="lowest">
              <p>{{ Math.round($store.state.data.forecast.forecastday[0].day.maxtemp_c) }}&deg;</p>
              <p class="weather-text-inner">Max Temp</p>
            </div>
            <div class="rain">
              <p>{{ Math.round($store.state.data.forecast.forecastday[0].day.mintemp_c) }}&deg;</p>
              <p class="weather-text-inner">Min Temp</p>
            </div>
         </div>
      </div>
      <div class="weather-in-details adding-right-border">  
         <div class="weather-in-details-inner">
            <div class="highest">
              <p>{{ Math.round($store.state.data.forecast.forecastday[0].day.maxwind_mph) }} mp/h</p>
              <p class="weather-text-inner">Max Wind</p>
            </div>
            <div class="lowest">
              <p>{{ Math.round($store.state.data.forecast.forecastday[0].hour[18].dewpoint_c) }}&deg;</p>
              <p class="weather-text-inner">Dew Point</p>
            </div>
            <div class="rain">
              <p>{{ Math.round($store.state.data.forecast.forecastday[0].hour[18].heatindex_c) }}&deg;</p>
              <p class="weather-text-inner">Heat Index</p>
            </div>
         </div>
         <div class="weather-in-details-inner adding-margin">
            <div class="highest">
              <p>{{ Math.round($store.state.data.forecast.forecastday[0].hour[18].windchill_c) }}&deg;</p>
              <p class="weather-text-inner">Wind Chill</p>
            </div>
            <div class="lowest">
              <p>{{ $store.state.data.forecast.forecastday[0].hour[18].wind_dir }}</p>
              <p class="weather-text-inner">Wind Dir</p>
            </div>
            <div class="rain">
              <p>{{ $store.state.data.location.lat }}</p>
              <p class="weather-text-inner">Lat</p>
            </div>
         </div>
      </div>
    </div>
</div>
</template>

<script>
    export default {
        name: 'Detailed',
    }
</script>

<style lang="scss" scoped>
@import '../assets/style.scss';

.router-link-for-home{
    color: white;
    text-decoration: none;
    font-size: 2rem;
}
.my-div{
    color: white;
    font-size: 2rem;
    margin-top: 2rem;
}
.adding-margin{
    margin-top: 1.5rem;
}
.adding-right-border{
    border-right: 1px solid white;
}
@media(max-width: 720px){
    .adding-right-border{
    border-right: none;
   }
}
</style>