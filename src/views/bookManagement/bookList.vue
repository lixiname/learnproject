<template>
  <div style="height: 100%;">
    <el-table :data="bookArray" border="true" @selection-change="selectChange" style="height: 95%;">
      <el-table-column type="index">
      </el-table-column>
      <el-table-column label="书名" prop="bookName" sortable>
      </el-table-column>
      <el-table-column label="下载数量" prop="downloadAmount" sortable>
      </el-table-column>
      <el-table-column label="ISBN" prop="ISBN" sortable>
      </el-table-column>
      <el-table-column  >
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
          >
            <template #reference>
              <el-button
                  size="small"
                  type="danger"
                  @click="bookDelete(scope,scope.$index, scope.row)"
              >删除</el-button
              >
            </template>

          </el-popconfirm>

        </template>
      </el-table-column >
      <el-table-column type="selection" >
      </el-table-column>
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
      bookArray:[
        {
          bookName:'one',
          downloadAmount:120,
          ISBN:'123'
        },
        {
          bookName:'two',
          downloadAmount:140,
          ISBN:'1234'
        },
        {
          bookName:'three',
          downloadAmount:100,
          ISBN:'1235'
        }
      ],
      pageSize:[10,20,30,40]
    }
  },
  methods:{
    bookDetail:function (scope,index, row){
      let bookName=this.bookArray[index].bookName;
      this.$router.push({path:'/home/bookView',query:{bookName:bookName}});
      console.log({bookName:bookName});
      row;
    },
    bookEdit:function (scope,index, row){
      this.$router.push('/home/bookAdd');
      console.log(index);
      row;
    },
    bookDelete:function (scope,index, row){
      console.log(index);
      row;
    },
    selectChange:function (){

    }
  }
}
</script>

<style scoped>

</style>