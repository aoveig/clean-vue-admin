import { RouteRecordRaw, Router } from "vue-router";
import { getAsyncRoutes } from "@/api/asyncRoutes";
import router from ".";
import { usePermissionStoreHook } from "@/store/modules/permission";
import deepCopy from "@/utils/deepCopy";

const Layout = () => import("@/layout/index.vue");

const modulesRoutes = import.meta.glob("/src/views/**/*.vue");

export function sortRoutesMenu(routeList: Array<RouteRecordRaw>) {
  const newRouteList = deepCopy<Array<RouteRecordRaw>>(routeList);
  return newRouteList.sort((a, b) => {
    return (a.meta?.rank as number) - (b.meta?.rank as number);
  });
}

/** 过滤不在菜单中显示的路由 */
export function filterMenuRoutes(routeList: Array<RouteRecordRaw>) {
  const newRouteList = routeList.filter((r) => r.meta?.showMenu ?? true);
  newRouteList.forEach((r) => {
    if (r.children && r.children.length) {
      r.children = filterMenuRoutes(r.children);
    }
  });
  return newRouteList;
}

/** 将路由扁平化，拍成二级路由 */
export function flattenedRoutes(
  routeList: Array<RouteRecordRaw>,
  first: boolean = true
) {
  const newRoutes: Array<RouteRecordRaw> = [];
  routeList.forEach((r) => {
    const routeConfig = {
      ...r,
    };
    if (first && r.redirect && r.children) {
      routeConfig.children = flattenedRoutes(r.children, false);
    }
    if (!first && r.children) {
      routeConfig.children = [];
      const flattenedChildren = flattenedRoutes(r.children, false);
      newRoutes.push(...flattenedChildren);
    }
    newRoutes.push(routeConfig);
  });
  return newRoutes;
}

/** 添加动态路由 */
function addAsyncRoutes(routeList: Array<RouteRecordRaw>) {
  flattenedRoutes(formattingRoutes(routeList, true)).forEach((r) => {
    (router.options.routes as Array<RouteRecordRaw>).push(r);
    router.addRoute(r);
  });
}

/** 重置路由 */
export function resetRouter() {
  router.getRoutes().forEach((r) => {
    const { name, meta } = r;
    if (name && router.hasRoute(name) && meta?.backstage) {
      // 清除路由
      router.removeRoute(name);
      // 清除路由表数据
      router.options.routes.forEach((r, i) => {
        if (r.name === name) {
          (router.options.routes as Array<RouteRecordRaw>).splice(i, 1);
        }
      });
    }
  });
}

/** 格式化路由 */
export function formattingRoutes(
  routeList: Array<RouteRecordRaw>,
  isAsync?: boolean
) {
  const modulesRoutesKeys = Object.keys(modulesRoutes);
  const newRoutes: Array<RouteRecordRaw> = [];
  routeList.forEach((route) => {
    const r = { ...route };
    // 如果是后端路由便加上标识
    if (isAsync) r.meta && (r.meta.backstage = true);
    // 如果路由有子级且自身没有 redirect 属性，则默认取第一个子级路径为 redirect
    if (r.children && r.children.length && !r.redirect)
      r.redirect = r.children[0].path;
    // 如果路由有子级且自身没有 name 属性，则默认取第一个子级的name+‘Parent’当作自己的name
    if (r.children && r.children.length && !r.name)
      r.name = (r.children[0].name as string) + "Parent";
    // 如果路由没有重定向，则根据它的path或者component来匹配组件
    if (!r.redirect) {
      const index = r?.component
        ? modulesRoutesKeys.findIndex((i) => i.includes(r.component as any))
        : modulesRoutesKeys.findIndex((i) => i.includes(r.path));
      r.component = modulesRoutes[modulesRoutesKeys[index]];
    } else {
      r.component = Layout;
    }
    if (r?.children && r.children.length) {
      r.children = formattingRoutes(r.children, isAsync);
    }
    newRoutes.push(r);
  });
  return newRoutes;
}

/** 初始化路由 */
export function initRouter(): Promise<Router> {
  return new Promise((resolve) => {
    getAsyncRoutes().then(({ data }) => {
      addAsyncRoutes(data.data);
      usePermissionStoreHook().assembleMenus(data.data);
      resolve(router);
    });
  });
}
