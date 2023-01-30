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
              <el-input v-model="fileName" >
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
              <el-input v-model="quest" >
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
              <el-input v-model=" content" >
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
              <el-input v-model="checkOne" >
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
              <el-input v-model="checkTwo" >
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
              <el-input v-model="checkThree" >
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
              <el-input v-model="checkFour" >
                <template #prefix>
                  <el-icon><Memo /></el-icon>
                </template>
              </el-input>
            </el-descriptions-item>
            <el-descriptions-item >
              <template #label>
                <div>
                  正确选项
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



let fileName=ref('test1');
let quest=ref('1');
let content=ref('圆锥曲线');
let checkOne=ref('测试用');
let checkTwo=ref('测试用');
let checkThree=ref('测试用');
let checkFour=ref('测试用');
let flage=ref('C');
let upLoadTest=()=>{
  let idcard=getTokenID();
  let Name=getTokenN();
  console.log('idcard');
  console.log(idcard);

  request.post("/home/homework/addhomework",{
      fileName:fileName.value,
      quest:quest.value,
      tid:idcard,
      content:content.value,
      checkOne:checkOne.value,
      checkTwo:checkTwo.value,
      checkThree:checkThree.value,
      checkFour:checkFour.value,
      flage:flage.value,
      tname:Name
  }).then(function (res){
    dialogVisible.value=true;
    console.log(' success');
  }).catch(function (error){
    console.log(' error')
  });
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

</script>

<style scoped>

</style>