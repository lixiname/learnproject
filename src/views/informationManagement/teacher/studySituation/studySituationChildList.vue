<template>
  <div style="height: 100%;">
    <el-table :data="roomStudentsFileStudySituationList" height="70%">
      <el-table-column type="selection"></el-table-column>
      <el-table-column label="姓名" prop="studentName"></el-table-column>
      <el-table-column label="学号" prop="studentID"></el-table-column>
      <el-table-column label="资料名">
        <template #default="scope">
          <el-icon color="rgb(244,192,70)"><Folder /></el-icon>
          <span>{{scope.row.studyFileName}}</span>
        </template>
      </el-table-column>
      <el-table-column label="学习进度">
        <template #default="scope" >
          <el-progress :percentage="100"  v-if="scope.row.completed=='good'"/>
          <el-progress :percentage="0" v-if="scope.row.completed=='bad'"/>
        </template>
      </el-table-column>
      <el-table-column prop="completed"></el-table-column>
    </el-table>

  </div>

</template>

<script>
export default {
  name: "studySituationChildList"
}
</script>
<script setup>
import {ref, reactive, onMounted} from "vue";
import { useRoute } from 'vue-router';
import request from "../../../../http/request.js";
let route=useRoute();
let teacherName=route.query.teacherName;
let acadmey=route.query.acadmey;
let term=route.query.term;
let room=route.query.room;
let studyFileName=route.query.studyFileName;

let roomStudentsFileStudySituationList=ref();

onMounted(() => {
  console.log(route.query);
  request.get("/home/knowledgeList/fileStudySituationList",{
    data:{
      teacherName:teacherName,
      acadmey:acadmey,
      term:term,
      room:room,
      studyFileName:studyFileName
    }
  }).then(function(res) {
    if(res.data){
      console.log(res.data);
      roomStudentsFileStudySituationList.value=res.data.fileStudySituationList;
      console.log('get classroom success');
    }
  }).catch(function(error) {
    console.log('get classroom error');
  });


});



</script>
<style scoped>

</style>