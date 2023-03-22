<template>
  <div style="height: 100%;">
    <el-table :data="bookArray.slice((currentPage-1)*pageSize,currentPage*pageSize)" border="true"  size="small" style="height: 95%;">
      <el-table-column label="书名" prop="bookName" sortable>
      </el-table-column>
      <el-table-column label="作者" prop="author" sortable>
      </el-table-column>
      <el-table-column label="类型" prop="bookType" sortable>
      </el-table-column>
      <el-table-column label="出版社" prop="publisher" sortable>
      </el-table-column>
      <el-table-column label="发布人" prop="publicateUserName" sortable>
      </el-table-column>
      <el-table-column label="审核状态" prop="accessed" sortable>
      </el-table-column>
      <el-table-column>
        <template #default="scope" >
          <el-button
              size="small"
              type="primary"
              @click="bookDetail(scope,scope.$index, scope.row)"
          >详情</el-button
          >
          <el-popconfirm title="确认通过吗"
                         confirm-button-text="确认"
                         confirm-button-type="danger"
                         cancel-button-text="取消"
                         cancel-button-type="primary"
                         @confirm="bookAccept(scope,scope.$index)"
          >
            <template #reference>
              <el-button
                  size="small"
                  type="success"
                  :disabled="scope.row.disabled"
              >通过</el-button
              >
            </template>
          </el-popconfirm>
          <el-popconfirm title="确认驳回吗"
                         confirm-button-text="确认"
                         confirm-button-type="danger"
                         cancel-button-text="取消"
                         cancel-button-type="primary"
                         @confirm="bookNotAccept(scope,scope.$index)"
          >
            <template #reference>
              <el-button
                  size="small"
                  type="danger"
                  :disabled="scope.row.disabled"
              >驳回</el-button
              >
            </template>
          </el-popconfirm>
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
import {useRoute} from "vue-router/dist/vue-router";
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

let getOppositeIndex=(index)=>{
  index+=pageSize.value*(currentPage.value-1);
  return index;
}

let bookDetail=function (scope,index, row){
  index=getOppositeIndex(index);
  let bookName=bookArray.value[index].bookName;
  let publicateUserNameID=bookArray.value[index].publicateUserNameID;
  router.push({path:'/home/bookView',
    query:{
      bookName:bookName,
      publicateUserNameID:publicateUserNameID,
      flage:"access"
    }});
};

let bookAccept=(scope,index)=>{
  index=getOppositeIndex(index);
  console.log(index);
  let deleteBook=bookArray.value[index];
  let bookName=deleteBook.bookName;
  let publicateUserNameID=deleteBook.publicateUserNameID;
  let flage='agreeAccess';
  request.post("/home/book/accessOneBook",{
      bookName:bookName,
      publicateUserNameID:publicateUserNameID,
      flage:flage
  }).then(function (res){
    if(res.data=="success")
       console.log('agreeAccess success');
  }).catch(function (error){
    console.log('agreeAccess error')
  })
}
let bookNotAccept=(scope,index)=>{
  index=getOppositeIndex(index);
  console.log(index);
  let deleteBook=bookArray.value[index];
  let bookName=deleteBook.bookName;
  let publicateUserNameID=deleteBook.publicateUserNameID;
  let flage='NotAccess';
  request.post("/home/book/accessOneBook",{
    bookName:bookName,
    publicateUserNameID:publicateUserNameID,
    flage:flage
  }).then(function (res){
    if(res.data=="success")
      console.log('NotAccess success');
    //bookArray.value.splice(index,1);
  }).catch(function (error){
    console.log('NotAccess error')
  })
}




onMounted(() => {
  request.get("/home/book/AllSharedBooksList",{
    data:{
      no:'1'
    }
  }).then(function(res) {
    if(res.data){
      res.data.forEach(function (element){
        console.log(element);
        let disabled=false;
        let accessed='待审核';
        if(element.accessed!=0)
          disabled=true;
        if(element.accessed==0)
          accessed='待审核';
        else if(element.accessed==1)
          accessed='已通过';
        else if(element.accessed==2)
          accessed='已驳回';
        bookArray.value.push({
          bookName:element.bookName,
          bookType:element.bookType,
          author:element.bookAuthor,
          publisher:element.bookPublisher,
          publicateUserNameID:element.bookPublicateNameId,
          publicateUserName:element.bookPublisherName,
          accessed:accessed,
          disabled:disabled
        });
      });
      bookListLength.value=bookArray.value.length;
      console.log(bookArray.value);
      console.log('get booklist success');
    }
  }).catch(function(error) {
    console.log('get booklist error');
  });


});



</script>
<style scoped>


</style>