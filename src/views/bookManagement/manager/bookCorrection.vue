<template>
  <el-row justify="center">
    <el-col :span="15">
      <el-card>
        <template #header>
          <div>
            <span>PDF书籍信息</span>
          </div>
        </template>
        <div>
          <el-row justify="center">
            <el-col :span="9">
              <el-image :src="URLs" fit="contain"></el-image>
            </el-col>
          </el-row>
          <el-descriptions :border="true" :column="1">
            <el-descriptions-item >
              <template #label>
                <div>
                  <el-icon><Notebook /></el-icon>
                  书名
                </div>
              </template>
              <el-input v-model="bookNameNew" :placeholder="bookName" disabled>
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
          </el-descriptions>
        </div>
        <el-row justify="center">
          <el-col :span="5">
            <el-button
                @click="updateBook">修改</el-button>
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
import { useRouter,useRoute } from 'vue-router';
import request from "../../../http/request.js";
import {getDateTime, getTokenID, getTokenIdentity, getTokenN} from "../../../utils/auth";
let route=useRoute();
let bookNamed=route.query.bookName;
let publicateUserNameIDd=route.query.publicateUserNameID;
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
let URLs=ref("");

let updateBook=()=>{
  //truth http
  let idcard=getTokenID();
  let Name=getTokenN();
  let identity=getTokenIdentity();
  let datetime = getDateTime();
  console.log(datetime);
  request.post("/home/book/updateOneBook",{
    bookName:bookNameNew.value,
    author:authorNew.value,
    bookType:bookTypeNew.value,
    isbn:ISBNnew.value,
    publisher:publisherNew.value,
    idCard:publicateUserNameIDd
  }).then(function (res){
    //1成功，2错误
    if(res.data=="1")
      console.log("success update book");
    else
      console.log("2 error 其他错误");

  }).catch(function (error){
    console.log("error add book");
  });
}


onMounted(() => {
  request.get("/home/book/bookDetail",{
    params:{
      bookName:bookNamed,
      publicateUserNameID:publicateUserNameIDd
    }
  }).then(function(res) {
    if(res.data){
      console.log(res.data);
      bookNameNew.value=bookName.value=res.data.bookName;
      authorNew.value=author.value=res.data.bookAuthor;
      bookTypeNew.value=bookType.value=res.data.bookType;
      ISBNnew.value=ISBN.value=res.data.bookISBN;
      publisherNew.value=publisher.value=res.data.bookPublisher;
      console.log('get book success');
    }
  }).catch(function(error) {
    console.log('get book error');
  });

  request.get("/home/book/image",{
    params:{
      bookName:bookNamed,
      publicateUserNameID:publicateUserNameIDd,
      type:flage
    },
    responseType: 'blob',
  }).then(res=>{
    console.log(res.data);
    console.log(" book picture  success");
    let blob = new Blob([res.data]);
    let url = URL.createObjectURL(blob);
    console.log('blob url:     '+url);
    URLs.value = url;
  }).catch(error=>{
    console.log("book picture error");
  });
});
</script>


<style scoped>

</style>