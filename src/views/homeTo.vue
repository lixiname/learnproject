<template>
  <div style="height:100%;width: 100%">
    <el-container style="background-color:rgb(231,221,203); height: 100%;">
      <el-header style="height: 5%;" class="header-layout">
        <el-row justify="space-between" align="middle" style="height: 100%;">
          <el-col :span="22" >
            管理系统
          </el-col>
          <el-col :span="1" >
            adm登录
          </el-col>
          <el-col :span="1">
            退出
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
                     style="height: 100%;">
              <el-sub-menu index="1" >
                <template #title>书籍管理</template>
                <el-menu-item-group class="menu-group">
                  <el-menu-item index="1-1" route="/home/bookSummary" >图书查看</el-menu-item>
                  <el-menu-item index="1-2" route="/home/bookAdd" >书籍添加</el-menu-item>
                </el-menu-item-group>
              </el-sub-menu>
              <el-sub-menu index="2" >
                <template #title>课程管理</template>
                <el-menu-item-group class="menu-group">
                  <el-menu-item index="2-1" >20：20 第三节课</el-menu-item>
                  <el-menu-item index="2-2" >20：30 第四节课</el-menu-item>
                </el-menu-item-group>
              </el-sub-menu>
              <el-sub-menu index="3" >
                <template #title>作业管理</template>
                <el-menu-item-group class="menu-group">
                  <el-menu-item index="3-1" route="/home/homeworkRequest">作业要求</el-menu-item>
                  <el-menu-item index="3-2" route="/home/processHomework">作业上传</el-menu-item>
                  <el-menu-item index="3-3" route="/home/homeworkScore">作业成绩</el-menu-item>
                  <el-menu-item index="3-4" route="/home/homeworkTime">作业提交截止时间</el-menu-item>
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


</style>
