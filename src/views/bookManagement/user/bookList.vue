<template>
  <div style="height: 100%;">
    <el-dialog
        title="提示"
        v-model="dialogVisible"
        width="30%">
      <span>{{content}}了</span>
      <span slot="footer" >
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-table :data="bookArray.slice((currentPage-1)*pageSize,currentPage*pageSize)" border="true"  size="small" style="height: 95%;">
      <el-table-column label="书名" sortable>
        <template #default="scope">
          <el-icon color="rgb(244,192,70)"><Notebook /></el-icon>
          <span>{{scope.row.bookName}}</span>
        </template>
      </el-table-column>
      <el-table-column label="类型" prop="bookType" sortable>
      </el-table-column>
      <el-table-column label="作者" prop="author" sortable>
      </el-table-column>
      <el-table-column label="出版社" prop="publisher" sortable>
      </el-table-column>
      <el-table-column label="点赞数量" prop="agreedNum" sortable>
      </el-table-column>
      <el-table-column label="发布人" prop="nickname" sortable>
      </el-table-column>
      <el-table-column>
        <template #default="scope" >
          <el-button
              size="small"
              type="success"
              @click="bookDetail(scope,scope.$index, scope.row)"
          >详情</el-button
          >
          <el-popconfirm title="选择下载位置"
                         confirm-button-text="确认"
                         confirm-button-type="danger"
                         cancel-button-text="取消"
                         cancel-button-type="primary"
                         @confirm="downLoad(scope,scope.$index)"
          >
            <template #reference>
              <el-button
                  size="small"
                  type="primary"
              >下载</el-button>
            </template>
          </el-popconfirm>
          <el-button v-if="scope.row.like==false"
              size="small"
              plain
              @click="bookAgreed(scope,scope.$index, scope.row)"
          >点赞</el-button
          >
          <el-button v-if="scope.row.like==true"
              size="small"
              type="success"
              @click="bookAgreed(scope,scope.$index, scope.row)"
          >赞了</el-button
          >
          {{k}}
        </template>
      </el-table-column >
    </el-table>
    <el-row align="middle" justify="center" >
      <el-col :span="10">
        <el-pagination layout="sizes,prev,pager,next,jumper" :total="bookListLength" :pager-count="5" :page-sizes="pageSizes"
                       @size-change="sizesChange"
                       @current-change="changeCurrentPage"
                       prev-text="上一页"
                       next-text="下一页"
                       :small="true" :background="true">
        </el-pagination>
      </el-col>
    </el-row>

  </div>
</template>

<script>
export default {
  name: "bookList",
  data(){
    return{

    }
  },
  methods:{



  }
}
</script>
<script setup>
import {ref, reactive, onMounted} from "vue";
import { useRouter } from 'vue-router';
import request from "../../../http/request.js";
import {getTokenID, getTokenIdentity, getTokenN,getDateTime} from '../../../utils/auth.js'
import download from 'downloadjs'
let router=useRouter();
let bookArray=ref();
bookArray.value=[];

let currentPage=ref(1);
let pageSize=ref(10);
let bookListLength=ref(0);
let pageSizes=ref();
pageSizes.value=[10,15,20,30];
let changeCurrentPage=(page)=>{
  currentPage.value=page;
}
let sizesChange=(size)=>{
  pageSize.value=size;
}

let bookDetail=function (scope,index, row){
  let bookName=bookArray.value[index].bookName;
  let publicateUserNameID=bookArray.value[index].publicateUserNameID;
  router.push({path:'/home/userBookView',
    query:{
      bookName:bookName,
      publicateUserNameID:publicateUserNameID,
      flage:"accessed"
    }});
};

let downLoad=(scope,index)=>{
  let book=bookArray.value[index];
  let bookName=book.bookName;
  let publicateUserNameID=book.publicateUserNameID;
  //主码,发布人为真名
  request.get("/home/book/downLoad",{
    //mock用data
    params:{
      bookName:bookName,
      publicateUserNameID:publicateUserNameID
    },
    responseType: 'blob',
  }).then(res=>{
    console.log(res.data);
    console.log(" downLoad book content success");
    let blob = new Blob([res.data]);
    let url =URL.createObjectURL(blob);
    //window.open(url);
    download(blob,'1.pdf','application/pdf');
    console.log('blob url:     '+url);
  }).catch(error=>{
    console.log("downLoad book content error");
  });
}
let content=ref();
let dialogVisible=ref(false);
let bookAgreed=(scope,index)=>{
  let book=bookArray.value[index];
  let bookName=book.bookName;
  let publicateUserNameID=book.publicateUserNameID;
  let idcard=getTokenID();
  let name=getTokenN();
  let identity=getTokenIdentity();
  let datetime = getDateTime();
  let url='';
  if(identity=='teacher'){
    //url="/home/book/teacherAgreed";
    url="/home/book/agreed";
  }
  else{
    //url="/home/book/studentAgreed";
    url="/home/book/agreed";
  }
  request.post(url,{
    //mock用get data
      bookName:bookName,
      publicateUserNameID:publicateUserNameID,
      userID:idcard,
      likeName:name,
      datetime:datetime,
      identity:identity
  }).then(res=>{
    if(res.data=="exist"){
      dialogVisible.value=true;
      content.value="曾经已经点赞过了";
      console.log("exist this ID like ");
      console.log(dialogVisible.value);
    }
    else if(res.data=="success"){
      dialogVisible.value=true;
      content.value="点赞成功";
      console.log(" this ID like success");
      console.log(dialogVisible.value);
    }
    bookArray.value[index].like=true;
  }).catch(error=>{
    console.log("downLoad book content error");
  });
}



onMounted(() => {
  request.get("/home/book/AllBooksList",{
    data:{
      no:'1'
    }
  }).then(function(res) {
    if(res.data){
      console.log(res);

      //mock
      // res.data.bookList.forEach(function (element){
      //   bookArray.value.push({
      //     bookName:element.bookName,
      //     bookType:element.bookType,
      //     publisher:element.publisher,
      //     publicateUserNameID:element.publicateUserNameID,
      //     agreedNum:element.agreedNum,
      //     nickname:element.nickname,
      //     like:false
      //   });
      // });
      // truth http
      console.log(res.data);
      res.data.forEach(function (element){
        console.log(element);
        bookArray.value.push({
          bookName:element.bookName,
          bookType:element.bookType,
          author:element.bookAuthor,
          publisher:element.bookPublisher,
          publicateUserNameID:element.bookPublicateNameId,
          agreedNum:element.bookAgreedNumber,
          nickname:element.bookPublisherName,
          like:false
        });
      });
      bookListLength.value=bookArray.value.length;
      console.log(bookArray.value);
      console.log('get booklist success user');
    }
  }).catch(function(error) {
    console.log('get booklist error');
  });


});



</script>
<style scoped>


</style>