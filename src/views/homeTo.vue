<template>
  <div style="height:100%;width: 100%">
    <el-container style="background-color:rgb(231,221,203); height: 100%;">
      <el-header style="height: 5%;" class="header-layout">
        <el-row justify="space-between" align="middle" style="height: 100%;">
          <el-col :span="3">
            <el-radio-group v-model="isCollapse"  >
              <el-radio-button :label="false">展开</el-radio-button>
              <el-radio-button :label="true">隐藏</el-radio-button>
            </el-radio-group>
          </el-col>
          <el-col :span="16" >
            管理系统
          </el-col>
          <el-col :span="2" >
            身份-{{identityStatus}}
            <el-icon><Setting /></el-icon>
          </el-col>
          <el-col :span="1"
                  >
            <el-button
                plain
                size="small"
                @click="quit()">
              退出
            </el-button>
          </el-col>
        </el-row>
      </el-header>
      <el-container style="height: 95%;">
        <el-aside >
          <div style="height: 100%;">
            <el-menu
                     :router="true"  default-active="1"  background-color="rgb(50,65,86)"
                     text-color="rgb(244,244,245)"
                     active-text-color="rgb(81,158,253)"
                     :collapse="isCollapse"
                     style="height: 100%;">

              <el-sub-menu index="5" >
                <template #title>首页</template>
                <!--                <template #title>函数图像管理</template>-->
                <el-menu-item-group class="menu-group">
                  <div v-if="identity=='management'||identity=='super'">
                    <el-menu-item index="5-1" route="/home/schoolNewStd" >校内资讯</el-menu-item>
                  </div>
                  <div v-if="identity=='teacher'||identity=='student'||identity=='super'">
                    <el-menu-item index="5-2" route="/home/schoolNewStd" >校内资讯</el-menu-item>
                  </div>
                </el-menu-item-group>
              </el-sub-menu>

              <el-sub-menu index="1" >
                <template #title><el-icon><Reading /></el-icon>
                  <span>书籍管理</span>
                </template>
<!--                <template #title>函数图像管理</template>-->
                <el-menu-item-group class="menu-group">
                  <div v-if="identity=='management'||identity=='super'">
                    <el-menu-item index="1-1" route="/home/bookSummary" >图书查看</el-menu-item>
                    <el-menu-item index="1-3" route="/home/bookAudit" >图书审核</el-menu-item>
                  </div>
                  <div v-if="identity=='teacher'||identity=='student'||identity=='super'">
                    <el-menu-item index="1-2" route="/home/bookUserSummary" >图书查看</el-menu-item>
                    <el-menu-item index="1-4" route="/home/bookAdd" >分享图书</el-menu-item>
                  </div>


<!--                  <el-menu-item index="1-1" route="/home/bookSummary" >函数图像查阅</el-menu-item>-->
<!--                  <el-menu-item index="1-2" route="/home/bookAudit" >函数图像上传</el-menu-item>-->
                </el-menu-item-group>
              </el-sub-menu>

              <el-sub-menu index="2" v-if="identity=='teacher'||identity=='student'">
                <template #title>
                  <el-icon><School /></el-icon>
                  <span>课程管理</span>
                </template>
                <!--                <template #title>习题管理</template>-->

                <el-menu-item-group class="menu-group">
                  <div v-if="identity=='teacher'||identity=='super'">
                    <el-menu-item index="2-1" route="/home/knowledgeSummary">资料上传</el-menu-item>
                    <el-menu-item index="2-2" route="/home/knowledgeStudySituation">班级学习情况</el-menu-item>
<!--                    <el-menu-item index="2-3" route="/home/stdSituationChart">学习情况图表</el-menu-item>-->

                  </div>
                  <div v-if="identity=='student'||identity=='super'">
                    <el-menu-item index="2-3" route="/home/stdSituationList">资料学习</el-menu-item>
                  </div>
                  <!--                  <el-menu-item index="2-1" route="/home/knowledgeSummary">习题查阅</el-menu-item>-->
                  <!--                  <el-menu-item index="2-2" route="/home/homeworkPublicate">习题上传</el-menu-item>-->
                  <!--                  <el-menu-item index="2-3" route="/home/knowledgeStudySituation">用户练习情况</el-menu-item>-->
                </el-menu-item-group>
              </el-sub-menu>

              <el-sub-menu index="3" v-if="identity=='teacher'||identity=='student'">
                <template #title>
                  <el-icon><Memo /></el-icon>
                  <span>作业管理</span>
                </template>
                <!--                <template #title>案例管理</template>-->
                <el-menu-item-group class="menu-group">
                  <div v-if="identity=='student'||identity=='super'">
<!--                   <el-menu-item index="3-1" route="/home/doHomework">做作业</el-menu-item>-->
                    <el-menu-item index="3-2" route="/home/shomeworkAll">作业清单</el-menu-item>
                    <el-menu-item index="3-3" route="/home/homeworkTime">作业提交截止时间</el-menu-item>
                  </div>
                  <div v-if="identity=='teacher'||identity=='super'">
                    <el-menu-item index="3-4" route="/home/addHomework">出题</el-menu-item>
                    <el-menu-item index="3-5" route="/home/thomeworkList">全部作业</el-menu-item>
                    <el-menu-item index="3-6" route="/home/homeworkPublicate">作业成绩</el-menu-item>
                  </div>
                    <!--                  <el-menu-item index="3-1" route="/home/homeworkRequest">案例查阅</el-menu-item>-->
                    <!--                  <el-menu-item index="3-2" route="/home/processHomework">案例上传</el-menu-item>-->
                </el-menu-item-group>
              </el-sub-menu>

              <el-sub-menu index="4" >
                <template #title>
                  <el-icon><UserFilled /></el-icon>
                  <span>用户管理</span>
                </template>
                <!--                <template #title>案例管理</template>-->
                <el-menu-item-group class="menu-group">
                  <div v-if="identity=='teacher'||identity=='student'||identity=='super'">
                    <el-menu-item index="4-1" route="/home/updateUserInformation">修改信息</el-menu-item>
                    <el-menu-item index="4-2" route="/home/sharedBook">查看分享过的图书</el-menu-item>
                  </div>
                  <div v-if="identity=='management'||identity=='super'">
                    <el-menu-item index="4-1" route="/home/teachAll">老师清单</el-menu-item>
                    <el-menu-item index="4-2" route="/home/stdAll">学生清单</el-menu-item>
                  </div>

                </el-menu-item-group>
              </el-sub-menu>

            </el-menu>

          </div>
        </el-aside>
        <el-main >
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>

  </div>



</template>

<script>
// import HelloWorld from '../components/HelloWorld.vue'

export default {
  name: 'AppQp',
  // components: {
  //   HelloWorld
  // },
  methods:{
    open(){

    }

  }

}
</script>
<script setup>
import {removeTokens,getTokenID,getTokenN,getTokenIdentity} from '../utils/auth.js'
import {ref, reactive, onMounted} from "vue";
import { useRouter } from 'vue-router';
let identityStatus=ref();
let identity=ref();
identity.value=getTokenIdentity();
if(identity.value=="teacher"){
  identityStatus.value="老师";
}
else if(identity.value=="student"){
  identityStatus.value="学生";
}
else if(identity.value=="management"){
  identityStatus.value="管理员";
}
else if(identity.value=="super"){
  identityStatus.value="开发者";
}
let isCollapse = ref(false);
let quit=()=>{
  removeTokens();
  router.push({path:'/'});
}
let router=useRouter();
</script>



<style scoped>
/*el-container{*/
/*  height: 100%;*/
/*}*/
.header-layout{
  text-align:center;
  background-image: linear-gradient(to right ,rgb(56,179,221) ,rgb(6,2,71));
  color:rgb(244,244,245)

}
.menu-group{
  background-color: rgb(33,45,61) ;

}

.box1{float:left;height:50px;width:100px;background:red;border:1px;padding:10px;margin:15px;}
.box2{float:left;height:50px;width:100px;background:red;border:1px;padding:10px;margin:15px;}
.box3{float:left;height:50px;width:100px;background:red;border:1px;padding:10px;margin:15px;}
</style>
