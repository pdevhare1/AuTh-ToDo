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

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
    history: createHistory(process.env.VUE_ROUTER_BASE),
    // Add restrictions to todo page and authentication checks for login and sign-up pages
    // beforeEach: (to, from, next) => {
    //   const isLogged = !!localStorage.getItem("token");
    //   if (to.path === "/todo") {
    //     // Check if user is logged in
    //     if (isLogged) {
    //       next();
    //     } else {
    //       next({ path: "/" }); // Redirect to login page if not logged in
    //     }
    //   } else if (to.path === "/" || to.path === "/SignUp") {
    //     // Check if user is already logged in, then prevent access to login and sign-up pages
    //     if (isLogged) {
    //       next({ path: "/todo" });
    //     } else {
    //       next(); // Allow access to login and sign-up pages for non-logged-in users
    //     }
    //   } else {
    //     next(); // Allow access to other pages
    //   }
    // },
  });

  return Router;
});
