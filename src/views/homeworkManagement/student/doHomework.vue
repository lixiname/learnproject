<template>
  <el-dialog
      title="提示"
      v-model="dialogVisible"
      width="30%">
    <span>成功</span>
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
              <el-input v-model="fileName" disabled>
                <template #prefix>
                  <el-icon><Memo /></el-icon>
                </template>
              </el-input>
            </el-descriptions-item>
            <el-descriptions-item >
              <template #label>
                <div>
                  题号
                </div>
              </template>
              <el-input v-model="quest" disabled>
                <template #prefix>
                  <el-icon><Memo /></el-icon>
                </template>
              </el-input>
            </el-descriptions-item>
            <el-descriptions-item >
              <template #label>
                <div>
                  题目描述
                </div>
              </template>
              <el-input v-model=" content" disabled>
                <template #prefix>
                  <el-icon><Memo /></el-icon>
                </template>
              </el-input>
            </el-descriptions-item>
            <el-descriptions-item >
              <template #label>
                <div>
                  选项A
                </div>
              </template>
              <el-input v-model="checkOne" disabled>
                <template #prefix>
                  <el-icon><Memo /></el-icon>
                </template>
              </el-input>
            </el-descriptions-item>
            <el-descriptions-item >
              <template #label>
                <div>
                  选项B
                </div>
              </template>
              <el-input v-model="checkTwo" disabled>
                <template #prefix>
                  <el-icon><Memo /></el-icon>
                </template>
              </el-input>
            </el-descriptions-item>
            <el-descriptions-item >
              <template #label>
                <div>
                  选项C
                </div>
              </template>
              <el-input v-model="checkThree" disabled>
                <template #prefix>
                  <el-icon><Memo /></el-icon>
                </template>
              </el-input>
            </el-descriptions-item>
            <el-descriptions-item >
              <template #label>
                <div>
                  选项D
                </div>
              </template>
              <el-input v-model="checkFour" disabled>
                <template #prefix>
                  <el-icon><Memo /></el-icon>
                </template>
              </el-input>
            </el-descriptions-item>
            <el-descriptions-item >
              <template #label>
                <div>
                  选择
                </div>
              </template>
              <el-input v-model="flage" >
                <template #prefix>
                  <el-icon><Memo /></el-icon>
                </template>
              </el-input>
            </el-descriptions-item>
          </el-descriptions>
        </div>
        <el-row justify="center">
          <el-col :span="5">
            <el-button
                @click="doTest">确认</el-button>
          </el-col>
        </el-row>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "doHomework"
}
</script>

<script setup>
import {ref, reactive, onMounted} from "vue";
import { useRouter,useRoute } from 'vue-router';
import {getDateTime, getTokenID, getTokenIdentity, getTokenN} from "../../../utils/auth";
import request from "../../../http/request";
let route=useRoute();



let fileName=ref();
fileName.value=route.query.fileName;
let tid=route.query.tid;
let term=route.query.term;
let room=route.query.room;



let dialogVisible=ref(false);


let quest=ref();
let content=ref();
let checkOne=ref();
let checkTwo=ref();
let checkThree=ref();
let checkFour=ref();
let flage=ref();

let doTest=()=>{
  let idcard=getTokenID();
  let Name=getTokenN();
  let identity=getTokenIdentity();
  let datetime = getDateTime();
  // request.post("/home/homework/addhomework",{
  //   fileName:fileName.value,
  //   quest:quest.value,
  //   content:content.value,
  //   tID:idcard,
  //   checkOne:checkOne.value,
  //   checkTwo:checkTwo.value,
  //   checkThree:checkThree.value,
  //   checkFour:checkFour.value,
  //   flage:flage.value,
  //   tname:Name
  // }).then(function (res){
  //   dialogVisible.value=true;
  //   console.log(' success');
  // }).catch(function (error){
  //   console.log(' error')
  // });
  // fileName
  // quest
  // content
  // tID
  // checkOne
  // checkTwo
  // checkThree
  // checkFour
  // flage
  // tname
}

onMounted(() => {
  console.log('tid');
  console.log(tid);
  request.post("/home/homework/shomeworkOne",{
    params:{
      tids:tid,
      fileName:fileName
    }
  }).then(function (res){
    quest.value=res.data.quest;
    content.value=res.data.content;
    checkOne.value=res.data.checkOne;
    checkTwo.value=res.data.checkTwo;
    checkThree.value=res.data.checkThree;
    checkFour.value=res.data.checkFour;
    console.log(' success');
  }).catch(function (error){
    console.log(' error')
  });



});
</script>

<style scoped>

</style>