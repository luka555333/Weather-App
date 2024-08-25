import { createApp } from "vue";
import App from "@/App.vue"
import router from "./router"
const app = createApp(App)
app.use(router)
app.mount("#app")
// async FetchDataFromApi({ commit }, city){
//    await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=cee71b1b0f08435abfc112252222601&q=${city}&days=10&aqi=no&alerts=no`)
//     .then(res => commit('setData', res.data));
// }

