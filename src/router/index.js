import { createRouter, createWebHistory } from 'vue-router'
import Detailed from "@/views/WeatherDetailedInfo.vue";
import Home from "@/views/Weather.vue";
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/details',
            component: Detailed
        },
        {
            path: '/',
            component: Home,
            alias: '/home'
        },
    ]
})

export default router;