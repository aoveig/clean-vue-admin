import { createApp } from "vue";
import App from "./App.vue";

import router from "@/router";
import { setupStore } from "./store";

// 引入element-plus
import ElementPlus from "element-plus";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

// 引入重置样式
import "./style/reset.scss";
// 引入 tailwind 样式
import "./style/tailwind.css";
// 引入 element 样式
import "element-plus/dist/index.css";
import 'element-plus/theme-chalk/dark/css-vars.css'

const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

setupStore(app);
app.use(ElementPlus);
app.use(router);

app.mount("#app");
