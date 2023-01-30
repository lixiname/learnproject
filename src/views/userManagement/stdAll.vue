<template>
  <el-dialog
      title="提示"
      v-model="dialogVisibleSuccess"
      width="30%">
    <span>重置成功</span>
    <span slot="footer" >
        <el-button type="primary" @click="dialogVisibleSuccess = false">确 定</el-button>
      </span>
  </el-dialog>
  <el-dialog
      v-model="dialogVisible"
      width="30%"
      style="height: 40%"
  >
    <el-card>
      <template #header>
        重置密码
      </template>
      <el-input v-model="password" placeholder="重置密码">
      </el-input>
      <el-button style="width: 100%" @click="submitUpdatePassword">确认重置密码</el-button>
    </el-card>
  </el-dialog>
  <div style="height: 100%;">
    <el-table :data="userList" height="70%">
      <el-table-column type="selection"></el-table-column>
      <el-table-column label="学生"  prop="name" sortable></el-table-column>
      <el-table-column label="ID"  prop="ID" sortable></el-table-column>
      <el-table-column label="年级"  prop="term"></el-table-column>
      <el-table-column label="班级"  prop="room"></el-table-column>
      <el-table-column >
        <template #default="scope">
          <el-button
              size="small"
              type="success"
              @click="updatePassword(scope.$index)">
            重置密码
          </el-button>
        </template>
      </el-table-column>

    </el-table>

  </div>
</template>

<script>
export default {
  name: "stdAll"
}
</script>
<script setup>
import {onMounted, ref} from "vue";
import request from "../../http/request.js";
let userList=ref()
userList.value=[];

let content=ref();
let dialogVisible=ref(false);
let dialogVisibleSuccess=ref(false);
let indexj=ref();
let updatePassword=(index)=>{
  indexj.value=index;
  console.log('indexj');
  dialogVisible.value=true;
}
let password=ref();
let submitUpdatePassword=()=>{
  let person=userList.value[indexj.value];
  console.log('learn');
  request.get("/home/user/MchangeStdPassword",{
    params:{
      id:person.ID,
      password:password.value
    }
  }).then(res=>{
    if(res.data=="success"){
      dialogVisibleSuccess.value=true;
      console.log(" this  success ");
      console.log(dialogVisible.value);
    }
    else if(res.data=="bad"){
      console.log(" not success");
      console.log(dialogVisible.value);
    }
  }).catch(error=>{
    console.log("error");
  });
}

onMounted(() => {
  request.get("/home/user/std",{
  }).then(function(res) {
    if(res.data){
      console.log("res.data");
      res.data.forEach(function (element){
        console.log(element);
        userList.value.push({
          name:element.studentName,
          ID:element.studentID,
          term:element.grade,
          room:element.classroom
        });
      });
      console.log('get  success');
    }
  }).catch(function(error) {
    console.log('get  error');
  });


});

</script>

<style scoped>

</style>