import {
  Router,
  createRouter,
  RouteRecordRaw,
  createWebHashHistory,
} from "vue-router";
import storageUtils from "@/utils/storage";
import { flattenedRoutes, initRouter, formattingRoutes } from "./utils";
import { usePermissionStoreHook } from "@/store/modules/permission";
import deepCopy from "@/utils/deepCopy";

const modules: Record<string, any> = import.meta.glob(["./modules/**/*.ts"], {
  eager: true,
});

/** 原始静态路由 */
const routes: Array<RouteRecordRaw> = [];

Object.keys(modules).forEach((key) => {
  routes.push(modules[key].default);
});

export const constantMenus = deepCopy<Array<RouteRecordRaw>>(routes);

const router: Router = createRouter({
  history: createWebHashHistory(),
  routes: flattenedRoutes(formattingRoutes(routes, false)),
  strict: true,
});

router.beforeEach((to, from, next) => {
  const userInfo = storageUtils.getSessionStorage("userInfo");
  if (userInfo) {
    if (usePermissionStoreHook().wholeMenus.length === 0) {
      initRouter().then((router) => {
        router.push(to.fullPath);
      });
    } else {
      if (to.path !== "/login") {
        next();
      } else {
        next(from.fullPath);
      }
    }
  } else {
    if (to.path !== "/login") {
      next("/login");
    } else {
      next();
    }
  }
});

export default router;
