<template>
  <div class="layout" >
    <el-tabs type="border-card" stretch="true" >
      <el-tab-pane label="登录" >
        <el-form
            label-position="right"
            label-width="60px"
            style="max-width: 460px"
        >
          <el-form-item label="邮箱：">
            <el-input v-model="email" placeholder="xxx@xxx.com" >
            <template #prefix>
              <el-icon><User /></el-icon>
            </template>
            </el-input>
          </el-form-item>
          <el-form-item label="密码：">
            <el-input type="password" placeholder="至少8位" show-password="true" v-model="password" >
            <template #prefix>
              <el-icon><Lock /></el-icon>
            </template>
            </el-input>
          </el-form-item>
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
                  同意用户使用准则content同意用户使用准则content同意用户使用准则content同意用户使用准则content同意用户使用准则content
                  同意用户使用准则content同意用户使用准则content同意用户使用准则content同意用户使用准则content同意用户使用准则content
                  同意用户使用准则content同意用户使用准则content同意用户使用准则content同意用户使用准则content同意用户使用准则content
                  同意用户使用准则content同意用户使用准则content同意用户使用准则content同意用户使用准则content同意用户使用准则content
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
          <el-form-item label="邮箱：">
            <el-input v-model="rEmail" placeholder="xxx@xxx.com">
              <template #prefix>
                <el-icon><User /></el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label="密码：">
            <el-input type="password" placeholder="至少8位" show-password v-model="rPassword" >
              <template #prefix>
                <el-icon><Lock /></el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label="确认密码：">
            <el-input type="password"  show-password v-model="confirmPassword" >
              <template #prefix>
                <el-icon><Lock /></el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label="验证码：">
            <el-row >
              <el-col span="1">
                <el-input
                    type="password"
                    v-model="identifyCode"
                    class="inpWidth"
                />
              </el-col>
              <el-col span="4">
                <el-button type="primary" @click="getIdentifyCode" plain>
                  获取验证码
                </el-button>
              </el-col>
            </el-row>
          </el-form-item>

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
                  同意用户使用准则content同意用户使用准则content同意用户使用准则content同意用户使用准则content同意用户使用准则content
                  同意用户使用准则content同意用户使用准则content同意用户使用准则content同意用户使用准则content同意用户使用准则content
                  同意用户使用准则content同意用户使用准则content同意用户使用准则content同意用户使用准则content同意用户使用准则content
                  同意用户使用准则content同意用户使用准则content同意用户使用准则content同意用户使用准则content同意用户使用准则content
                </el-scrollbar>

              </el-collapse-item>
            </el-collapse>
          </el-form-item>
          <el-button
              v-if="isAgree"
              type="primary"
              class="loginBtn"
              @click="register"
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
      email:'',
      isAgree:false,
      password:'',
      array:['1','2','3'],
      userNormContent:''
    }
  },
  methods:{
    login:function (){
      //window.location.href='/home';
      console.log('to');
      this.$router.push({path:'/home'});

    },
    NormContent:function (){
      console.log('content');
    }

  }
}
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