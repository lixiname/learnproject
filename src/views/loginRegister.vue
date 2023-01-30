<template>
  <div class="layout" >
    <el-tabs type="border-card" stretch="true" >
      <el-tab-pane label="登录" >
        <el-form
            label-position="right"
            label-width="70px"
            style="max-width: 500px"
            :model="form"

        >
          <el-form-item label="工号：" prop="idCard">
            <el-input v-model="form.idCard" placeholder="11位" >
            <template #prefix>
              <el-icon><User /></el-icon>
            </template>
            </el-input>
          </el-form-item>
          <el-form-item label="密码：" prop="password">
            <el-input type="password" placeholder="至少8位" show-password="true" v-model="form.password" >
            <template #prefix>
              <el-icon><Lock /></el-icon>
            </template>
            </el-input>
          </el-form-item>
          <el-form-item label="身份：" prop="radioIdentity"
          @change="radioChange">
            <el-radio-group v-model="form.radioIdentity">
              <el-radio label="1"  >老师</el-radio>
              <el-radio label="2"  >学生</el-radio>
              <el-radio label="3"  >管理员</el-radio>
              <el-radio label="4"  >超级</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item>
              <el-checkbox
                  class="checkBox"
                  v-model="isAgree"
                  name="type"
              >
                同意用户使用准则
              </el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-collapse v-model="array">
              <el-collapse-item name="1" title="详情">
                <el-scrollbar height="100px">
                  用户使用准则具体内容
                </el-scrollbar>

              </el-collapse-item>
            </el-collapse>
          </el-form-item>
          <el-button
              v-if="isAgree"
              type="primary"
              class="loginBtn"
              @click="login"
          >
            登录
          </el-button>
        </el-form>
      </el-tab-pane>

      <el-tab-pane label="注册">
        <el-form
            label-position="right"
            label-width="60px"
            style="max-width: 460px"
            class="loginForm"
        >
          <el-form-item label="ID：">
            <el-input v-model="idx" placeholder="140203">
              <template #prefix>
                <el-icon><User /></el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label="姓名：">
            <el-input v-model="namedsx" placeholder="hong">
              <template #prefix>
                <el-icon><User /></el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label="电话：">
            <el-input v-model="phoness" placeholder="135...">
              <template #prefix>
                <el-icon><User /></el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label="密码：">
            <el-input type="password" placeholder="至少8位"  v-model="passwordfirst">
              <template #prefix>
                <el-icon><Lock /></el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label="确认密码：">
            <el-input type="password"  v-model="passwordagain">
              <template #prefix>
                <el-icon><Lock /></el-icon>
              </template>
            </el-input>
          </el-form-item>
<!--          <el-form-item label="验证码：">-->
<!--            <el-row >-->
<!--              <el-col span="1">-->
<!--                <el-input-->
<!--                    type="password"-->
<!--                    v-model="identifyCode"-->
<!--                    class="inpWidth"-->
<!--                />-->
<!--              </el-col>-->
<!--              <el-col span="4">-->
<!--                <el-button type="primary" @click="getIdentifyCode" plain>-->
<!--                  获取验证码-->
<!--                </el-button>-->
<!--              </el-col>-->
<!--            </el-row>-->
<!--          </el-form-item>-->

          <el-form-item>
            <el-checkbox
                class="checkBox"
                v-model="isAgree"
                name="type"
            >
              同意用户使用准则content
            </el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-collapse v-model="array">
              <el-collapse-item name="1" title="详情">
                <el-scrollbar height="100px">
                  同意用户使用准则content
                </el-scrollbar>

              </el-collapse-item>
            </el-collapse>
          </el-form-item>
          <el-button
              v-if="isAgree"
              type="primary"
              @click="registersx"
          >
            注册
          </el-button>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: "loginRegister",
  data(){
    return{
      isAgree:false,
      array:['1','2','3'],
      userNormContent:''
    }
  },
  methods:{
    // login:function (){
    //   //window.location.href='/home';
    //   console.log('to');
    //   this.$router.push({path:'/home'});
    //
    // },
    NormContent:function (){
      console.log('content');
    }

  }
}
</script>
<script setup>
import {setTokenID,setTokenN,setTokenIdentity} from '../utils/auth.js'
import {ref, reactive, onMounted} from "vue";
import { useRouter } from 'vue-router';
import request from "../http/request.js";
let router=useRouter();

// let idCard=ref();
// let password=ref();
// let radioIdentity=ref();
let form=reactive({
  idCard:'20212232145',
  password:'12345678',
  radioIdentity:'1'
});
let formRule=reactive({
  idCard:[
    {

      min:6,
      message:"输入长度不对"
    },
    {
      type:"string",
      required:true,
      pattern : /^[0-9]+$/,
      message:"只能输入数字"
    }
  ],
  password:[
    {
      min:8,
      message:"至少输入8位长度",
      required:true
    }
  ],
  radioIdentity:[

  ]
});
let login=function (){

  console.log(form.radioIdentity);
  let identity=form.radioIdentity;
  if(identity=='1'){
    request.get("/first/loginTeacher",{
      params:{
        idCard:form.idCard,
        password:form.password
      }
    }).then(function(res) {
        if(res.data){
//truth http
          if(res.data.success=="yes"){
            setTokenID(res.data.idCard);
            setTokenN(res.data.name) ;
            setTokenIdentity(res.data.identity) ;
            router.push({path:'/home'});
          }
          else{
            console.log("重新登陆");
          }
          console.log(res.data);
        }
      }).catch(function(error) {
        console.log('login error');
      });
  }
  else if(identity=='2'){
    request.get("/first/loginStudent",{
      params:{
        idCard:form.idCard,
        password:form.password
      }
    }).then(function(res) {
      if(res.data){
//truth http
        if(res.data.success=="yes"){
          setTokenID(res.data.idCard);
          setTokenN(res.data.name) ;
          setTokenIdentity(res.data.identity) ;
          router.push({path:'/home'});
        }
        else{
          console.log("重新登陆");
        }
        console.log(res.data);
      }
    }).catch(function(error) {
      console.log('login error');
    });
  }
  else if(identity=='3'){
    request.get("/first/loginManagement",{
      params:{
        idCard:form.idCard,
        password:form.password
      }
    }).then(function(res) {
      if(res.data){
//truth http
        if(res.data.success=="yes"){
          setTokenID(res.data.idCard);
          setTokenN(res.data.name) ;
          setTokenIdentity(res.data.identity) ;
          router.push({path:'/home'});
        }
        else{
          console.log("重新登陆");
        }
        console.log(res.data);
      }
    }).catch(function(error) {
      console.log('login error');
    });
  }
  else if(identity=='4'){
    //teacher
    setTokenID("20212232145");
    setTokenN("sp") ;
    setTokenIdentity("super") ;
    router.push({path:'/home'});
  }

  //router.push({path:'/home'});
};

let radioChange=()=>{
  if(form.radioIdentity=='1'){
    form.idCard='20212232145'; form.password='12345678';
  }
  else if(form.radioIdentity=='2'){
    form.idCard='20202232100'; form.password='12345678';
  }
  else if(form.radioIdentity=='3'){
    form.idCard='140102'; form.password='12345678';
  }
  else if(form.radioIdentity=='4'){
    form.idCard='00000001'; form.password='12345678';
  }
}
let idx=ref();
let namedsx=ref();
let passwordfirst=ref();
let passwordagain=ref();
let phoness=ref();
let registersx=()=>{
  console.log(idx);
  request.get("/home/user/addmanage",{
    params:{
      id:idx.value,
      name:namedsx.value,
      phone:phoness.value,
      password:passwordfirst.value,
    }
  }).then(function(res) {
    if(res.data){
      if(res.data=='1'){
        content.value='注册成功';
      }
      else if(res.data=='2'){
        content.value='重复注册';
      }
    }
  }).catch(function(error) {
    console.log('get  error');
  });

}
onMounted(() => {
  document.cookie='user=xw';
});
</script>

<style scoped>
.layout {
  position: absolute;
  left: calc(50% - 200px);
  top: 20%;
  width: 400px;

}
.loginForm {
  text-align: center;
}
.loginBtn{
  width:100%
}

</style>