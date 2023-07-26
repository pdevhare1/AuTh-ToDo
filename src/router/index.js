import { route } from "quasar/wrappers";
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import routes from "./routes";

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === "history"
    ? createWebHistory
    : createWebHashHistory;

  const router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  router.beforeEach((to, from, next) => {
    // Check if authToken and uniqueId are present in localStorage
    if (
      localStorage.getItem("firebaseToken") &&
      localStorage.getItem("uniqueId")
    ) {
      // If both are present, restrict access to sign-in and sign-up pages
      if (to.path === "/" || to.path === "/SignUp") {
        next("/todo");
      } else {
        next(); // Continue with the regular navigation
      }
    } else {
      next(); // Continue with the regular navigation
    }
  });

  return router;
});
