<template>
  <el-table :data="lists" border="true"  size="small" style="height: 95%;">
    <el-table-column label="试卷名" sortable>
      <template #default="scope">
        <el-icon color="rgb(244,192,70)"><Notebook /></el-icon>
        <span>{{scope.row.testName}}</span>
      </template>
    </el-table-column>
    <el-table-column label="班级" prop="room" sortable>
    </el-table-column>
    <el-table-column label="老师" prop="t_name" sortable>
    </el-table-column>
    <el-table-column label="答题总时间限制" prop="time_limit" sortable>
    </el-table-column>
    <el-table-column label="试卷答题时间段"  >
      <el-table-column label="开始时间"  prop="start_time"></el-table-column>
      <el-table-column label="截止时间"  prop="end_time"></el-table-column>
    </el-table-column>


    <el-table-column>
      <template #default="scope" >
        <el-button v-if="scope.row.exists==false"
            size="small" type="success"
            plain
            @click="dohomework(scope.$index)"
        >做题</el-button>
        <el-button v-else-if="scope.row.exists==true"
            size="small"
            plain
            @click="detail(scope.$index)"
        >详情</el-button>
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
  let test_id=lists.value[index].test_id;
  router.push({path:'/home/doHomework',
    query:{
      test_id:test_id
    }});
}

let detail=function (index){
  let std_idcard=getTokenID();
  let test_id=lists.value[index].test_id;
  router.push({path:'/home/oneTestScoreView',
    query:{
      test_id:test_id,
      std_idcard:std_idcard
    }});
};

let existList=ref();
existList.value=[];

onMounted(() => {
  let idcard=getTokenID();
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
      request.get("/home/homework/oneStdHomeworkpubList",{
        params:{
          term:grade,
          room:classroom
        }
      }).then(function(res) {
        if(res.data){
          console.log(res.data);
          res.data.forEach(function (element){
            console.log(element);
            existList.value.push("false");
          });
          lists.value=res.data;
          console.log(existList.value.length);
          lists.value.forEach(function (element){
            request.get("/home/homework/oneStdScoreExist",{
              params:{
                test_id:element.test_id,
                std_idcard:idcard
              }
            }).then(function (res){
              console.log("element  "+res.data);
              let result=res.data;
              if(result==true)
                element.exists=true;
              else if(result==false)
                element.exists=false;
              console.log(existList.value);
            });
          });
          for(let i=0;i<lists.value.length;i++){
            let element=lists.value[i];
            request.get("/home/homework/oneStdScoreExist",{
              params:{
                test_id:element.test_id,
                std_idcard:idcard
              }
            }).then(function (res){
              console.log("element  "+res.data);
              let result=res.data;
              console.log(result);
              //existList.value[i]=true;
              if(result==true)
                existList.value[i]=true;
              else if(result==false)
                existList.value[i]=false;
              console.log(existList.value);
            });
          }

        }
        else{
          console.log(' no data ');
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