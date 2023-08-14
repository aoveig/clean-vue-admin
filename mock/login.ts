import { MockMethod } from "vite-plugin-mock";

export default [
  {
    url: "/login",
    method: "post",
    response: ({ body }) => {
      if (body.mobile === "admin" && body.password === "123456") {
        return {
          code: 200,
          data: {
            username: "admin",
            // 一个用户可能有多个角色
            roles: ["admin"],
            accessToken: "eyJhbGciOiJIUzUxMiJ9.admin",
          },
          msg: "登录成功",
        };
      } else {
        return {
          code: 401,
          data: {},
          msg: "用户名或密码错误",
        };
      }
    },
  },
] as MockMethod[];
