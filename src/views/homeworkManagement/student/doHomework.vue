<template>
  <el-dialog
      title="提示"
      v-model="dialogVisible"
      width="30%">
    <span>成功提交试卷</span>
    <span slot="footer" >
        <el-button type="primary" @click="toLast">确 定</el-button>
      </span>
  </el-dialog>
  <el-row justify="center">
    <el-col :span="15">
      <el-card>
        <template #header>
          <div>
            <span>试卷</span>
          </div>
        </template>
        <div>
          <el-descriptions :border="true" :column="1">
            <el-descriptions-item >
              <template #label>
                <div>
                  <el-icon><Folder /></el-icon>
                  试卷名
                </div>
              </template>
              {{testName}}
            </el-descriptions-item>
            <el-descriptions-item >
              <template #label>
                <div>
                  <el-icon><Folder /></el-icon>
                  整张卷做题时间{{time_limit}}分钟
                </div>
              </template>
            </el-descriptions-item>
            <el-descriptions-item >
              <template #label>
                <div>
                  题量
                </div>
              </template>
              {{count}}道
            </el-descriptions-item>
            <el-descriptions-item >
              <template #label>
                <div>
                  试卷描述
                </div>
              </template>
              {{description}}
            </el-descriptions-item>
          </el-descriptions>
          <div v-for="(item,index) in addQuestList" style="border-style: solid;border-color: purple">
            <el-row justify="space-around">
              <el-col :span="8">
                <span>题号{{item.quest_number}}</span>
              </el-col>

              <el-col :span="8">
                该题目时间限制{{item.time_limit}}秒
              </el-col>
            </el-row>
            <el-row justify="space-between">
              <el-col :span="16">
                问题描述:{{item.question_text}}
              </el-col>
            </el-row>

            <div v-for="(item,optionIndex) in item.addOptionLists" style="border-style: solid;border-color: cornflowerblue">
              <el-row justify="space-between" style="border-color: cornflowerblue">
                <el-col :span="5">
                  <el-row>
                    <el-col :span2="24">
                      选项{{item.option_number}}
                    </el-col>
                    <el-col :span2="24">
                    </el-col>
                  </el-row>
                </el-col>
                <el-col :span="16">
                  {{item.option_text}}
                </el-col>
              </el-row>
            </div>

            <el-col :span="8">
              请选择
              <el-input v-model="answerList[index]" >
                <template #prefix>
                  <el-icon><Memo /></el-icon>
                </template>
              </el-input>
            </el-col>
          </div>
        </div>
        <el-row justify="center">
          <el-col :span="5" v-if="opens==false">
            <el-button
                @click="upLoadTest" :disabled="opens">提交试卷</el-button>
          </el-col>
          <el-col :span="5">
            <el-button v-if="opens==true"
                :disabled="opens">已提交试卷</el-button>
          </el-col>
        </el-row>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "addHomework"
}
</script>

<script setup>
import {ref, reactive, onMounted} from "vue";
import { useRouter,useRoute } from 'vue-router';
import {getDateTime, getTokenID, getTokenIdentity, getTokenN} from "../../../utils/auth";
import request from "../../../http/request";
let dialogVisible=ref(false);

let route=useRoute();
let router=useRoute();
let test_id=route.query.test_id;



let testName=ref('圆锥曲线');
let time_limit=ref(45);
let description=ref('认真完成试卷');
let subject=ref("高数");
let count=ref(1);
let tname=ref('');
let addQuestList=ref();
addQuestList.value=[];

let stdQuestList=ref();
stdQuestList.value=[];
let std_idcard=getTokenID();
let name=getTokenN();
let startTime='';
let upLoadTest=()=>{
  let endTime=getDateTime();
  let correct_count=0;
  stdQuestList.value=[];
  console.log(answerList.value[0]);
  for(let i=0;i<addQuestList.value.length;i++){
    let answer=answerList.value[i];
    let quest_id=addQuestList.value[i].questId;
    let flage=0;
    if(addQuestList.value[i].correct_answer==answerList.value[i]){
      flage=1;correct_count++;
    }
    stdQuestList.value.push({
      std_idcard:std_idcard,
      quest_id:quest_id,
      answer:answer,
      correct_or_not:flage,
    });
  }
  let std_test={
        stdIdcard:std_idcard,
        testId:test_id,
        start_time:startTime,
        end_time:endTime,
        correct_count:correct_count
  };
  console.log(std_test);
  console.log(stdQuestList.value);
  request.post("/home/homework/doTest",{
    std_test:std_test,
    std_quest:stdQuestList.value
  }).then(function(res) {
    if(res.data){
      dialogVisible.value=true;
      console.log(' success');
    }
  }).catch(function(error) {
    console.log('error');
  });

}
let opens=ref(false);
let toLast=()=>{
  dialogVisible = false;
  opens.value=true;
  // router.push({path:'/home/shomeworkAll',
  //   query:{
  //   }});
};




let answerList=ref();
answerList.value=[];
onMounted(() => {
  startTime=getDateTime();
  let idcard=getTokenID();
  request.get("/home/homework/homeworkNoPublicateOne",{
    params:{
      test_id:test_id
    }
  }).then(function(res) {
    if(res.data){
      console.log(res.data);
      testName.value=res.data.test_content.testName;
      description.value=res.data.test_content.description;
      time_limit.value=res.data.test_content.time_limit;
      subject.value=res.data.test_content.subject;
      tname.value=res.data.test_content.tname;
      count.value=res.data.test_content.count;
      addQuestList.value=res.data.quest_list;
      console.log(' success ');
      console.log(addQuestList.value);
      for(let i=0;i<addQuestList.value.length;i++){
        answerList.value.push("");
      }

    }
  }).catch(function(error) {
    console.log('error');
  });

});
</script>

<style scoped>

</style>