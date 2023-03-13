<template>
  <el-dialog
      title="提示"
      v-model="dialogVisible"
      width="30%">
    <span>{{content}}了</span>
    <span slot="footer" >
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
  </el-dialog>
  <div style="height: 100%;">
  <div v-if="identity=='student'">
    <el-row justify="center">
      <el-col :span="15">
        <el-card>
          <template #header>
            <div>
              <span>学生个人信息</span>
            </div>
          </template>
          <div>
            <el-descriptions :border="true" :column="1">
              <el-descriptions-item >
                <template #label>
                  <el-icon><UserFilled /></el-icon>
                  姓名
                </template>
                {{studentName}}
              </el-descriptions-item>
              <el-descriptions-item >
                <template #label>
                  <el-icon><Menu /></el-icon>
                  ID
                </template>
                {{studentID}}
              </el-descriptions-item>
              <el-descriptions-item >
                <template #label>
                  <el-icon><Memo /></el-icon>
                  班级
                </template>
                {{classroom}}
              </el-descriptions-item>
              <el-descriptions-item >
                <template #label>
                  <el-icon><Memo /></el-icon>
                  年级
                </template>
                {{grade}}
              </el-descriptions-item>
              <el-descriptions-item >
                <template #label>
                  <el-icon><Memo /></el-icon>
                  电话
                </template>
                {{phone}}
              </el-descriptions-item>
              <el-descriptions-item >
                <template #label>
                  <el-icon><Memo /></el-icon>
                  专业
                </template>
                {{academy}}
              </el-descriptions-item>

              <el-descriptions-item v-if="managementIdentity!='management'">
                <template #label>
                  <div>
                    <el-icon><Memo /></el-icon>
                    旧密码
                  </div>
                </template>
                <el-input v-model="password" >
                  <template #prefix>
                    <el-icon><Lock /></el-icon>
                  </template>
                </el-input>
              </el-descriptions-item>
              <el-descriptions-item v-if="managementIdentity!='management'">
                <template #label>
                  <div>
                    <el-icon><Memo /></el-icon>
                    新密码
                  </div>
                </template>
                <el-input v-model="passwordnew" >
                  <template #prefix>
                    <el-icon><Lock /></el-icon>
                  </template>
                </el-input>
              </el-descriptions-item>

            </el-descriptions>
            <el-row justify="center" v-if="managementIdentity!='management'">
              <el-col :span="5">
                <el-button
                    @click="updatePass">确认修改</el-button>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
  <div v-if="identity=='teacher'">
    <el-row justify="center">
      <el-col :span="15">
        <el-card>
          <template #header>
            <div>
              <span>老师个人信息</span>
            </div>
          </template>
          <div>
            <el-descriptions :border="true" :column="1">
              <el-descriptions-item >
                <template #label>
                  <el-icon><UserFilled /></el-icon>
                  姓名
                </template>
                {{teacherName}}
              </el-descriptions-item>
              <el-descriptions-item >
                <template #label>
                  <el-icon><Menu /></el-icon>
                  ID
                </template>
                {{teacherID}}
              </el-descriptions-item>
              <el-descriptions-item >
                <template #label>
                  <el-icon><Memo /></el-icon>
                  职称
                </template>
                {{grade2}}
              </el-descriptions-item>
              <el-descriptions-item >
                <template #label>
                  <el-icon><Memo /></el-icon>
                  手机号
                </template>
                {{phone2}}
              </el-descriptions-item>

              <el-descriptions-item >
                <template #label>
                  <el-icon><Memo /></el-icon>
                  专业
                </template>
                {{academy2}}
              </el-descriptions-item>

              <el-descriptions-item v-if="managementIdentity!='management'">
                <template #label>
                  <div>
                    <el-icon><Memo /></el-icon>
                    旧密码
                  </div>
                </template>
                <el-input v-model="password" >
                  <template #prefix>
                    <el-icon><Lock /></el-icon>
                  </template>
                </el-input>
              </el-descriptions-item>
              <el-descriptions-item  v-if="managementIdentity!='management'">
                <template #label>
                  <div>
                    <el-icon><Memo /></el-icon>
                    新密码
                  </div>
                </template>
                <el-input v-model="passwordnew" >
                  <template #prefix>
                    <el-icon><Lock /></el-icon>
                  </template>
                </el-input>
              </el-descriptions-item>
            </el-descriptions>
            <el-row justify="center" v-if="managementIdentity!='management'">
              <el-col :span="5">
                <el-button
                    @click="updatePass">确认修改</el-button>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
  </div>
</template>

<script>
export default {
  name: "updateUserInformation"
}
</script>

<script setup>
import { getTokenIdentity, getTokenID} from '../../utils/auth.js'
import {onMounted, ref} from "vue";
import request from "../../http/request.js";
import {useRoute} from "vue-router/dist/vue-router";
let route=useRoute();
let teacherName=ref();
let teacherID=ref();
let phone2=ref();
let grade2=ref();
let academy2=ref();
let identity=ref();
identity.value=getTokenIdentity();
let managementIdentity=ref();
managementIdentity.value='';
let studentName=ref();
let studentID=ref();
let classroom=ref();
let academy=ref();
let grade=ref();
let phone=ref();

let password=ref();
let passwordnew=ref();
let content=ref();
let dialogVisible=ref(false);
let updatePass=()=>{
  let id=getTokenID();
  if(getTokenIdentity()=="student"){
    request.get("/home/user/StdchangePass",{
      params:{
        id:id,
        password:password.value,
        passwordnew:passwordnew.value
      }
    }).then(function(res) {
      if(res.data){
        dialogVisible.value=true;
        if(res.data=='1'){
          content.value='修改成功';
        }
        else if(res.data=='2'){
          content.value='旧密码错误';
        }
      }
    }).catch(function(error) {
      console.log('get  error');
    });
  }
  else if(getTokenIdentity()=="teacher"){
    request.get("/home/user/teachchangePass",{
      params:{
        id:id,
        password:password.value,
        passwordnew:passwordnew.value
      }
    }).then(function(res) {
      if(res.data){
        dialogVisible.value=true;
        if(res.data=='1'){
          content.value='修改成功';
        }
        else if(res.data=='2'){
          content.value='旧密码错误';
        }
      }
    }).catch(function(error) {
      console.log('get  error');
    });
  }

}

onMounted(() => {
  let id=getTokenID();
  if(identity.value=='management'){
    managementIdentity.value=identity.value;
    id=route.query.userID;
    identity.value=route.query.userIdentity;
  }
  if(identity.value=="student"){
    request.get("/home/user/oneStd",{
      params:{
        id:id
      }
    }).then(function(res) {
      if(res.data){
        console.log("res.data");

          studentName.value=res.data.studentName;
          studentID.value=res.data.studentID;
          phone.value=res.data.phone;
          grade.value=res.data.grade;
          classroom.value =res.data.classroom;
          academy.value=res.data.academy;
        console.log('get  success');
      }
    }).catch(function(error) {
      console.log('get  error');
    });
  }
  else if(identity.value=="teacher"){
    request.get("/home/user/oneteach",{
      params:{
        id:id
      }
    }).then(function(res) {
      if(res.data){
        console.log("res.data");
          teacherName.value=res.data.teacherName;
          teacherID.value=res.data.teacherID;
          phone2.value=res.data.phone;
          grade2.value=res.data.grade;
          academy2.value=res.data.academy;
        console.log('get  success');
      }
    }).catch(function(error) {
      console.log('get  error');
    });
  }

});

</script>
<style scoped>

</style>