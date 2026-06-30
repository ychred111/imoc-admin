<template>
  <div class="login-container">
    <el-form class="login-form" :model="loginForm" :rules="loginRules" ref="loginFormRef">
      <div class="title-container">
        <h3 class="title">用户登录</h3>
      </div>
      <!-- username -->
      <el-form-item prop="username" label="">
        <span class="svg-container">
          <svg-icon icon="user"></svg-icon>
        </span>
        <el-input
          placeholder="请输入username"
          v-model="loginForm.username"
        ></el-input>
      </el-form-item>

      <!-- password -->
      <el-form-item prop="password" label="">
        <div class="input-wrapper">
          <span class="svg-container icon-left" >
            <svg-icon icon="password"></svg-icon>
          </span>
          <el-input
            placeholder="请输入password"
            v-model="loginForm.password"
            :type="passwordType"
          ></el-input>
          <span class="svg-container icon-right">
            <svg-icon :icon="passwordType === 'password' ? 'eye' : 'eye-open'" @click="onChangePwType"></svg-icon>
          </span>
        </div>
      </el-form-item>
      <el-button type="primary" class="loginButton" @click="handleLogin">登录</el-button>
    </el-form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { validatorPassword } from '@/utils/rules'
import { useStore } from 'vuex'
// import { useRouter } from 'vue-router'
// 创建数据源
// 创建表单验证规则: 实际开发的时候密码的验证规则很复杂，需要单独封装
const loginForm = ref({
  username: 'super-admin',
  password: '123456'
})

const loginRules = ref({
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [
    { required: true, trigger: 'blur', validator: validatorPassword() }
  ]
})

// 密码框状态处理
// template 里面绑定的方法，直接声明即可
// 当passwordType的值是password的时候，改为text
// 使用ref声明的数据时候，在script里面使用要加上value 在template里面使用时不需要
const passwordType = ref('password')
const onChangePwType = () => {
  if (passwordType.value === 'password') {
    passwordType.value = 'text'
  } else {
    passwordType.value = 'password'
  }
}

// 登录
// 给登录按钮设置点击事件
// 获取表单实例
// 表单验证
// 触发登录动作：发请求 因为login的请求是封装在vuex里面所以要触发定义的action
// 登录之后的处理
const loading = ref(false)
const store = useStore()
const loginFormRef = ref(null)
const handleLogin = () => {
  loginFormRef.value.validate(valid => {
    if (!valid) return
    loading.value = true
    store.dispatch('user/login', loginForm.value)
      .then(() => {
        // 请求成功
        loading.value = false
        console.log('111')
        // 登录成功之后的处理
      })
    // 请求失败
      .catch((err) => {
        console.log(err)
        loading.value = false
      })
  })
}
</script>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
$cursor: #fff;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;

    ::v-deep .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }

    ::v-deep .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;

      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;
        caret-color: $cursor;
      }
    }
  }

  .input-wrapper {
    display: flex;
    align-items: center;
    width: 100%;
    position: relative;

    .icon-left {
      position: absolute;
      z-index: 10;
    }

    .icon-right {
      position: absolute;
      right: 12px;
      z-index: 10;
      cursor: pointer;
    }

    .el-input {
      width: 100%;

      :deep(.el-input__wrapper) {
        padding-left: 40px;
        padding-right: 40px;
      }
    }
  }
  .tips {
    font-size: 16px;
    line-height: 28px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }

    ::v-deep .lang-select {
      position: absolute;
      top: 4px;
      right: 0;
      background-color: white;
      font-size: 22px;
      padding: 4px;
      border-radius: 4px;
      cursor: pointer;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .loginButton {
    width: 100%;
    height: 50px;
    margin-bottom: 30px;
    font-size: 16px;
  }
}
</style>
