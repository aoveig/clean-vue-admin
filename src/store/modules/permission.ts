import { defineStore } from "pinia";
import { store } from "..";
import { constantMenus } from "@/router";
import { sortRoutesMenu, filterMenuRoutes } from "@/router/utils";

export const usePermissionStore = defineStore({
  id: "permission",
  state: () => ({
    // 静态路由生成的菜单
    constantMenus,
    // 整体路由生成的菜单
    wholeMenus: [] as Array<any>,
  }),
  actions: {
    /** 组装(动态，静态)路由成整体菜单 */
    assembleMenus(routes: Array<any>) {
      this.wholeMenus = filterMenuRoutes(
        sortRoutesMenu(this.constantMenus.concat(routes))
      );
    },
  },
});

export function usePermissionStoreHook() {
  return usePermissionStore(store);
}
