import { createRouter, createWebHistory ,createWebHashHistory} from "vue-router"
import {getTokenID} from '../utils/auth.js'
import loginRegister from '../views/loginRegister.vue'
import bookList from '../views/bookManagement/manager/bookList.vue'
import bookUserList from '../views/bookManagement/user/bookList.vue'
import bookAdd from '../views/bookManagement/user/bookAdd.vue'
import bookUserView from '../views/bookManagement/user/bookView.vue'
import bookView from '../views/bookManagement/manager/bookView.vue'
import bookCorrection from '../views/bookManagement/manager/bookCorrection.vue'
import bookAudit from '../views/bookManagement/manager/bookAudits.vue'
import knowledgeList from '../views/informationManagement/teacher/knowledge/knowledgeList.vue'
import knowledgeChild from '../views/informationManagement/teacher/knowledge/knowledgeChildList.vue'
import knowledgeStudySituationList from '../views/informationManagement/teacher/studySituation/studySituationList.vue'
import studySituationChildList from '../views/informationManagement/teacher/studySituation/studySituationChildList.vue'
import homeworkTime from '../views/homeworkManagement/student/homeworkTime.vue'
import processHomework from '../views/homeworkManagement/student/processHomework.vue'
import homeworkPublicate  from "../views/homeworkManagement/teacher/homeworkPublicate.vue";
import  updateUserInformation from "../views/userManagement/updateUserInformation.vue"
import  sharedBookList from "../views/userManagement/uploadBookList.vue"
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
                path:'bookUserSummary',
                component:bookUserList,
                name: 'bookUserSummary'
            },
            {
                path:'bookCorrection',
                component:bookCorrection,
                name: 'bookCorrection'
            },
            {
                path:'bookAudit',
                component:bookAudit,
                name: 'bookAudit'
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
                path:'userBookView',
                component:bookUserView,
                name: 'userBookView'
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
                path:'studySituationChild',
                component:studySituationChildList,
                name: 'studySituationChild'
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

            {
                path:'homeworkPublicate',
                component:homeworkPublicate,
                name: 'homeworkPublicate'
            },


            {
                path:'updateUserInformation',
                component:updateUserInformation,
                name: 'updateUserInformation'
            },
            {
                path:'sharedBook',
                component:sharedBookList,
                name: 'sharedBook'
            },

        ]
    },
];
const Router=createRouter({
    history:createWebHistory(),
    routes:routes
});
Router.beforeEach((to, from, next)=>{
    if(getTokenID()){
        if(to.path==='/'){
            next({
                path:'/home'
            });
        }
        else{
            next();
        }
    }
    else{
        if(to.path=='/'){
            next();
        }
        else{
            next({path:'/'});
        }

    }
});
export default Router;