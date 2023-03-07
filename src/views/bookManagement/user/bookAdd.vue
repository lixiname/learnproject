<template>
  <el-dialog
      title="提示"
      v-model="dialogVisible"
      width="30%">
    <span>{{content}}了</span>
    <span slot="footer" >
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
  </el-dialog>
  <el-row justify="center">
    <el-col :span="15">
      <el-card>
        <template #header>
          <div>
            <span>PDF书籍信息</span>
          </div>
        </template>
        <div>
          <el-descriptions :border="true" :column="1">
            <el-descriptions-item >
              <template #label>
                <div>
                  <el-icon><Notebook /></el-icon>
                  书名
                </div>
              </template>
              <el-input v-model="bookNameNew" :placeholder="bookName">
                <template #prefix>
                  <el-icon><Notebook /></el-icon>
                </template>
              </el-input>
            </el-descriptions-item>
            <el-descriptions-item >
              <template #label>
                <div>
                  <el-icon><UserFilled /></el-icon>
                  作者
                </div>
              </template>
              <el-input v-model="authorNew" :placeholder="author">
                <template #prefix>
                  <el-icon><UserFilled /></el-icon>
                </template>
              </el-input>
            </el-descriptions-item>
            <el-descriptions-item >
              <template #label>
                <div>
                  <el-icon><Memo /></el-icon>
                  类型
                </div>
              </template>
              <el-input v-model="bookTypeNew" :placeholder="bookType">
                <template #prefix>
                  <el-icon><Menu /></el-icon>
                </template>
              </el-input>
            </el-descriptions-item>
            <el-descriptions-item >
              <template #label>
                <div>
                  <el-icon><Memo /></el-icon>
                  出版社
                </div>
              </template>
              <el-input v-model="publisherNew" :placeholder="publisher">
                <template #prefix>
                  <el-icon><Memo  /></el-icon>
                </template>
              </el-input>
            </el-descriptions-item>
            <el-descriptions-item >
              <template #label>
                <div>
                  <el-icon><Memo /></el-icon>
                  ISBN
                </div>
              </template>
              <el-input v-model="ISBNnew" :placeholder="ISBN">
                <template #prefix>
                  <el-icon><Memo /></el-icon>
                </template>
              </el-input>
            </el-descriptions-item>
            <el-descriptions-item >
              <template #label>
                <div>
                  <el-icon><Folder /></el-icon>
                  书籍封面
                </div>
              </template>
              <el-upload
                  :auto-upload="false"
                  v-model:file-list="upLoadList"
                  :limit="1"
                  :on-exceed="handleExceed"
                  style="width: 100%;">
                <template #trigger>
                  <el-row justify="center" style="width: 100%;">
                    <el-col :span="24">
                      <el-icon size="15px"><upload-filled /></el-icon>
                    </el-col>
                    <el-col :span="24">
                      添加文件 <em style="color:rgb(72,175,217)">请点击这里</em>
                    </el-col>
                  </el-row>
                </template>
                <template #tip>
                  <div class="el-upload__tip">
                    只能选一张图片作为封面上传
                  </div>
                </template>
              </el-upload>
            </el-descriptions-item>
          </el-descriptions>
        </div>
        <el-row justify="center">
          <el-col :span="5">
            <el-button
            @click="upLoadBook">上传</el-button>
          </el-col>
        </el-row>
      </el-card>
    </el-col>
  </el-row>
</template>
<script>
export default {
  name: "bookAdd"
}
</script>
<script setup>
import {ref, reactive, onMounted} from "vue";
import request from "../../../http/request.js";
import {getTokenID, getTokenIdentity, getTokenN,getDateTime} from '../../../utils/auth.js'
let bookName=ref();
let author=ref();
let bookType=ref();
let publisher=ref();
let ISBN=ref();
let bookNameNew=ref();
let authorNew=ref();
let bookTypeNew=ref();
let ISBNnew=ref();
let publisherNew=ref();
let upLoadList=ref();
upLoadList.value=[];
let content=ref();
let dialogVisible=ref(false);
let upLoadBook=()=>{
  //truth http
  let idcard=getTokenID();
  let Name=getTokenN();
  let identity=getTokenIdentity();
  let datetime = getDateTime();
  console.log(datetime);
  console.log(upLoadList.value[0].raw);

  request.post("/home/book/addAccessBook",{
      bookName:bookNameNew.value,
      author:authorNew.value,
      bookType:bookTypeNew.value,
      isbn:ISBNnew.value,
      publisher:publisherNew.value,
      idCard:idcard,
      name:Name,
      identity:identity,
      datetime:datetime,
      pictureOppositePath:upLoadList.value[0].name,
  }).then(function (res){
    //1成功，2重复，3其他错误
    if(res.data=="1"){
      dialogVisible.value=true;
      content.value="成功上传";
      console.log("success add book");
    }
    else if(res.data=="2"){
      dialogVisible.value=true;
      content.value="不要重复上传相同内容";
      console.log("重复 add same book");
    }
    else
      console.log("3 error 其他错误");

  }).catch(function (error){
    console.log("error add book");
  });
}
// request.post("",{
//
// }).then(function (res){
//
// }).catch(function (error){
//
// });



onMounted(() => {
});
</script>


<style scoped>

</style>