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
let fileList=ref()
let classroomList=ref();
let roomList=ref();
let term=ref();
let room=ref();
let teacherName=ref('chen');


let remindStudent=(scope,index)=>{

}

let handleSelectTermCommand=(command)=>{
  term.value=command;
  request.get("/home/knowledgeList/room",{
    data:{
      folderAuthor:teacherName.value,
      acadmey:'computer',
      term:term.value
    }
  }).then(res=>{
    console.log(res.data);
    roomList.value=res.data.teacherRoomData;

  }).catch(err=>{});
}
let handleSelectRoomCommand=(command)=>{
  room.value=command;
  request
      .get("/home/knowledgeList/studySituation", {
        data:{
          folderAuthor:teacherName.value,
          acadmey:'computer',
          term:term.value,
          room:room.value
        }
      })
      .then(function(res) {
        if(res.data){
          fileList.value=res.data.publicationKnowledgeData;
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
  request.get("/home/knowledgeList/classroom",{
    data:{
      folderAuthor:teacherName.value,
      acadmey:'computer'
    }
  }).then(function(res) {
    if(res.data){
      console.log(res.data.teacherClassroomData);
      classroomList.value=res.data.teacherClassroomData;
      console.log('get classroom success');
    }
  }).catch(function(error) {
    console.log('get classroom error');
  });


});

</script>

<style scoped>

</style>