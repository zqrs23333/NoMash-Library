import 'bootstrap/dist/css/bootstrap.min.css'
import CryptoJS from 'crypto-js';
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'


const app = createApp(App)
app.use(PrimeVue, { theme: { preset: Aura } })
app.use(router)

app.mount('#app')

const createDefaultAdmin = () => {
    
    
    const adminData = {
      username: 'admin',
      password: '123456',
      isAustralian: true,
      reason: 'Admin account',
      gender: 'male',
      age: '35',
      userType: 'admin'
    };
    //localStorage.clear();
    const secretKey = 'your-secret-key';
        // 对 adminData 的密码进行加密
        adminData.password = CryptoJS.AES.encrypt(adminData.password, secretKey).toString();
        // 由于 adminData 不包含 confirmPassword，你可以直接将 password 赋值给 confirmPassword
        adminData.confirmPassword = adminData.password;

        if (localStorage.getItem('ifcreate') !== 'true') {
        let users = JSON.parse(localStorage.getItem('registeredUsers')) || [];
        users.push(adminData);
        localStorage.setItem('registeredUsers', JSON.stringify(users));
        localStorage.setItem('ifcreate', 'true');
        } else {
        localStorage.setItem('ifcreate', 'true');
    }
    
  }
  
  // 调用函数以创建默认管理员
  createDefaultAdmin();