export default [
  {
    path: "/:username",
    name: "Personal",
    component: () => import("../Personal.vue"),
  },
];
