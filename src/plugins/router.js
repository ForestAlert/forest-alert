import { createWebHistory, createRouter } from "vue-router";

const routes = [
  { path: "/", redirect: "/login" },
  {
    name: "login",
    path: "/login",
    component: () => import("@/views/Login.vue"),
  },
  {
    name: "signup",
    path: "/signup",
    component: () => import("@/views/Signup.vue"),
  },
  {
    name: "reports",
    path: "/reports",
    component: () => import("@/views/Reports.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
