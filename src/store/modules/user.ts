import { defineStore } from "pinia";
import { store } from "..";
import storageUtils from "@/utils/storage";
import { getLogin } from "@/api/login";
import router from "@/router";
import { resetRouter } from "@/router/utils";

const key = "userInfo";

export const useUserStore = defineStore({
  id: "user",
  state: () => ({
    username:
      JSON.parse(storageUtils.getSessionStorage(key) as string)?.username ?? "",
  }),
  actions: {
    SET_USERNAME(username: string) {
      this.username = username;
    },
    DEL_USERNAME() {
      this.username = "";
    },
    userLogin(data: any) {
      return new Promise((resolve, reject) => {
        getLogin(data)
          .then(({ data }) => {
            this.SET_USERNAME(data.data.username);
            storageUtils.setSessionStorage(key, JSON.stringify(data.data));
            resolve(data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    userLogout() {
      storageUtils.delAllSessionStorage();
      this.DEL_USERNAME();
      resetRouter();
      router.push("/login");
    },
  },
});

export function useUserStoreHook() {
  return useUserStore(store);
}
