<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { ElMessage } from "element-plus";
import { SwitchButton, Moon, Sunny } from "@element-plus/icons-vue";
import { useUserStoreHook } from "@/store/modules/user";
import { useThemeStoreHook } from "@/store/modules/theme";

const drawer = ref(false);

const handleCommand = (command: string) => {
  switch (command) {
    case "logOut":
      useUserStoreHook().userLogout();
      ElMessage.success("退出登录");
      break;
  }
};

watch(
  () => useThemeStoreHook().isDark,
  () => {
    useThemeStoreHook().setHTMLClass();
  }
);

onMounted(() => {
  useThemeStoreHook().initTheme();
});
</script>

<template>
  <div class="fixed-header frame-bg">
    <div class="header-left">
      <div class="header-logo">
        <img src="@/assets/vue.svg" alt="" />
        <span> CLEANADMIN </span>
      </div>
    </div>
    <div class="header-right">
      <el-tooltip effect="dark" content="点击切换主题" placement="bottom">
        <el-switch
          v-model="useThemeStoreHook().isDark"
          inline-prompt
          :active-icon="Moon"
          :inactive-icon="Sunny"
          style="--el-switch-on-color: #3b3b3b; --el-switch-off-color: #ddd"
        />
      </el-tooltip>
      <el-dropdown class="header-user" trigger="click" @command="handleCommand">
        <span>
          <img src="@/assets/image.png" alt="" />
          <span>{{ useUserStoreHook().username }}</span>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item :icon="SwitchButton" command="logOut">
              退出系统
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <span @click="drawer = true">
        <el-icon><Setting /></el-icon>
      </span>
      <el-drawer v-model="drawer" title="项目配置" :size="330">
        <div class="drawer-config">
          <p>主题切换</p>
        </div>
      </el-drawer>
    </div>
  </div>
</template>

<style scoped lang="scss">
.fixed-header {
  width: 100%;
  height: 50px;
  padding: 0px 10px;
  display: flex;
  justify-content: space-between;

  .header-left {
    display: flex;
    align-items: center;

    .header-logo {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 20px;

      img {
        height: 70%;
        margin-right: 10px;
        object-fit: cover;
      }

      span {
        font-size: 20px;
        color: #c0d3f1;
      }
    }
  }

  .header-right {
    display: flex;
    align-items: center;

    .header-user {
      height: 40px;
      padding: 0px 10px;

      > span {
        display: flex;
        align-items: center;

        img {
          width: 22px;
          margin-right: 5px;
          border-radius: 50%;
        }
      }
    }

    > span {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
