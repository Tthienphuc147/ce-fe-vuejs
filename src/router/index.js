import Vue from "vue";

import store from "../store";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const Login = () => import("@/views/auth/Login");
const PageNotFound = () => import("@/views/exception/PageNotFound");
const PageNotPermission = () => import("@/views/exception/PageNotPermission");
const Dashboard = () => import("@/views/dashboard/Dashboard");
const ProfileManager = () =>
  import("@/views/dashboard/profile-manager/ProfileManager");
const ListEvaluation = () =>
  import("@/views/dashboard/evaluation-manager/ListEvaluation");
const CreateEvaluation = () =>
  import("@/views/dashboard/evaluation-manager/CreateEvaluation");
const EditEvaluation = () =>
  import("@/views/dashboard/evaluation-manager/EditEvaluation");
const ListMember = () => import("@/views/dashboard/member-manager/ListMember");
const ViewMember = () => import("@/views/dashboard/member-manager/ViewMember");
const ListAssociate = () =>
  import("@/views/dashboard/admin-associate-manager/AdminListAssociate");
const CreateAssociate = () =>
  import("@/views/dashboard/admin-associate-manager/AdminCreateAssociate");
const EditAssociate = () =>
  import("@/views/dashboard/admin-associate-manager/AdminEditAssociate");
const ListEvaluationAssociate = () =>
  import("@/views/dashboard/admin-associate-evaluation/AdminListEvaluation");
const ViewEvaluationAssociate = () =>
  import("@/views/dashboard/admin-associate-evaluation/AdminViewEvaluation");
const ListPeriod = () =>
  import("@/views/dashboard/admin-period-manager/AdminListPeriod");
const CreatePeriod = () =>
  import("@/views/dashboard/admin-period-manager/AdminCreatePeriod");
const EditPeriod = () =>
  import("@/views/dashboard/admin-period-manager/AdminEditPeriod");
const PositionCompetencyManager = () =>
  import("@/views/dashboard/admin-position-manager/AdminPositionManager");
const ListCompetency = () =>
  import("@/views/dashboard/admin-competency-manager/AdminListCompetency");
  const CreateCompetency = () =>
  import("@/views/dashboard/admin-competency-manager/AdminCreateCompetency");
const EditCompetency = () =>
  import("@/views/dashboard/admin-competency-manager/AdminEditCompetency");
const configRoutes = () => {
  return [
    {
      path: "/login",
      name: "Login",
      component: Login,
    },
    {
      path: "/page-not-found",
      name: "PageNotFound",
      component: PageNotFound,
    },
    {
      path: "/page-not-permission",
      name: "PageNotPermission",
      component: PageNotPermission,
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
        {
          path: "member-manager",
          name: "MemberManager",
          redirect: "/member-manager/list",
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
              name: "ListMember",
              component: ListMember,
              meta: {
                requireAuth: true,
              },
            },
            {
              path: "view/:id",
              name: "ViewMember",
              component: ViewMember,
              meta: {
                requireAuth: true,
              },
            },
          ],
        },
        {
          path: "/associate-manager",
          name: "AdminAssociateManager",
          redirect: "/associate-manager/list",
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
              name: "ListAssociate",
              component: ListAssociate,
              meta: {
                requireAuth: true,
              },
            },
            {
              path: "create",
              name: "CreateAssociate",
              component: CreateAssociate,
              meta: {
                requireAuth: true,
              },
            },
            {
              path: "edit/:id",
              name: "EditAssociate",
              component: EditAssociate,
              meta: {
                requireAuth: true,
              },
            },
          ],
        },
        {
          path: "/evaluation-associate-manager",
          name: "AdminEvaluationAssociateManager",
          redirect: "/evaluation-associate-manager/list",
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
              name: "ListEvaluationAssociate",
              component: ListEvaluationAssociate,
              meta: {
                requireAuth: true,
              },
            },
            {
              path: "view/:id",
              name: "ViewEvaluationAssociate",
              component: ViewEvaluationAssociate,
              meta: {
                requireAuth: true,
              },
            },
          ],
        },
        {
          path: "/period-manager",
          name: "AdminPeriodManager",
          redirect: "/period-manager/list",
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
              name: "ListPeriod",
              component: ListPeriod,
              meta: {
                requireAuth: true,
              },
            },
            {
              path: "create",
              name: "CreatePeriod",
              component: CreatePeriod,
              meta: {
                requireAuth: true,
              },
            },
            {
              path: "edit/:id",
              name: "EditPeriod",
              component: EditPeriod,
              meta: {
                requireAuth: true,
              },
            },
          ],
        },
        {
          path: "/competency-position-manager",
          name: "AdminCompetencyPosition",
          component: PositionCompetencyManager,
        },
        {
          path: "/competency-manager",
          name: "AdminCompetencyManager",
          redirect: "/competency-manager/list",
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
              name: "ListCompetency",
              component: ListCompetency,
              meta: {
                requireAuth: true,
              },
            },
            {
              path: "create",
              name: "CreateCompetency",
              component: CreateCompetency,
              meta: {
                requireAuth: true,
              },
            },
            {
              path: "edit/:id",
              name: "EditCompetency",
              component: EditCompetency,
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
