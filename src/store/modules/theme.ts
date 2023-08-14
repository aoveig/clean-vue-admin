import { defineStore } from "pinia";
import { store } from "..";
import storageUtils from "@/utils/storage";

export const useThemeStore = defineStore({
  id: "theme",
  state: () => ({
    isDark: false,
  }),
  actions: {
    SET_ISDARK(b?: boolean) {
      if (b !== undefined) {
        this.isDark = b;
      } else {
        this.isDark = !this.isDark;
      }
    },
    /** 修改 html 的主题类名 */
    setHTMLClass() {
      if (this.isDark) {
        storageUtils.setLocalStorage("currentTheme", "dark");
        window.document.documentElement.classList.add("dark");
      } else {
        storageUtils.setLocalStorage("currentTheme", "light");
        window.document.documentElement.classList.remove("dark");
      }
    },
    /** 初始化主题 */
    initTheme() {
      if (storageUtils.getLocalStorage("currentTheme")) {
        if (storageUtils.getLocalStorage("currentTheme") === "dark") {
          this.SET_ISDARK(true);
        } else {
          this.SET_ISDARK(false);
        }
      }
    },
  },
});

export function useThemeStoreHook() {
  return useThemeStore(store);
}
