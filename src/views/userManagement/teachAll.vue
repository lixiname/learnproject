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
    <el-table :data="userList.slice((currentPage-1)*pageSize,currentPage*pageSize)" height="70%">
      <el-table-column type="selection"></el-table-column>
      <el-table-column label="老师"  prop="name" sortable></el-table-column>
      <el-table-column label="ID"  prop="ID" sortable></el-table-column>
      <el-table-column label="职称"  prop="grade"></el-table-column>
      <el-table-column label="电话"  prop="phone"></el-table-column>
      <el-table-column >
        <template #default="scope">
          <el-button
              size="small"
              type="success"
              @click="updatePassword(scope.$index)">
            重置密码
          </el-button>
          <el-button
              size="small"
              type="success"
              @click="userDetail(scope,scope.$index)"
          >详情</el-button
          >
        </template>
      </el-table-column>

    </el-table>
    <el-row align="middle" justify="center" >
      <el-col :span="10">
        <el-pagination layout="sizes,prev,pager,next,jumper" :total="bookListLength" :pager-count="5" :page-sizes="pageSizes"
                       @size-change="sizesChange"
                       @current-change="changeCurrentPage"
                       prev-text="上一页"
                       next-text="下一页"
                       :small="true" :background="true">
        </el-pagination>
      </el-col>
    </el-row>

  </div>
</template>

<script>
export default {
  name: "teachAll"
}
</script>
<script setup>
import {onMounted, ref} from "vue";
import request from "../../http/request.js";
import { useRouter } from 'vue-router';
let router=useRouter();
let userList=ref()
userList.value=[];

let content=ref();
let dialogVisible=ref(false);
let dialogVisibleSuccess=ref(false);
let indexj=ref();
let updatePassword=(index)=>{
  index=getOppositeIndex(index);
  indexj.value=index;
  console.log('indexj');
  dialogVisible.value=true;
}

let currentPage=ref(1);
let pageSize=ref(10);
let bookListLength=ref(0);
let pageSizes=ref();
pageSizes.value=[10,15,20,30];
let changeCurrentPage=(page)=>{
  currentPage.value=page;
}
let sizesChange=(size)=>{
  pageSize.value=size;
}

let getOppositeIndex=(index)=>{
  index+=pageSize.value*(currentPage.value-1);
  return index;
}


let password=ref();
let submitUpdatePassword=()=>{
  let person=userList.value[indexj.value];
  console.log('learn');
  request.get("/home/user/MchangeTeachPassword",{
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

let userDetail=function (scope,index){
  index+=pageSize.value*(currentPage.value-1);
  let id=userList.value[index].ID;
  router.push({path:'/home/updateUserInformation',
    query:{
      userID:id,
      userIdentity:'teacher'
    }});
};

onMounted(() => {
  request.get("/home/user/teacher",{
  }).then(function(res) {
    if(res.data){
      console.log("res.data");
      res.data.forEach(function (element){
        console.log(element);
        userList.value.push({
          name:element.teacherName,
          ID:element.teacherID,
          grade:element.grade,
          phone:element.phone
        });
      });
      bookListLength.value=userList.value.length;
      console.log('get  success');
    }
  }).catch(function(error) {
    console.log('get  error');
  });


});

</script>

<style scoped>

</style>