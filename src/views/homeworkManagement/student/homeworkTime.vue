<template>
  <div>
    <el-row justify="center" align="middle">
      <el-col :span="12">
        <el-timeline>
          <el-timeline-item
              v-for="(object,index) in lists"
              :timestamp="object.end"  placement="top"
              :key="index"
          >
            <el-card shadow="hover">
              <el-row justify="space-between" align="middle">
                <el-col :span="21">
                  <h4>{{object.fileName}}</h4>
                  <el-descriptions>
                    <el-descriptions-item label="截止时间">
                      {{object.end}}
                    </el-descriptions-item>
                  </el-descriptions>
                </el-col>
                <el-col :span="3">
                  <el-button size="small" :plain="true" type="info">详情</el-button>
                </el-col>
              </el-row>
              <el-row justify="center">
                <el-col :span="20">
                  <el-button size="small" :plain="true" type="primary" style="width: 100%"
                             @click="dohomework(index)">去完成</el-button>
                </el-col>
              </el-row>

            </el-card>
          </el-timeline-item>

        </el-timeline>
      </el-col>
    </el-row>

  </div>

</template>

<script>
export default {
  name: "homeworkTime",
  data(){
    return{
      homeworkTimeArray:[
        {
          content:'数学',
          time:'2022-10-14'
        },
        {
          content:'英语',
          time:'2022-10-13'
        },
        {
          content:'java',
          time:'2022-10-11'
        }
      ]
    }
  }
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