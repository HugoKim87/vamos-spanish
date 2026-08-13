import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import { router } from './router.js';
import { useAuthStore } from './stores/auth.js';
import './styles/main.css';

const app = createApp(App);
app.use(createPinia()).use(router);

// 로그인 세션 복원 (비동기 — 마운트를 막지 않음)
useAuthStore().init();

app.mount('#app');
