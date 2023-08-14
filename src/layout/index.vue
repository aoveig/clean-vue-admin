<script setup lang="ts">
import { ref, computed } from "vue";
import fixedHeader from "./fixedHeader.vue";
import appMain from "./appMain.vue";
import sidebarItem from "./components/sidebarItem.vue";
import { Fold, Expand } from "@element-plus/icons-vue";
import { usePermissionStoreHook } from "@/store/modules/permission";
import { useRoute } from "vue-router";

const $route = useRoute();

const isCollapse = ref(false);

const menuWidth = computed(() => {
  return isCollapse.value ? "64px" : "190px";
});
</script>

<template>
  <div class="layout layout-bg">
    <fixedHeader />
    <div class="layout-container">
      <div class="layout-aside frame-bg hover-shadow">
        <div class="menu-container" :style="{ width: menuWidth }">
          <el-menu
            router
            :default-active="$route.path"
            unique-opened
            :collapse="isCollapse"
            :collapse-transition="false"
          >
            <sidebarItem
              v-for="(item, index) of usePermissionStoreHook().wholeMenus"
              :key="index"
              :menu="item"
            />
          </el-menu>
        </div>
        <div class="collapse-button collapse-shadow" @click="isCollapse = !isCollapse">
          <el-tooltip
            effect="dark"
            :content="`点击${isCollapse ? '展开' : '折叠'}`"
            placement="right"
          >
            <el-icon size="22">
              <component :is="isCollapse ? Expand : Fold"></component>
            </el-icon>
          </el-tooltip>
        </div>
      </div>
      <div class="layout-content">
        <appMain />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.layout {
  width: 100%;
  height: 100%;
  position: relative;

  .layout-container {
    width: 100%;
    height: calc(100% - 50px);
    display: flex;

    .layout-aside {
      height: 100%;
      overflow: hidden;
      position: relative;

      .menu-container {
        transition: width 0.3s;

        :deep(.el-menu) {
          height: calc(100% - 50px);
          border: 0px;
          background-color: transparent;
        }
      }

      .collapse-button {
        width: 100%;
        height: 50px;
        position: absolute;
        bottom: 0px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }

    .layout-content {
      flex: 1;
      height: 100%;
    }
  }
}
</style>
