<template>
  <div class="login-container">
    <h2>Login</h2>
    <form @submit.prevent="login">
      <div class="mb-3">
        <label for="username" class="form-label">Username</label>
        <input type="text" class="form-control" v-model="username" required />
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input type="password" class="form-control" v-model="password" required />
      </div>
      <div class="mb-3">
        <label for="userType" class="form-label">User type</label>
        <select class="form-select" type="userType" v-model="userType" required>
          <option value="user">User</option>
          <option value="Admin">Admin</option>
            </select>
      </div>

      <button type="submit" class="btn btn-primary">Login</button>
      <div v-if="loginError" class="text-danger mt-3">{{ loginError }}</div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import CryptoJS from 'crypto-js';

// 用户输入的数据
const username = ref('')
const password = ref('')
const loginError = ref(null)
const router = useRouter()
const userType = ref('user')

const login = () => {
  const users = JSON.parse(localStorage.getItem('registeredUsers')) || []
  const secretKey = 'your-secret-key';

  // 通过用户名查找用户
  const user = users.find(user => user.username === username.value && user.userType === userType.value)

  if (user) {
    // 解密存储的密码
    const decryptedPassword = CryptoJS.AES.decrypt(user.password, secretKey).toString(CryptoJS.enc.Utf8);

    // 将解密后的密码与用户输入的密码进行比较
    if (decryptedPassword === password.value) {
      localStorage.setItem('isAuthenticated', 'true')
      router.push('/about').then(() => {
        router.go(0) // 刷新页面以确保 BHeader 立即更新
      })
    } else {
      loginError.value = 'Invalid username or password'
    }
  } else {
    loginError.value = 'Invalid username or password'
  }
}



</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
}
</style>

