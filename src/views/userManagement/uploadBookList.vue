<template>
  <div style="height: 100%;">
    <el-table :data="bookArray.slice((currentPage-1)*pageSize,currentPage*pageSize)" border="true"  size="small" style="height: 95%;">
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
      <el-table-column label="上传时间" prop="datetime" sortable>
      </el-table-column>
      <el-table-column label="是否通过" prop="access" sortable>
      </el-table-column>

      <el-table-column>
        <template #default="scope" >
          <el-button
              size="small"
              type="success"
              @click="bookDetail(scope,scope.$index, scope.row)"
          >详情</el-button
          >
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
  name: "uploadBookList",
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
import request from "../../http/request.js";
import {getDateTime, getTokenID, getTokenIdentity, getTokenN} from "../../utils/auth";
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
  router.push({path:'/home/userBookView',
    query:{
      bookName:bookName,
      publicateUserNameID:publicateUserNameID,
      flage:"access"
    }});
};

let idcard=getTokenID();
onMounted(() => {
  request.get("/home/book/sharedBooksList",{
    params:{
      idcard:idcard
    }
  }).then(function(res) {
    if(res.data){
      console.log(res);
      // truth http
      console.log(res.data);
      res.data.forEach(function (element){
        console.log(element);
        let access=0;
        if(element.accessed==0){
          access="待审核";
        }
        else if(element.accessed==1){
          access="通过";
        }
        else if(element.accessed==2){
          access="未通过";
        }
        bookArray.value.push({
          bookName:element.bookName,
          bookType:element.bookType,
          publisher:element.bookPublisher,
          publicateUserNameID:element.bookPublicateNameId,
          agreedNum:element.bookAgreedNumber,
          downloadAmount:element.bookDownloadNumber,
          datetime:element.bookPublisherTime,
          access:access
        });
        bookListLength.value=bookArray.value.length;
        console.log('get sharedbooklist success');
      });
    }
  }).catch(function(error) {
    console.log('get booklist error');
  });


});



</script>


<style scoped>

</style>