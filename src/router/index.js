import { createRouter, createWebHistory } from "vue-router"
import loginRegister from '../views/loginRegister.vue'
import bookList from '../views/bookManagement/bookList.vue'
import bookAdd from '../views/bookManagement/bookAdd.vue'
import bookView from '../views/bookManagement/bookView.vue'
import homeworkTime from '../views/homeworkManagement/homeworkTime.vue'
import processHomework from '../views/homeworkManagement/processHomework.vue'

import home from '../views/homeTo.vue';
const routes=[
    {
        path:'/',
        component:loginRegister ,
        name:'loginRegister'
    },
    {
        path:'/home',
        component: home,
        name:'home',
        children:[
            {
                path:'bookSummary',
                component:bookList,
                name: 'bookSummary'
            },
            {
                path:'bookAdd',
                component:bookAdd,
                name: 'bookAdd'
            },
            {
                path:'bookView',
                component:bookView,
                name: 'bookView'
            },
            {
                path:'homeworkTime',
                component:homeworkTime,
                name: 'homeworkTime'
            },
            {
                path:'processHomework',
                component:processHomework,
                name: 'processHomework'
            },

        ]
    },




];
const Router=createRouter({
    history:createWebHistory(),
    routes:routes
});
export default Router;