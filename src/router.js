import { createRouter, createWebHistory } from "vue-router";
import CoachesList from "./pages/coaches/CoachesList.vue";
import store from "./store/index";
import NotFound from "./pages/NotFound.vue";

const CoachDetail = () => import("./pages/coaches/CoachDetail.vue");

const CoachRegistation = () => import("./pages/coaches/CoachRegistation.vue");
const ContactCoaches = () => import("./pages/requests/ContactCoaches.vue");
const RequestsReceived = () => import("./pages/requests/RequestsReceived.vue");
const UserAuth = () => import("./pages/auth/UserAuth.vue");

const router = createRouter({
  routes: [
    { path: "/", redirect: "/coaches" },
    { path: "/coaches", component: CoachesList },
    {
      path: "/coaches/:id",
      component: CoachDetail,
      props: true,
      children: [
        {
          path: "contact",
          component: ContactCoaches,
        },
      ],
    },
    {
      path: "/register",
      component: CoachRegistation,
      meta: { requiresAuth: true },
    },
    {
      path: "/requests",
      component: RequestsReceived,
      meta: { requiresAuth: true },
    },
    { path: "/auth", component: UserAuth, meta: { requiresUnauth: true } },
    {
      path: "/:notFound(.*)",
      component: NotFound,
    },
  ],
  history: createWebHistory(),
});

router.beforeEach(function (to, _, next) {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next("/auth");
  } else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
    next("/coaches");
  } else {
    next();
  }
});
export default router;
