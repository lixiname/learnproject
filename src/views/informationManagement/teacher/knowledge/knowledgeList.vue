<template>
  <div style="height: 100%;">
    <el-row justify="space-between" align="top" >
      <el-col :span="8">
        <el-form :model="form" :rules="searchRules" >
          <el-form-item prop="inputSearch">
            <el-input v-model="form.inputSearch" placeholder="输入查找的文件名">
              <template #append>
                <el-button style="background-color: rgb(150,212,120)" @click.stop="submitSearch">
                  <template #icon>
                    <el-icon color="white"><Search /></el-icon>
                  </template>
                </el-button>
              </template>
            </el-input>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="10">
        <el-row justify="end" align="middle">
          <el-col :span="4">
            <el-button size="small" type="success" @click="createFolder">新建文件夹</el-button>
          </el-col>
        </el-row>
      </el-col>
    </el-row>

    <el-table  :data="studyInformationList" style="height: 80%" @cell-click="openChildList" :cell-class-name="tableCellClassName">
      <el-table-column type="selection" >
      </el-table-column>
      <el-table-column label="文件夹名"  sortable >
        <template #default="scope">
          <el-icon color="rgb(244,192,70)"><Folder /></el-icon>
          <span>{{scope.row.folderName}}</span>

        </template>
      </el-table-column>
      <el-table-column label="上传者" prop="folderAuthor" sortable></el-table-column>
      <el-table-column label="文件个数" prop="fileNumber" sortable></el-table-column>
      <el-table-column label="文件夹创建日期" prop="createDate" sortable></el-table-column>
      <el-table-column>
        <template #default="scope">
          <el-row justify="start" align="middle">
            <el-col :span="7">
              <el-button :circle="true"  size="small" @click.stop="arrowUp(scope,scope.$index, scope.row)" v-if="scope.$index>0">
                <template #icon>
                  <el-icon><ArrowUp /></el-icon>
                </template>
              </el-button>
              <el-button :circle="true"  size="small" @click.stop="arrowDown(scope,scope.$index, scope.row)" v-if="scope.$index<studyInformationList.length-1">
                <template #icon>
                  <el-icon><ArrowDown /></el-icon>
                </template>
              </el-button>
            </el-col>
            <el-col :span="11">
              <el-button :circle="true"  size="small" @click.stop="downLoad(scope,scope.$index)" >
                <template #icon>
                  <el-icon><Coin /></el-icon>
                </template>
              </el-button>
              <el-popconfirm title="确认删除吗"
                             confirm-button-text="确认"
                             confirm-button-type="danger"
                             cancel-button-text="取消"
                             cancel-button-type="primary"
                             @confirm.stop="deleteFolder(scope,scope.$index)"
              >
                <template #reference>
                  <el-button :circle="true"  size="small" >
                    <template #icon>
                      <el-icon color="red"><Delete /></el-icon>
                    </template>
                  </el-button>
                </template>
              </el-popconfirm>
            </el-col>
            <el-col :span="4">
              <el-button
                  size="small"
                  @click="openChildList(scope,scope.$index)"
              >
                <template #icon >
                  <el-icon color="green"><FolderOpened /></el-icon>
                </template>
              </el-button>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
    </el-table>
    <el-row justify="start" align="top">
      <el-col :span="2">
        <el-button size="small" type="success" @click="summaryDelete()">批量删除</el-button>
      </el-col>
      <el-col :span="2">
        <el-button size="small" type="success" @click="summaryDownLoad()">批量下载</el-button>
      </el-col>
    </el-row>

  </div>

</template>

<script setup name="knowledgeList">
import {ref, reactive, onBeforeMount, onMounted} from 'vue';
import { useRouter,useRoute } from 'vue-router';
import request from '../../../../http/request.js';
console.log('first');
let studyInformationList=ref();

let createFolder=()=>{
  studyInformationList.value.push({
    folderName: 'newDefault',
    folderAuthor: 'lwx',
    fileNumber:0,
    createDate:'2022-12'
  });
  request.post("/home/knowledgeList/newFolder",{
    folderName: 'newDefault',
    folderAuthor: 'lwx',
    fileNumber:0,
    createDate:'2022-12'
  }).then(res=>{
    console.log("createFolder success");

  }).catch(error=>{console.log("createFolder error")});
}

let arrowUp=(scope,index, row)=>{
  let temp=studyInformationList.value[index-1];
  studyInformationList.value[index-1]=studyInformationList.value[index];
  studyInformationList.value[index]=temp;
  console.log('down success');
}
let arrowDown=(scope,index, row)=>{
  let temp=studyInformationList.value[index];
  studyInformationList.value[index]=studyInformationList.value[index+1];
  studyInformationList.value[index+1]=temp;
  console.log('up success');
}
let downLoad=(scope,index)=>{
  let folder=studyInformationList.value[index];
  let folderName=folder.folderName;
  let folderAuthor=folder.folderAuthor;
  request.get("/home/knowledgeList/downLoadList",{
    data:{
      folderName:folderName,
      folderAuthor:folderAuthor
    }
  }).then(res=>{
    console.log("downLoad folder content success");
    console.log(res.data);
  }).catch(error=>{
    console.log("downLoad folder content error");
  });
}
let deleteFolder=(scope,index)=>{
  console.log(index);
  let deleteFolder=studyInformationList.value[index];
  let folderName=deleteFolder.folderName;
  let folderAuthor=deleteFolder.folderAuthor;
  request.delete("/home/knowledgeList/deleteFolder",{
    data:{
      folderName:folderName,
      folderAuthor:folderAuthor
    }
  }).then(function (res){
    console.log('delete file success');
    studyInformationList.value.splice(index,1);
  }).catch(function (error){
    console.log('delete file error')
  })
}

let router=useRouter();
let openChildList=(scope,index)=>{
  let folderNames=studyInformationList.value[index].folderName;
  let folderAuthors=studyInformationList.value[index].folderAuthor;
  console.log('open child success');
  router.push({path:'/home/knowledgeChild',
    query:{
      folderName:folderNames,
      folderAuthor:folderAuthors
    }
  });
}
let tableCellClassName=({row, column, rowIndex, columnIndex})=>{
  row.index=rowIndex;
  column.index=columnIndex;
}

let form=reactive({
  inputSearch:''
});
let submitSearch=()=>{
  let folderAuthor='xw';
  console.log("search folderName success");
  request.get("/home/knowledgeList/filterFolder",{
    data:{
      folderName:form.inputSearch,
      folderAuthor:folderAuthor
    }
  }).then(res=>{
    studyInformationList.value=res.data.knowledgeData;

    console.log("find folder success");
    console.log(studyInformationList.value);
  }).catch(error=>{
    console.log('find folder error');
  });
}
let searchRules=reactive({
  inputSearch:[
    {
      type:"string",
      message:"please input string",
      trigger:"change"

    },
  ]
});




let summaryDelete=()=>{

}
let summaryDownLoad=()=>{

}
onMounted(() => {
  //调用方法
  request
      .get("/home/knowledgeList/folder", {
        params:{
          user: "12345",
          password: "12345",
        }
      })
      .then(function(res) {
        if(res.data){
          console.log(res.data);
          studyInformationList.value=res.data.knowledgeData;
          console.log(studyInformationList.value);
          console.log('get studyInformationList success');
        }
      })
      .catch(function(error) {
        console.log("get studyInformationList error");
      });

});

</script>

<style scoped>

</style>