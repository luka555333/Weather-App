import { createRouter, createWebHistory } from 'vue-router'
import Detailed from "@/components/Detailed.vue";
import Home from "@/components/Home.vue";
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {path: '/Details', component: Detailed},
        {path: '/', component: Home},
        {path: '/Home', component: Home}
    ]
})

export default router;