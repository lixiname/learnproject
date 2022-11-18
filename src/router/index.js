import { createRouter, createWebHistory } from "vue-router"
import loginRegister from '../views/loginRegister.vue'
import bookList from '../views/bookManagement/bookList.vue'
import bookAdd from '../views/bookManagement/bookAdd.vue'
import bookView from '../views/bookManagement/bookView.vue'

import knowledgeList from '../views/informationManagement/teacher/knowledge/knowledgeList.vue'
import knowledgeChild from '../views/informationManagement/teacher/knowledge/knowledgeChildList.vue'
import knowledgeStudySituationList from '../views/informationManagement/teacher/studySituation/studySituationList.vue'

import homeworkTime from '../views/homeworkManagement/student/homeworkTime.vue'
import processHomework from '../views/homeworkManagement/student/processHomework.vue'

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
                path:'knowledgeSummary',
                component:knowledgeList,
                name: 'knowledgeSummary'
            },
            {
                path:'knowledgeChild',
                component:knowledgeChild,
                name: 'knowledgeChild'
            },
            {
                path:'knowledgeStudySituation',
                component:knowledgeStudySituationList,
                name: 'knowledgeStudySituation'
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