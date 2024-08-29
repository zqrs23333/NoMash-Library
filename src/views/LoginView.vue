<template>
    <div class="login">
      <h1>Login</h1>
      <form @submit.prevent="login">
        <div>
          <label for="username">Username:</label>
          <input type="text" v-model="username" required />
        </div>
        <div>
          <label for="password">Password:</label>
          <input type="password" v-model="password" required />
        </div>
        <button type="submit">Login</button>
      </form>
      <div v-if="error" class="error">{{ error }}</div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  
  const username = ref('')
  const password = ref('')
  const error = ref('')
  const router = useRouter()
  
  const login = () => {
    if (username.value === 'admin' && password.value === 'password') {
      localStorage.setItem('isAuthenticated', 'true')
      router.push('/about')
    } else {
      error.value = 'Invalid username or password'
    }
  }
  </script>
  
  <style scoped>
  </style>
  