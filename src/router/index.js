import Vue from "vue";

import store from "../store";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const Login = () => import("@/views/auth/Login");
const Dashboard = () => import("@/views/dashboard/Dashboard");
const ProfileManager = () =>
  import("@/views/dashboard/profile-manager/ProfileManager");
const ListEvaluation = () =>
  import("@/views/dashboard/evaluation-manager/ListEvaluation");
const CreateEvaluation = () =>
  import("@/views/dashboard/evaluation-manager/CreateEvaluation");
const EditEvaluation = () =>
  import("@/views/dashboard/evaluation-manager/EditEvaluation");
const configRoutes = () => {
  return [
    {
      path: "/login",
      name: "Login",
      component: Login,
    },
    {
      path: "/",
      name: "Dashboard",
      component: Dashboard,
      redirect: "/profile-manager",
      children: [
        {
          path: "profile-manager",
          name: "ProfileManager",
          component: ProfileManager,
          meta: {
            requireAuth: true,
          },
        },
        {
          path: "evaluation-manager",
          name: "EvaluationManager",
          redirect: "/evaluation-manager/list",
          meta: {
            requireAuth: true,
          },
          component: {
            render(c) {
              return c("router-view");
            },
          },
          children: [
            {
              path: "list",
              name: "ListEvaluation",
              component: ListEvaluation,
              meta: {
                requireAuth: true,
              },
            },
            {
              path: "create",
              name: "CreateEvaluation",
              component: CreateEvaluation,
              meta: {
                requireAuth: true,
              },
            },
            {
              path: "edit/:id",
              name: "EditEvaluation",
              component: EditEvaluation,
              meta: {
                requireAuth: true,
              },
            },
          ],
        },
      ],
      meta: {
        requireAuth: true,
      },
    },
  ];
};

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  linkActiveClass: "active",
  scrollBehavior: () => ({ y: 0 }),
  routes: configRoutes(),
});

router.beforeEach((to, from, next) => {
  if (to.path === "/" && store.getters.getAuthenticationToken) {
    return next("/");
  }
  if (to.meta.requireAuth) {
    if (store.getters.getAuthenticationToken) {
      next();
    } else {
      next({
        path: "/login",
        query: {
          redirect: to.fullPath,
        },
      });
    }
  } else {
    next();
  }
});

export default router;
