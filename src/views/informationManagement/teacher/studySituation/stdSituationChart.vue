<template>
  <el-row justify="center">
    <el-col :span="20" style="background-color: greenyellow">
      <el-card  class="card"  shadow="always">
        <div id="main" ></div>
      </el-card>
      <el-card shadow="always">
        <div>
          <el-descriptions :border="true" :column="1">
            <el-descriptions-item >
              <template #label>
                <el-icon><Notebook /></el-icon>
                课件名
              </template>
              {{studyFileName}}
            </el-descriptions-item>
          </el-descriptions>
          <el-descriptions :border="true" :column="1">
            <el-descriptions-item >
              <template #label>
                <el-icon><Notebook /></el-icon>
                开始时间
              </template>
              {{dateStart}}
            </el-descriptions-item>
          </el-descriptions>
          <el-descriptions :border="true" :column="1">
            <el-descriptions-item >
              <template #label>
                <el-icon><Notebook /></el-icon>
                截止时间
              </template>
              {{dateEnd}}
            </el-descriptions-item>
          </el-descriptions>
        </div>
      </el-card>
    </el-col>
  </el-row>
  <el-button @click="changeEchart">刷新图表</el-button>


</template>

<script>
export default {
  name: "stdSituationChart"
}
</script>
<script setup>
import {ref, reactive, onMounted} from "vue";
import { useRoute } from 'vue-router';
import request from "../../../../http/request.js";
import {getTokenID,getDay} from "../../../../utils/auth";
import * as Echarts from "echarts";
// import * as echarts from 'echarts/core';
// import { GridComponent } from 'echarts/components';
// import { LineChart } from 'echarts/charts';
// import { UniversalTransition } from 'echarts/features';
// import { CanvasRenderer } from 'echarts/renderers';
//
// echarts.use([GridComponent, LineChart, CanvasRenderer, UniversalTransition]);
let route=useRoute();
let teacherName=route.query.teacherName;
let acadmey=route.query.acadmey;
let term=route.query.term;
let room=route.query.room;
let studyFileName=route.query.studyFileName;
let dateStart=route.query.dateStart;
let dateEnd=route.query.dateEnd;




let myChart;
let titleStr=term+'级'+room+'班学生不同时间段下载资料数量';
let option=ref({
  title:{
    text:titleStr
  },
  tooltip:{
    show:true
  },
  legend: {
    orient: 'vertical',
    left: 'right'
  },

  grid:[{ top:'55%' }],
  dataset:{
    dimensions: ['dayName','dayTime'],
  },
  xAxis: [
    {
      name: '日',
      type: 'category',
      gridIndex:0,
      axisLabel: {
        formatter:'{value}日',
        align: 'center'
      },
    },
  ],
  yAxis: [
    {
      name: '单日下载次数',
      type:'value',
      gridIndex:0,
      axisLabel: {
        formatter: '{value} 次',
        align: 'center'
      },
    },
  ],
  series: [
    {
      type: 'line' ,
      seriesLayoutBy:'row',
      encode: {
        x: 'dayName',
        y: 'dayTime',
        tooltip:'dayTime',
      },
      xAxisIndex:0,
      yAxisIndex:0
    },
    {
      name:'不同时间段中学生下载资料数量占比',
      type: 'pie' ,
      seriesLayoutBy:'row',
      radius: '30%',
      center: ['50%', '25%'],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      },
      encode: {
        itemName: 'dayName',
        value: 'dayTime',
        tooltip: 'dayTime'
      }
    },
    // {
    //   type: 'pie',
    //
    // }
  ]
});
let setNewEchartDataTemplate=()=>{
  let startDay=getDay(dateStart);
  let endDay=getDay(dateEnd);
  let echartAxisX=[];
  let echartAxisY=[];
  for(let i=startDay;i<=endDay;i++){
    echartAxisX.push(Number(i).toString());
    echartAxisY.push(0);
  }
  console.log(echartAxisX);
  console.log(roomStudentsFileStudySituationList.value);
  roomStudentsFileStudySituationList.value.forEach(function (element){
    let day=getDay(element.times);
    if(echartAxisX.indexOf(day)){
      let dayIndex=echartAxisX.indexOf(day);
      echartAxisY[dayIndex]+=1;
    }
  });
  let source=[
    echartAxisX,
    echartAxisY,
  ];
  return  source;
}
let changeEchart=()=>{
  option.value.dataset.source=setNewEchartDataTemplate();
  console.log(option.value);
  echartInit();
  console.log('updateEchart');
}

let echartInit=()=>{
  //card应该自适应echart的高
  option.value.dataset.source;
  let height='600px';
  document.documentElement.style.setProperty('--var-primary-height',height);
  let chartDom = document.getElementById('main');
  myChart = Echarts.init(chartDom,null,{
    width:'1000px',
    height:height
  });
  myChart.setOption(option.value);

}

window.addEventListener('resize',function (){
  //myChart.resize();
  //console.log("xxxx");

});

let roomStudentsFileStudySituationList=ref();
roomStudentsFileStudySituationList.value=[];
onMounted(() => {
  console.log(route.query);
  let idcard=getTokenID();
  request.get("/home/knowledgeList/fileStudySituationList",{
    params:{
      idcard:idcard,
      term:term,
      room:room,
      studyFileName:studyFileName
    }
  }).then(function(res) {
    if(res.data){
      console.log(res.data);
      res.data.forEach(function (element){
        console.log(element);
        roomStudentsFileStudySituationList.value.push({
          studentName:element.studentName,
          studentID:element.studentID,
          studyFileName:element.studyFileName,
          times:element.dateTime
        });
      });
      option.value.dataset.source=setNewEchartDataTemplate();
      echartInit();
      console.log('get classroom success');
    }
  }).catch(function(error) {
    console.log('get classroom error');
  });



});

</script>
<style scoped>

:root {
  --var-primary-height: 900px;
}
.card{
  height: var(--var-primary-height);
}
</style>