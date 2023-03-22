<template>
  <el-table :data="stdScoreArray" border="true"  size="small" style="height: 95%;">
    <el-table-column label="试卷" sortable>
      <template #default="scope">
        <el-icon color="rgb(244,192,70)"><Notebook /></el-icon>
        <span>{{scope.row.test_name}}</span>
      </template>
    </el-table-column>
    <el-table-column label="学号" prop="std_idcard" sortable>
    </el-table-column>
    <el-table-column label="姓名" prop="student_name" sortable>
    </el-table-column>
    <el-table-column label="开始做题时间" prop="start_time" sortable>
    </el-table-column>
    <el-table-column label="总耗时量"  sortable>
      <template #default="scope">
        <span>{{scope.row.complete_time/60}}分钟</span>
      </template>
    </el-table-column>
    <el-table-column label="正确率"  sortable>
      <template #default="scope">
        <span>{{scope.row.accuracy*100}}%</span>
      </template>
    </el-table-column>
    <el-table-column label="警告"  sortable>
      <template #default="scope">
        <span v-if="scope.row.normal==true" >正常</span>
        <span v-else-if="scope.row.normal==false" style="color: red">答题时间过短</span>
      </template>
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
  name: "stdHomeworkScore"
}
</script>
<script setup>
import {onMounted, ref} from "vue";
import request from "../../../http/request";
import {useRoute,useRouter} from "vue-router/dist/vue-router";
let route=useRoute();
let router=useRouter();
let test_id=route.query.test_id;
let stdScoreArray=ref();
stdScoreArray.value=[];

let scoreDetail=(index)=>{
  let std_idcard=stdScoreArray.value[index].std_idcard;
  router.push({path:'/home/oneTestScoreView',
    query:{
      std_idcard:std_idcard,
      test_id:test_id,
    }});
}

onMounted(() => {
  console.log(test_id);
  request.get("/home/homework/scoreList",{
    params:{
      test_id:test_id
    }
  }).then(function(res) {
    if(res.data){
      console.log(res.data);
      res.data.forEach(function (element){
        console.log(element);
        let percent=element.complete_time/element.time_limit;
        let normalFlage=true;
        if(percent>0.5){
          normalFlage=true;
        }
        else
          normalFlage=false;
        stdScoreArray.value.push({
          test_name:element.test_name,
          std_idcard:element.stdIdCard,
          start_time:element.start_time,
          student_name:element.student_name,
          complete_time:element.complete_time,
          accuracy:element.accuracy,
          normal:normalFlage
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