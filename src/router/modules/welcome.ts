export default {
  path: "/",
  meta: {
    title: "首页",
    rank: 0,
  },
  children: [
    {
      path: "/welcome",
      name: "Welcome",
      meta: {
        title: "欢迎页",
        icon: "HomeFilled",
      },
    },
  ],
} as RouteConfigsTableType;
