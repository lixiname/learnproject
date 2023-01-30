<template>
  <el-table :data="lists" border="true"  size="small" style="height: 95%;">
    <el-table-column label="试卷名" sortable>
      <template #default="scope">
        <el-icon color="rgb(244,192,70)"><Notebook /></el-icon>
        <span>{{scope.row.fileName}}</span>
      </template>
    </el-table-column>
    <el-table-column label="班级" prop="room" sortable>
    </el-table-column>
    <el-table-column label="老师" prop="tname" sortable>
    </el-table-column>
    <el-table-column label="课件学习时间段"  >
      <el-table-column label="开始时间"  prop="start"></el-table-column>
      <el-table-column label="截止时间"  prop="end"></el-table-column>
    </el-table-column>
    <el-table-column>
      <template #default="scope" >
        <el-button
            size="small"
            plain
            @click="dohomework(scope.$index)"
        >做题</el-button
        >
      </template>
    </el-table-column >
  </el-table>
</template>

<script>
export default {
  name: "homeworkAll"
}
</script>
<script setup>
import {ref, reactive, onMounted} from "vue";
import { useRouter,useRoute } from 'vue-router';
import {getDateTime, getTokenID, getTokenIdentity, getTokenN} from "../../../utils/auth";
import request from "../../../http/request";
let router=useRouter();
let lists=ref();
lists.value=[];

let roomList=ref();
roomList.value=[];
let roomListCheck=ref();
roomListCheck.value=[];
let classroomList=ref();
classroomList.value=[];




let dialogVisible=ref(false);
let publicationItemIndex=0;
let visible=ref(false);
let fileName=ref();


let dohomework=(index)=>{
  let fileName=lists.value[index].fileName;
  let tid=lists.value[index].tid;
  let term=lists.value[index].term;
  let room=lists.value[index].room;
  router.push({path:'/home/doHomework',
    query:{
      fileName:fileName,
      tid:tid,
      term:term,
      room:room
    }});
}


onMounted(() => {
  let idcard=getTokenID();
  console.log(idcard);
  let grade,classroom;
  request.get("/home/user/oneStd",{
    params:{
      id:idcard
    }
  }).then(function(res) {
    if(res.data){
      console.log(res.data);
      grade=res.data.grade;
      classroom=res.data.classroom;
      console.log(grade);
      console.log(classroom);
      request.get("/home/homework/homeworkpubList",{
        params:{
          term:grade,
          room:classroom
        }
      }).then(function(res) {
        if(res.data){
          console.log(res.data);
          res.data.forEach(function (element){
            console.log(element);
            lists.value=res.data;
          });
          console.log(' success ');
        }
      }).catch(function(error) {
        console.log('error');
      });
    }
  }).catch(function(error) {
    console.log('error');
  });





});

</script>
<style scoped>

</style>