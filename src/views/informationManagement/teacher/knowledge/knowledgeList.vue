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
  <el-dialog
      title="输入文件名"
      v-model="dialogVisibleCreateNewFolder"
      width="30%">
    <el-input v-model="newFolderName"  >
      <template #prefix>
        <el-icon color="rgb(244,192,70)"><Folder /></el-icon>
      </template>
    </el-input>
    <span slot="footer" >
        <el-button type="primary" @click="createNewFolder">确 定</el-button>
      </span>
  </el-dialog>
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
                  <el-button :circle="true"  size="small" disabled>
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
import {getDateTime, getTokenID, getTokenIdentity, getTokenN} from "../../../../utils/auth";



console.log('first');
let studyInformationList=ref();
studyInformationList.value=[];

let content=ref();
let dialogVisible=ref(false);
let newFolderName=ref("1test");
let dialogVisibleCreateNewFolder=ref(false);
let createFolder=()=>{
  dialogVisibleCreateNewFolder.value=true;
}
let createNewFolder=()=>{
  dialogVisibleCreateNewFolder.value=false;
  //mock/home/knowledgeList/newFolder
  let idcard=getTokenID();
  let Name=getTokenN();
  let datetime = getDateTime();
  console.log({newFolderName:newFolderName})
  request.post("/home/knowledgeList/upLoadOneFolder",{
    folderName: newFolderName.value,
    teacherID:idcard,
    folderAuthor: Name,
    fileNumber:0,
    createDate:datetime
  }).then(res=>{
    if(res.data=="success"){
      dialogVisible.value=true;
      content.value="成功创建文件夹";
      console.log("success add folder");
      studyInformationList.value.push({
        folderName: newFolderName,
        teacherID:idcard,
        folderAuthor: Name,
        fileNumber:0,
        createDate:datetime
      });
    }
    else if(res.data=="notSuccess"){
      dialogVisible.value=true;
      content.value="不要创建同名文件夹";
      console.log("重复 add same folder");
    }
    else
      console.log("3 error 其他错误");

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
  let idcard=getTokenID();
  let folder=studyInformationList.value[index];
  let folderName=folder.folderName;
  let teacherID=folder.teacherID;
  //mockhome/knowledgeList/downLoadList
  request.get("/home/knowledgeList/downFiles",{
    params:{
      folderName:folderName,
      idcard:idcard
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
  let teacherID=studyInformationList.value[index].teacherID;
  console.log('open child success');
  router.push({path:'/home/knowledgeChild',
    query:{
      folderName:folderNames,
      teacherID:teacherID
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
  let folderAuthor='chen';
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
  //mock /home/knowledgeList/folder

  let idcard=getTokenID();
  let Name=getTokenN();
  let identity=getTokenIdentity();
  let datetime = getDateTime();
  request
      .get("/home/knowledgeList/folders", {
        params:{
          idcard: idcard,
        }
      })
      .then(function(res) {
        if(res.data){
          console.log(res.data);
          res.data.forEach(function (element){
            console.log(element);
            studyInformationList.value.push({
              folderName:element.folderName,
              folderAuthor:element.folderAuthor,
              fileNumber:element.fileNumber,
              createDate:element.createDate,
              teacherID:element.teacherID
            });
          });
          //studyInformationList.value=res.data.knowledgeData;
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