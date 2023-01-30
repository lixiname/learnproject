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
    <el-table :data="learnList" height="70%">
      <el-table-column type="selection"></el-table-column>
      <el-table-column label="课件名"  prop="studyFileName" sortable></el-table-column>
      <el-table-column label="老师"  prop="teacherName" sortable></el-table-column>
      <el-table-column label="课件学习时间段"  >
        <el-table-column label="开始时间"  prop="dateStart"></el-table-column>
        <el-table-column label="截止时间"  prop="dateEnd"></el-table-column>
      </el-table-column>
      <el-table-column >
        <template #default="scope">
          <el-button
              size="small"
              type="success"
              @click="studyDownload(scope.$index)">
            下载
          </el-button>
        </template>
      </el-table-column>

    </el-table>

  </div>
</template>

<script>
export default {
  name: "stdSituationList"
}
</script>
<script setup>
import {onMounted, ref} from "vue";
import request from "../../../http/request";
import { useRouter,useRoute } from 'vue-router';
import {getDateTime, getTokenID, getTokenIdentity, getTokenN} from "../../../utils/auth";
let fileList=ref()
fileList.value=[];

let roomList=ref();
roomList.value=[];
let term=ref();
let room=ref();
let teacherName=ref('chen');


let learnList=ref();
learnList.value=[];
let router=useRouter();



let content=ref();
let dialogVisible=ref(false);
let studyDownload=(index)=>{
  let idcard=getTokenID();
  let name=getTokenN();
  let identity=getTokenIdentity();
  let datetime = getDateTime();
  let learn=learnList.value[index];
  console.log('learn');


  let teacherName=learn.teacherName;
  let stdName=name;
  let studyFileName=learn.studyFileName;
  let term=learn.term;
  let room=learn.room;
  let teacherID=learn.teacherID;
  let stdIdcard=idcard;
  let times=datetime;
  request.post("/home/knowledgeList/learnOneFile",{
    teacherName:teacherName,
    studentName:stdName,
    studyFileName:studyFileName,
    term:term,
    room:room,
    teacherID:teacherID,
    studentID:stdIdcard,
    times:times
  }).then(res=>{
    if(res.data=="first"){
      dialogVisible.value=true;
      content.value="下载成功";
      console.log(" this  success ");
      console.log(dialogVisible.value);
    }
    else if(res.data=="second"){
      dialogVisible.value=true;
      content.value="曾经已经下载过了";
      console.log(" exist this");
      console.log(dialogVisible.value);
    }
  }).catch(error=>{
    console.log("downLoad book content error");
  });
}

onMounted(() => {
  let idcard=getTokenID();
  let identity=getTokenIdentity();
  request.get("/home/knowledgeList/stdLearnList",{
    params:{
      idcard:idcard,
      identity:identity
    }
  }).then(function(res) {
    if(res.data){
      console.log("res.data");
      console.log(res.data);
      res.data.forEach(function (element){
        console.log(element);
        learnList.value.push({
          teacherName:element.teacherName,
          studyFileName:element.studyFileName,
          dateStart:element.dateStart,
          dateEnd:element.dateEnd,
          term:element.term,
          room:element.room,
          teacherID:element.teacherID
        });
      });
      //classroomList.value=res.data.teacherClassroomData;
      console.log('get classroom success');
    }
  }).catch(function(error) {
    console.log('get classroom error');
  });


});

</script>

<style scoped>

</style>

