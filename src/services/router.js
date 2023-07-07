import { createRouter, createWebHistory } from "vue-router";
import App from "@/App.vue";

import RoutesHome from "@/views/home/services/routes";
import RoutesPersonal from "@/views/personal/services/routes";

const routes = [
  {
    path: "",
    name: "App",
    component: App,
    meta: {},
    children: [...RoutesHome, ...RoutesPersonal],
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/pages/Login.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
