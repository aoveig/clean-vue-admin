<script setup lang="ts">
import { reactive, watch, onMounted } from "vue";
import { User, Lock, Moon, Sunny } from "@element-plus/icons-vue";
import { useUserStoreHook } from "@/store/modules/user";
import { ElMessage } from "element-plus";
import { useThemeStoreHook } from "@/store/modules/theme";
import { initRouter } from "@/router/utils";

const form = reactive({
  mobile: "admin",
  password: "123456",
});

const inbetweeningList = [
  new URL(`@/assets/login/img(1).svg`, import.meta.url),
  new URL(`@/assets/login/img(2).svg`, import.meta.url),
  new URL(`@/assets/login/img(3).svg`, import.meta.url),
  new URL(`@/assets/login/img(4).svg`, import.meta.url),
];

const imgURL = inbetweeningList[Math.floor(Math.random() * 4)];

const onLogin = () => {
  useUserStoreHook()
    .userLogin(form)
    .then((data: any) => {
      if (data.code === 200) {
        initRouter().then((router) => {
          ElMessage.success(data.msg);
          router.push("/");
        });
      } else {
        ElMessage.error(data.msg);
      }
    });
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
  <div class="login login-bg">
    <div class="login-container">
      <div class="login-img_box frame-bg">
        <img :src="`${imgURL}`" alt="" />
      </div>
      <div class="login-form_box frame-bg">
        <div class="login-form_center">
          <div class="login-logo">
            <img src="@/assets/vue.svg" alt="" />
          </div>
          <p class="login-title">CLEAN ADMIN</p>
          <div class="login-form">
            <el-form :model="form">
              <el-form-item>
                <el-input v-model="form.mobile" :prefix-icon="User" />
              </el-form-item>
              <el-form-item>
                <el-input
                  type="password"
                  v-model="form.password"
                  :prefix-icon="Lock"
                  show-password
                  clearable
                />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onLogin">登录</el-button>
                <el-button>注册</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
    <div class="login-setting">
      <el-tooltip effect="dark" content="点击切换主题" placement="bottom">
        <el-switch
          v-model="useThemeStoreHook().isDark"
          inline-prompt
          :active-icon="Moon"
          :inactive-icon="Sunny"
          style="--el-switch-on-color: #3b3b3b; --el-switch-off-color: #ddd"
        />
      </el-tooltip>
    </div>
  </div>
</template>

<style scoped lang="scss">
.login {
  width: 100%;
  height: 100%;
  position: relative;

  .login-container {
    width: 1000px;
    height: 450px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;

    .login-form_box,
    .login-img_box {
      position: absolute;
      width: 54.5%;
      height: 100%;
      border-radius: 10px;
    }

    .login-img_box {
      top: -10px;
      left: 0;
      clip-path: polygon(0 0, 100% 0, 82% 100%, 0% 100%);
      display: flex;
      align-items: center;
      justify-content: center;

      img {
        height: 60%;
        margin-right: 30px;
      }
    }

    .login-form_box {
      top: 10px;
      right: 0;
      clip-path: polygon(18% 0, 100% 0, 100% 100%, 0% 100%);
      display: flex;
      align-items: center;
      justify-content: center;

      .login-form_center {
        width: 50%;

        .login-logo {
          margin-bottom: 15px;

          img {
            width: 80px;
            margin: 0 auto;
          }
        }

        .login-title {
          text-align: center;
          color: #c0d3f1;
          font-size: 30px;
          margin-bottom: 15px;
        }
      }
    }
  }

  .login-setting {
    position: absolute;
    top: 20px;
    right: 20px;
  }
}
</style>
