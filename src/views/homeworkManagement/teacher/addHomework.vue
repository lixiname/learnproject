<template>
  <el-dialog
      title="提示"
      v-model="dialogVisible"
      width="30%">
    <span>成功上传试卷</span>
    <span slot="footer" >
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
  </el-dialog>
  <el-row justify="center">
    <el-col :span="15">
      <el-card>
        <template #header>
          <div>
            <span>出题</span>
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
              <el-input v-model="fileName" >
                <template #prefix>
                  <el-icon><Memo /></el-icon>
                </template>
              </el-input>
            </el-descriptions-item>
            <el-descriptions-item >
              <template #label>
                <div>
                  <el-icon><Folder /></el-icon>
                  整张卷做题时间{{time_limit}}分钟
                </div>
              </template>
              <el-input v-model="time_limit" >
                <template #prefix>
                  <el-icon><Memo /></el-icon>
                </template>
              </el-input>
            </el-descriptions-item>
            <el-descriptions-item >
              <template #label>
                <div>
                  试卷描述
                </div>
              </template>
              <el-input v-model="description" >
                <template #prefix>
                  <el-icon><Memo /></el-icon>
                </template>
              </el-input>
            </el-descriptions-item>
          </el-descriptions>
          <el-button @click="addOneQuestion">
            增加一道题
          </el-button>
          <div v-for="(item,index) in addQuestList" style="border-style: solid;border-color: purple">
            <el-row justify="end">
              <el-col :span="3">
                <el-button size="small"
                           type="danger" @click="deleteOneQuest(index)">删除该道题</el-button>
              </el-col>
            </el-row>
            <el-row justify="space-around">
              <el-col :span="8">
                <span>题号{{item.quest_number}}</span>
                <el-input v-model="item.quest_number" >
                  <template #prefix>
                    <el-icon><Memo /></el-icon>
                  </template>
                </el-input>
              </el-col>
              <el-col :span="8">
                正确选项{{item.correct_answer}}
                <el-input v-model="item.correct_answer" >
                  <template #prefix>
                    <el-icon><Memo /></el-icon>
                  </template>
                </el-input>
              </el-col>
              <el-col :span="8">
                该题目时间限制{{item.time_limit}}秒
                <el-input v-model="item.time_limit" >
                  <template #prefix>
                    <el-icon><Memo /></el-icon>
                  </template>
                </el-input>
              </el-col>
            </el-row>
            <el-row justify="space-between">
              <el-col :span="16">
                问题描述
                <el-input v-model="item.question_text" >
                  <template #prefix>
                    <el-icon><Memo /></el-icon>
                  </template>
                </el-input>
              </el-col>
            </el-row>
            <div v-for="(item,optionIndex) in item.addOptionLists" style="border-style: solid;border-color: cornflowerblue">
              <el-row justify="space-between" style="border-color: cornflowerblue">
                <el-col :span="5">
                  <el-row>
                    <el-col :span2="24">
                      选项编号{{item.option_number}}
                      <el-input v-model="item.option_number" >
                        <template #prefix>
                          <el-icon><Memo /></el-icon>
                        </template>
                      </el-input>
                    </el-col>
                    <el-col :span2="24">
                    </el-col>
                  </el-row>
                </el-col>
                <el-col :span="16">
                  选项内容
                  <el-input v-model="item.option_text" >
                    <template #prefix>
                      <el-icon><Memo /></el-icon>
                    </template>
                  </el-input>
                </el-col>
                <el-col :span="3">
                  <el-button
                      plain size="small" type="danger" @click="deleteOneOption(index,optionIndex)">删除该选项</el-button>
                </el-col>

              </el-row>
            </div>
            <el-button @click="addOneOption(index)">增加一个选项</el-button>
          </div>
        </div>
        <el-row justify="center">
          <el-col :span="5">
            <el-button
                @click="upLoadTest">确认</el-button>
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




let quest=ref('1');
let content=ref('圆锥曲线');
let checkOne=ref('测试用');
let checkTwo=ref('测试用');
let checkThree=ref('测试用');
let checkFour=ref('测试用');
let flage=ref('C');


let fileName=ref('高等数学1');
let time_limit=ref(45);
let description=ref('认真完成试卷');
let subject=ref("高数");
let count=ref(1);
let addQuestList=ref();
addQuestList.value=[{
  quest_number:"1",
  question_text:"第1道题目",
  major_type:"计算机",
  time_limit:30,
  correct_answer:"A",
  addOptionLists:[
    {
      option_text:"预填充选项内容",
      option_number:"A"
    }
  ]
}];
let addOptionList=ref();
addOptionList.value=[{
  option_text:"预填充选项内容",
  option_number:"A"

}];

let addOneQuestion=()=>{
  count.value+=1;
  let nextNumber=addQuestList.value.length+1;
  console.log(nextNumber);
  let question_text="第"+nextNumber+"道题目";
  addQuestList.value.push(
      {
        quest_number:nextNumber,
        question_text:question_text,
        major_type:"计算机",
        time_limit:30,
        correct_answer:"A",
        addOptionLists:[
          {
            option_text:"预填充选项内容",
            option_number:"A"
          }
        ]
      }
  );
}

let deleteOneQuest=(index)=>{
  count.value-=1;
  console.log('father'+index);
  addQuestList.value.splice(index,1);
}

let addOneOption=(index)=>{
  let nextOption=addQuestList.value[index].addOptionLists.length;
  let letterNumber=65;
  letterNumber+=nextOption;
  let letter=String.fromCharCode(letterNumber);
  addQuestList.value[index].addOptionLists.push(
      {
        option_text:"预填充选项内容",
        option_number:letter
      }
  );
  console.log(addQuestList.value);
}
let deleteOneOption=(index,optionIndex)=>{
  console.log('father'+index);
  console.log('child'+optionIndex);
  addQuestList.value[index].addOptionLists.splice(optionIndex,1);
}


let upLoadTest=()=>{
  let t_idcard=getTokenID();
  let t_name=getTokenN();
  let upload_time = getDateTime();
  console.log('post:data')
  console.log(addQuestList);

  let test_content={
    testName:fileName.value,
    tid:t_idcard,
    description:description.value,
    time_limit:time_limit.value,
    subject:subject.value,
    upload_time:upload_time,
    tname:t_name,
    count:count.value
  };
  request.post("/home/homework/addhomeworkTest",{
    test_content:test_content,
    quest_list:addQuestList.value
  }).then(function (res){
    if(res.data=="success"){
      dialogVisible.value=true;
      console.log(' success');
    }
  }).catch(function (error){
    console.log(' error')
  });
}

</script>

<style scoped>

</style>