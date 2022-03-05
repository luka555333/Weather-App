import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Detailed from './components/Detailed.vue'
import Home from './components/Home.vue'
import Vuex from 'vuex';
import axios from 'axios'


Vue.use(VueRouter);
Vue.use(Vuex);

const store = new Vuex.Store({
   state: {
     data: {
     },
     
   },
  mutations: {
    setData(state, data){
      state.data = data;
    },
    setCity(state, city){
      state.city = city;
    }
  },
  actions: {
     async getDataFromApi({ commit }, city){
     await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=cee71b1b0f08435abfc112252222601&q=${city}&days=10&aqi=no&alerts=no`)
      .then(res => commit('setData', res.data))
    }
  }
})

const routes = [
  {path: '/Details', component: Detailed},
  {path: '/', component: Home},
  {path: '/Home', component: Home}
]
const router = new VueRouter({
  routes,
})
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
