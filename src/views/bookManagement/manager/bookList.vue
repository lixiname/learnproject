<template>
  <div style="height: 100%;">
    <el-table :data="bookArray" border="true"  size="small" style="height: 95%;">
      <el-table-column label="书名" prop="bookName" sortable>
      </el-table-column>
      <el-table-column label="类型" prop="bookType" sortable>
      </el-table-column>
      <el-table-column label="出版社" prop="publisher" sortable>
      </el-table-column>
      <el-table-column label="点赞数量" prop="agreedNum" sortable>
      </el-table-column>
      <el-table-column label="下载数量" prop="downloadAmount" sortable>
      </el-table-column>
      <el-table-column label="发布人" prop="publicateUserName" sortable>
      </el-table-column>
      <el-table-column>
        <template #default="scope" >
          <el-button
              size="small"
              type="success"
              @click="bookDetail(scope,scope.$index, scope.row)"
          >详情</el-button
          >
          <el-button
              size="small"
              type="primary"
              @click="bookEdit(scope,scope.$index, scope.row)"
          >编辑</el-button
          >
          <el-popconfirm title="确认删除吗"
                         confirm-button-text="确认"
                         confirm-button-type="danger"
                         cancel-button-text="取消"
                         cancel-button-type="primary"
                         @confirm="bookDelete(scope,scope.$index)"
          >
            <template #reference>
              <el-button
                  size="small"
                  type="danger"
                  disabled
              >删除</el-button
              >
            </template>
          </el-popconfirm>
        </template>
      </el-table-column >
    </el-table>
    <el-row align="middle" justify="center" >
      <el-col :span="10">
        <el-pagination layout="sizes,prev,pager,next,jumper" :total="100" :pager-count="6" :page-sizes="pageSize" :small="true" :background="true">
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

      pageSize:[10,20,30,40]
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
let bookDetail=function (scope,index, row){
  let bookName=bookArray.value[index].bookName;
  let publicateUserName=bookArray.value[index].publicateUserName;
  let publicateUserNameID=bookArray.value[index].publicateUserNameID;
  router.push({path:'/home/bookView',
    query:{
      bookName:bookName,
      publicateUserNameID:publicateUserNameID,
      flage:"accessed"
    }});
};
let bookEdit=function (scope,index, row){
  let bookName=bookArray.value[index].bookName;
  let publicateUserNameID=bookArray.value[index].publicateUserNameID;
  router.push({path:'/home/bookCorrection',
    query:{
      bookName:bookName,
      publicateUserNameID:publicateUserNameID
    }});
};

let bookDelete=(scope,index)=>{
  console.log(index);
  let deleteBook=bookArray.value[index];
  let bookName=deleteBook.bookName;
  let publicateUserNameID=deleteBook.publicateUserNameID;
  request.delete("/home/book/deleteBook",{
    data:{
      bookName:bookName,
      publicateUserNameID:publicateUserNameID
    }
  }).then(function (res){
    console.log('delete book success');
    bookArray.value.splice(index,1);
  }).catch(function (error){
    console.log('delete book error')
  })
}









onMounted(() => {
  request.get("/home/book/MAllBooksList",{
    data:{
      no:'1'
    }
  }).then(function(res) {
    if(res.data){
      console.log(res);
      //mock
      //bookArray.value=res.data.bookList;

      // truth http
      console.log(res.data);
      res.data.forEach(function (element){
        console.log(element);
        bookArray.value.push({
          bookName:element.bookName,
          bookType:element.bookType,
          publisher:element.bookPublisher,
          publicateUserNameID:element.bookPublicateNameId,
          agreedNum:element.bookAgreedNumber,
          downloadAmount:element.bookDownloadNumber,
          publicateUserName:element.bookPublisherName
        });
      });
    }
  }).catch(function(error) {
    console.log('get booklist error');
  });


});



</script>
<style scoped>


</style>