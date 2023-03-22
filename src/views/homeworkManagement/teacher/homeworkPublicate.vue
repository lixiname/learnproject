<template>
  <el-table :data="pubHomeworkArray" border="true"  size="small" style="height: 95%;">
    <el-table-column label="试卷" sortable>
      <template #default="scope">
        <el-icon color="rgb(244,192,70)"><Notebook /></el-icon>
        <span>{{scope.row.test_name}}</span>
      </template>
    </el-table-column>
    <el-table-column label="发布时间" prop="publish_time" sortable>
    </el-table-column>
    <el-table-column label="年级" prop="term" sortable>
    </el-table-column>
    <el-table-column label="班级" prop="room" sortable>
    </el-table-column>
    <el-table-column label="开始时间" prop="start_time" sortable>
    </el-table-column>
    <el-table-column label="截止时间" prop="end_time" sortable>
    </el-table-column>
    <el-table-column>
      <template #default="scope" >
        <el-button
            size="small"
            type="success"
            @click="scoreDetail(scope.$index)"
        >详情</el-button
        >
      </template>
    </el-table-column >
  </el-table>
</template>

<script>
export default {
  name: "homeworkPublicate"
}
</script>
<script setup>
import {onMounted, ref} from "vue";
import request from "../../../http/request";
import {useRoute,useRouter} from "vue-router/dist/vue-router";
import {getTokenID} from "../../../utils/auth";

let router=useRouter();
let pubHomeworkArray=ref();
pubHomeworkArray.value=[];

let scoreDetail=(index)=>{
  let test_id=pubHomeworkArray.value[index].test_id;
  router.push({path:'/home/stdHomeworkScore',
    query:{
      test_id:test_id
    }});
}

onMounted(() => {
  let idcard=getTokenID();
  console.log("t_id"+idcard);
  request.get("/home/homework/pubHomeworkList",{
    params:{
      idcard:idcard
    }
  }).then(function(res) {
    if(res.data){
      console.log(res.data);
      res.data.forEach(function (element){
        console.log("element");
        console.log(element);
        pubHomeworkArray.value.push({
          test_name:element.test_name,
          test_id:element.testId,
          publish_time:element.publish_time,
          start_time:element.start_time,
          end_time:element.end_time,
          room:element.room,
          term:element.term
        });
      });
      console.log('get  success ');
    }
  }).catch(function(error) {
    console.log('get  error');
  });


});
</script>
<style scoped>

</style>