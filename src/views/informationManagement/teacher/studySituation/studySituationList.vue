<template>
  <div style="height: 100%;">
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
    <el-dropdown @command="handleSelectRoomCommand">
      <el-button>
        选择班级<el-icon ><arrow-down /></el-icon>
      </el-button>
      <template #dropdown>
        <el-dropdown-menu>
          <div v-for="item in roomList">
            <el-dropdown-item :command="item.room">{{item.room}}班</el-dropdown-item>
          </div>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <el-table :data="fileList" height="70%">
      <el-table-column type="selection"></el-table-column>
      <el-table-column label="课件名"  prop="studyFileName" sortable></el-table-column>
      <el-table-column label="课件学习时间段"  >
        <el-table-column label="开始时间"  prop="dateStart"></el-table-column>
        <el-table-column label="截止时间"  prop="dateEnd"></el-table-column>
      </el-table-column>
      <el-table-column label="下载人数"  prop="downLoadNumber" sortable></el-table-column>
      <el-table-column >
        <template #default="scope">
          <el-popconfirm title="确认要提醒吗"
                         confirm-button-text="确认"
                         confirm-button-type="danger"
                         cancel-button-text="取消"
                         cancel-button-type="primary"
                         @confirm="remindStudent(scope,scope.$index)"
          >
            <template #reference>
              <el-button
                  size="small"
                  type="danger">
                提醒学生学习
              </el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
      <el-table-column >
        <template #default="scope">
          <el-button
              size="small"
              type="success"
          @click="studyDetailed(scope.$index)">
            详情
          </el-button>
        </template>
      </el-table-column>

    </el-table>

  </div>
</template>

<script>
export default {
  name: "studySituationList"
}
</script>
<script setup>
import {onMounted, ref} from "vue";
import request from "../../../../http/request";
import { useRouter,useRoute } from 'vue-router';
import {getDateTime, getTokenID, getTokenIdentity, getTokenN} from "../../../../utils/auth";
let fileList=ref()
fileList.value=[];
let classroomList=ref();
classroomList.value=[];
let roomList=ref();
roomList.value=[];
let term=ref();
let room=ref();
let teacherName=ref('chen');


let remindStudent=(scope,index)=>{

}

let handleSelectTermCommand=(command)=>{
  term.value=command;
  let idcard=getTokenID();
  getTokenN();
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
}


let handleSelectRoomCommand=(command)=>{
  room.value=command;
  let idcard=getTokenID();
  getTokenN();
  request.get("/home/knowledgeList/studySituation", {
        params:{
          idcard:idcard,
          acadmey:'computer',
          term:term.value,
          room:room.value
        }
      })
      .then(function(res) {
        if(res.data){
          fileList.value=[];
          res.data.forEach(function (element){
            console.log(element);
            fileList.value.push({
              studyFileName:element.studyFileName,
              dateStart:element.dateStart,
              dateEnd:element.dateEnd,
              downLoadNumber:element.downLoadNumber,
              teacherID:element.teacherID,
              term:element.term,
              room:element.room,
              teacherName:element.teacherName
            });
          });

          //fileList.value=res.data.publicationKnowledgeData;
          console.log(fileList.value);
          console.log('get fileList success');
        }
      })
      .catch(function(error) {
        console.log("get fileList error");
      });

}

let router=useRouter();
let studyDetailed=(index)=>{
  let teacherName=fileList.value[index].teacherName;
  let acadmey=fileList.value[index].acadmey;
  let term=fileList.value[index].term;
  let room=fileList.value[index].room;
  let studyFileName=fileList.value[index].studyFileName;
  console.log('open child success');
  router.push({path:'/home/studySituationChild',
    query:{
      teacherName:teacherName,
      acadmey:acadmey,
      term:term,
      room:room,
      studyFileName:studyFileName
    }
  });
};

onMounted(() => {
  let idcard=getTokenID();
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