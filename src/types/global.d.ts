import type { RouteComponent } from "vue-router";

declare global {
  /**
   * 路由配置表类型
   */
  interface RouteConfigsTableType {
    /** 路由路径 [必填] */
    path: string;
    /** 路由名字 [可选] */
    name?: string;
    /** 路由重定向 [可选] */
    redirect?: string;
    /** 路由对应组件 [可选] */
    component?: RouteComponent;
    /** 路由元信息 [必填] */
    meta: {
      /** 菜单标题 [必填] */
      title: string;
      /** 菜单图标 [可选] */
      icon?: string;
      /** 路由缓存(true 开启 | false 关闭) [可选] */
      keepAlive?: boolean;
      /** 显示父级(true 显示 | false 隐藏) [可选] */
      showParent?: boolean;
      /** 显示在菜单中(true 显示 | false 隐藏) [可选] */
      showMenu?: boolean;
      /** 动态路由标志(自动添加) [可选] */
      backstage?: boolean;
      /** 菜单排序(按照从小到大排序) [可选] */
      rank?: number;
    };
    /** 子路由 [可选] */
    children?: Array<RouteConfigsTableType>;
  }
}
