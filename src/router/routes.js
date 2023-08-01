const routes = [
  {
    path: "/",
    component: () => import("pages/Auth.vue"),
  },
  {
    path: "/phoneAuth",
    component: () => import("pages/PhoneAuth.vue"),
  },
  {
    path: "/SignUp",
    component: () => import("pages/SignUp.vue"),
  },
  {
    path: "/todo",
    component: () => import("layouts/ToDO.vue"),
  },
  {
    path: "/ml",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/IndexPage.vue") }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
