import { createWebHistory, createRouter } from "vue-router";

const routes = [
  {
    name: "landing",
    path: "",
    component: () => import("@/views/Landing.vue"),
    meta: {
      noAuthRequired: false,
    },
  },
  {
    name: "login",
    path: "/login",
    component: () => import("@/views/Login.vue"),
    meta: {
      noAuthRequired: true,
    },
  },
  {
    name: "signup",
    path: "/signup",
    component: () => import("@/views/Signup.vue"),
    meta: {
      noAuthRequired: true,
    },
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
