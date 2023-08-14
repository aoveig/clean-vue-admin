// 模拟后端动态生成路由
import { MockMethod } from "vite-plugin-mock";

const permissionRouter = [
  {
    path: "/async",
    meta: {
      title: "异步路由",
      icon: "Promotion",
      rank: 1,
    },
    children: [
      {
        path: "/async/index",
        name: "Async",
        meta: {
          title: "异步路由",
          icon: "Promotion",
        },
      },
    ],
  },
];

export default [
  {
    url: "/getAsyncRoutes",
    method: "get",
    response: () => {
      return {
        code: 200,
        data: permissionRouter,
        msg: "获取成功",
      };
    },
  },
] as MockMethod[];
