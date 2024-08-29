<template>
    <div>
      <h1>About Our Library</h1>
      <p>Welcome to our digital library! Only authenticated users can see this page.</p>
      <button @click="logout">Logout</button>
    </div>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router'
  
  const router = useRouter()
  
  const logout = () => {
    localStorage.removeItem('isAuthenticated')
    router.push('/login')
  }

  
  </script>

  
  