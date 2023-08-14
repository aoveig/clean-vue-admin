export default {
  path: "/nested",
  name: "Nested",
  meta: {
    title: "多级菜单",
    icon: "Histogram",
    rank: 2,
  },
  children: [
    {
      path: "/nested/nexted1",
      name: "Nested1",
      meta: {
        title: "二级菜单1",
      },
      children: [
        {
          path: "/nested/nested1/nested1-1",
          name: "Nested1-1",
          meta: {
            title: "三级菜单1",
          },
          children: [
            {
              path: "/nested/nested1/nested1-1/nested1-1-1",
              name: "Nested1-1-1",
              meta: {
                title: "四级菜单1",
              },
            },
            {
              path: "/nested/nested1/nested1-1/nested1-1-2",
              name: "Nested1-1-2",
              meta: {
                title: "四级菜单2",
              },
            },
          ],
        },
        {
          path: "/nested/nested1/nested1-2",
          name: "Nested1-2",
          meta: {
            title: "三级菜单2",
          },
        },
        {
          path: "/nested/nested1/nested1-3",
          name: "Nested1-3",
          meta: {
            title: "三级菜单3",
          },
          children: [
            {
              path: "/nested/nested1/nested1-3/nested1-3-1",
              name: "Nested1-3-1",
              meta: {
                title: "四级菜单1",
              },
            },
            {
              path: "/nested/nested1/nested1-3/nested1-3-2",
              name: "Nested1-3-2",
              meta: {
                title: "四级菜单2",
              },
            },
          ],
        },
      ],
    },
    {
      path: "/nested/nested2",
      name: "Nested2",
      meta: {
        title: "二级菜单2",
      },
    },
  ],
} as RouteConfigsTableType;
