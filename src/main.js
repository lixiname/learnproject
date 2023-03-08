import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import Router from './router/index.js';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import Vcharts from "vue-echarts";
import axios from "axios";
//import  mock from './mock/index.js';


import * as uses  from "echarts/core";

// 手动引入 ECharts 各模块来减小打包体积
import {
    CanvasRenderer
} from 'echarts/renderers'
import {
    LineChart
} from 'echarts/charts'
import {
    GridComponent,
    TooltipComponent
} from 'echarts/components'

uses.use([
    CanvasRenderer,
    LineChart,
    GridComponent,
    TooltipComponent
]);




const app=createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}

// 全局注册组件（也可以使用局部注册）
//app.component('v-chart', uses);

//app.config.globalProperties.$http=axios;
app.use(ElementPlus);
//app.use(Vcharts);
//app.use(mock);
app.use(Router);
app.mount('#app');
