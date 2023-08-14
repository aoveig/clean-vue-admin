<script setup lang="ts">
import { ref } from "vue";

const { menu } = defineProps<{
  menu: RouteConfigsTableType;
}>();

const menuInformation = ref();

function showMenuItem(menu: RouteConfigsTableType): boolean {
  menuInformation.value = menu;
  if (menu.children) {
    if (menu.children.length === 1) {
      if (menu.children[0].meta?.showParent) {
        return false;
      }
      menuInformation.value = menu.children[0];
      return true;
    }
    return false;
  }
  return true;
}
</script>

<template>
  <el-menu-item v-if="showMenuItem(menu)" :index="menuInformation.path">
    <el-icon v-if="menuInformation.meta?.icon">
      <component :is="menuInformation.meta.icon"></component>
    </el-icon>
    <span>{{ menuInformation.meta?.title }}</span>
  </el-menu-item>
  <el-sub-menu v-else :index="menuInformation.path">
    <template #title>
      <el-icon v-if="menuInformation.meta?.icon">
        <component :is="menuInformation.meta.icon"></component>
      </el-icon>
      <span>{{ menuInformation.meta?.title }}</span>
    </template>
    <sidebarItem
      v-for="(item, index) of menuInformation.children"
      :key="index"
      :menu="item"
    />
  </el-sub-menu>
</template>

<style scoped lang="scss"></style>
