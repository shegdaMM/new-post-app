import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { Quasar } from 'quasar';
import quasarUserOptions from './quasar-user-options';
import VueToast from 'vue-toast-notification';
import './styles/main.scss';
import 'vue-toast-notification/dist/theme-sugar.css';

import axoisSetup from './services/auth.js';
const api = axoisSetup();

const app = createApp(App);
app
.use(Quasar, quasarUserOptions)
.use(store)
.use(router)
.use(VueToast)
.mount('#app');

app.config.globalProperties.$api = api;
