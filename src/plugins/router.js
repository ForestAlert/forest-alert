import { createWebHistory, createRouter } from 'vue-router'




const routes = [
  { path: '/', redirect: "/login" },
  { path: '/login', component: ()=> import("@/views/Login.vue")}


]




const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router