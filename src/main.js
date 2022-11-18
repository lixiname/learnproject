import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import Router from './router/index.js';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import  mock from './mock/index.js'
import axios from "axios";
const app=createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.config.globalProperties.$http=axios;
app.use(ElementPlus);
app.use(mock);
//app.use(axios);
app.use(Router);
app.mount('#app');
