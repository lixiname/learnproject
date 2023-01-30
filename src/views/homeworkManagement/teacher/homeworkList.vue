<template>
  <el-dialog
      v-model="dialogVisible"
      width="30%"
      style="height: 40%"
  >
    <el-card>
      <template #header>
        发布
      </template>
      <el-dropdown @command="handleSelectTermCommand">
        <el-button>
          选择年级<el-icon ><arrow-down /></el-icon>
        </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <div v-for="item in classroomList">
              <el-dropdown-item :command="item.term">{{item.term}}级</el-dropdown-item>
            </div>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <el-checkbox-group v-model="roomListCheck">
          <span v-for="item in roomList">
            <el-checkbox :label="item.room" border >
              {{item.room}}班
            </el-checkbox>
          </span>
      </el-checkbox-group>
      <span >选择时间段</span>
      <el-date-picker
          v-model="timeRange"
          type="datetimerange"
          range-separator="到"
          start-placeholder="开始时间"
          end-placeholder="截止时间"
      />
      <el-button style="width: 100%" @click="submitSelectClassroomAndPublication">确认发布</el-button>
    </el-card>
  </el-dialog>
  <el-table :data="lists" border="true"  size="small" style="height: 95%;">
    <el-table-column label="试卷名" sortable>
      <template #default="scope">
        <el-icon color="rgb(244,192,70)"><Notebook /></el-icon>
        <span>{{scope.row.fileName}}</span>
      </template>
    </el-table-column>
    <el-table-column label="问题序号" prop="quest" sortable>
    </el-table-column>
    <el-table-column label="正确答案" prop="flage" sortable>
    </el-table-column>
    <el-table-column>
      <template #default="scope" >
        <el-button
                   size="small"
                   plain
                   @click="submitPublication(scope.$index)"
        >发布试题</el-button
        >
      </template>
    </el-table-column >
  </el-table>
</template>

<script>
export default {
  name: "homeworkList"
}
</script>
<script setup>
import {ref, reactive, onMounted} from "vue";
import { useRouter,useRoute } from 'vue-router';
import {getDateTime, getTokenID, getTokenIdentity, getTokenN} from "../../../utils/auth";
import request from "../../../http/request";
let lists=ref();
lists.value=[];

let roomList=ref();
roomList.value=[];
let roomListCheck=ref();
roomListCheck.value=[];
let classroomList=ref();
classroomList.value=[];


let upLoadList=ref();
let upLoadCollationList=ref();
upLoadCollationList.value=[];
let dialogVisible=ref(false);
let publicationItemIndex=0;
let visible=ref(false);
let fileName=ref();
let submitPublication=(index)=>{
  fileName.value=lists.value[index].fileName;
  dialogVisible.value=true;
  visible.value=false;
  publicationItemIndex=index;

}

let term=ref();
let studyFileName=ref();
let submitSelectClassroomAndPublication=()=>{
  let idcard=getTokenID();
  let Name=getTokenN();
  roomListCheck.value.forEach(function (element){
    //mock home/knowledgeList/publicateToClassroom
    request.post("/home/homework/pubhomework",{
      tid:idcard,
      fileName:fileName.value,
      term:term.value,
      room:element,
      tname:Name,
      start:'2022-11-13 10:10:12',
      end:'2022-11-17 10:10:12',
    }).then(res=>{
      console.log('success');
    }).catch(err=>{});
  });
  dialogVisible.value=false;

}

let handleSelectTermCommand=(command)=>{
  term.value=command;
  let idcard=getTokenID();
  getTokenN();
  //mock /home/knowledgeList/room
  request.get("/home/knowledgeList/oneTermRooms",{
    params:{
      idcard:idcard,
      acadmey:'computer',
      term:term.value
    }
  }).then(res=>{
    if(res.data){
      roomList.value=[];
      res.data.forEach(function (element){
        console.log(element);
        roomList.value.push({
          room:element.room,
        });
      });
      //roomList.value=res.data.teacherRoomData;
      console.log(roomList.value);
    }
  }).catch(err=>{});

  let fileName=lists.value[publicationItemIndex].fileName;


}

onMounted(() => {
  let idcard=getTokenID();
  console.log(idcard);
  request.get("/home/homework/homeworkList",{
    params:{
      tid:idcard
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

  request.get("/home/knowledgeList/classroom",{
    params:{
      idcard:idcard,
      acadmey:'计算机'
    }
  }).then(function(res) {
    if(res.data){
      res.data.sort(function (a, b) {
        return a.term-b.term;
      });
      //[0]
      classroomList.value.push({
        teacherID:res.data[0].teacherID,
        teacherName:res.data[0].teacherName,
        acadmey:res.data[0].acadmey,
        major:res.data[0].major,
        term:res.data[0].term,
        room:res.data[0].room
      });
      //[1..n]
      for (let i = 0; i < res.data.length-1; i++) {
        if (res.data[i].term !== res.data[i+1].term) {
          classroomList.value.push({
            teacherID:res.data[i+1].teacherID,
            teacherName:res.data[i+1].teacherName,
            acadmey:res.data[i+1].acadmey,
            major:res.data[i+1].major,
            term:res.data[i+1].term,
            room:res.data[i+1].room
          });
        }
      }
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