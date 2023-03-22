<template>
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
                正确选项{{item.correct_answer}}
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
          </div>
        </div>
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
let test_id=route.query.test_id;



let testName=ref('圆锥曲线');
let time_limit=ref(45);
let description=ref('认真完成试卷');
let subject=ref("高数");
let count=ref(1);
let tname=ref('');
let addQuestList=ref();
addQuestList.value=[];
onMounted(() => {
  let idcard=getTokenID();
  console.log(idcard);
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
    }
  }).catch(function(error) {
    console.log('error');
  });



});
</script>

<style scoped>

</style>