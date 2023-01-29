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
          <el-descriptions :border="true" :column="1">
            <el-descriptions-item >
              <template #label>
                  <el-icon><Notebook /></el-icon>
                  书名
              </template>
              {{bookName}}
            </el-descriptions-item>
            <el-descriptions-item >
              <template #label>
                <el-icon><UserFilled /></el-icon>
                作者
              </template>
              {{author}}
            </el-descriptions-item>
            <el-descriptions-item >
              <template #label>
                <el-icon><Menu /></el-icon>
                类型
              </template>
              {{bookType}}
            </el-descriptions-item>
            <el-descriptions-item >
              <template #label>
                <el-icon><Memo /></el-icon>
                出版社
              </template>
              {{publisher}}
            </el-descriptions-item>
            <el-descriptions-item >
              <template #label>
                  <el-icon><Memo /></el-icon>
                  ISBN
              </template>
              {{ISBN}}
            </el-descriptions-item>
            <el-descriptions-item >
              <template #label>
                <el-icon><StarFilled /></el-icon>
                点赞数量
              </template>
              {{agreedNum}}
            </el-descriptions-item>
            <el-descriptions-item >
              <template #label>
                <el-icon><UserFilled /></el-icon>
                发布人
              </template>
              {{nickname}}
            </el-descriptions-item>
          </el-descriptions>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "bookView",
  data(){
    return {

    }

  },
  methods:{
  },

}
</script>
<script setup>
import {ref, reactive, onMounted} from "vue";
import { useRouter,useRoute } from 'vue-router';
import request from "../../../http/request.js";
let route=useRoute();
let bookNamed=route.query.bookName;
let publicateUserNameIDd=route.query.publicateUserNameID;
let flage=route.query.flage;
let bookName=ref();
let author=ref();
let bookType=ref();
let ISBN=ref();
let agreedNum=ref();
let nickname=ref();
let publisher=ref();
onMounted(() => {
  if(flage=="accessed"){
    request.get("/home/book/bookDetail", {
      //mock用data
      params:{
        bookName:bookNamed,
        publicateUserNameID:publicateUserNameIDd
      }
    }).then(function(res) {
      if(res.data){
        //mock
        // console.log(res.data);
        // bookName.value=res.data.book.bookName;
        // author.value=res.data.book.author;
        // bookType.value=res.data.book.bookType;
        // ISBN.value=res.data.book.ISBN;
        // agreedNum.value=res.data.book.agreedNum;
        // nickname.value=res.data.book.nickname;
        // publisher.value=res.data.book.publisher;
        // console.log('get book success');

//truth http
        bookName.value=res.data.bookName;
        author.value=res.data.bookAuthor;
        bookType.value=res.data.bookType;
        ISBN.value=res.data.bookISBN;
        agreedNum.value=res.data.bookAgreedNumber;
        nickname.value=res.data.bookPublisherName;
        publisher.value=res.data.bookPublisher;
        console.log(res.data);
        console.log('get book success');
      }
    }).catch(function(error) {
      console.log('get book error');
    });
  }
  else if(flage=="access"){
    request.get("/home/book/accessbookDetail", {
      //mock用data
      params:{
        bookName:bookNamed,
        publicateUserNameID:publicateUserNameIDd
      }
    }).then(function(res) {
      if(res.data){
        //mock
        // console.log(res.data);
        // bookName.value=res.data.book.bookName;
        // author.value=res.data.book.author;
        // bookType.value=res.data.book.bookType;
        // ISBN.value=res.data.book.ISBN;
        // agreedNum.value=res.data.book.agreedNum;
        // nickname.value=res.data.book.nickname;
        // publisher.value=res.data.book.publisher;
        // console.log('get book success');

//truth http
        bookName.value=res.data.bookName;
        author.value=res.data.bookAuthor;
        bookType.value=res.data.bookType;
        ISBN.value=res.data.bookISBN;
        agreedNum.value=res.data.bookAgreedNumber;
        nickname.value=res.data.bookPublisherName;
        publisher.value=res.data.bookPublisher;
        console.log(res.data);
        console.log('get book success');
      }
    }).catch(function(error) {
      console.log('get book error');
    });
  }

});
</script>

<style scoped>

</style>