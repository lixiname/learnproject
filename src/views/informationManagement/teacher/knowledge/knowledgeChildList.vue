<template>
  <div style="height: 100%;">
    <el-dialog
        v-model="dialogVisible"
        width="20%"
        style="height: 30%"
    >
      <el-card>
        <template #header>
          选择要发布的班级
        </template>
        <el-dropdown @command="handleSelectTermCommand">
          <el-button>
            选择年级<el-icon ><arrow-down /></el-icon>
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <div v-for="item in classroomList">
                <el-dropdown-item :command="item.term">{{item.term}}级</el-dropdown-item>
              </div>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <el-checkbox-group v-model="roomListCheck">
          <span v-for="item in roomList">
            <el-checkbox :label="item.room" border >
              {{item.room}}班
            </el-checkbox>
          </span>
        </el-checkbox-group>
        <el-button style="width: 100%" @click="submitSelectClassroomAndPublication">确认发布</el-button>
      </el-card>
    </el-dialog>
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
      </el-col>
    </el-row>
    <el-table  :data="fileList" style="height: 70%;">
      <el-table-column type="selection" >
      </el-table-column>
      <el-table-column label="文件名" sortable>
        <template #default="scope">
          <el-icon color="rgb(244,192,70)"><Document /></el-icon>
          <span>{{scope.row.fileName}}</span>
        </template>
      </el-table-column>
      <el-table-column label="上传者" prop="folderAuthor" sortable></el-table-column>
      <el-table-column label="大小" prop="fileSize" sortable></el-table-column>
      <el-table-column label="创建日期" prop="createDate" sortable></el-table-column>
      <el-table-column>
        <template #default="scope">
          <el-row justify="start" align="middle">
            <el-col :span="7">
              <el-button :circle="true"  size="small" @click="arrowUp(scope,scope.$index, scope.row)" v-if="scope.$index>0">
                <template #icon>
                  <el-icon><ArrowUp /></el-icon>
                </template>
              </el-button>
              <el-button :circle="true"  size="small" @click="arrowDown(scope,scope.$index, scope.row)" v-if="scope.$index<fileList.length-1">
                <template #icon>
                  <el-icon><ArrowDown /></el-icon>
                </template>
              </el-button>
            </el-col>
            <el-col :span="4">
              <el-button :circle="true"  size="small" @click="downLoad(scope,scope.$index)" >
                <template #icon>
                  <el-icon><Coin /></el-icon>
                </template>
              </el-button>
            </el-col>
            <el-col :span="6">
              <el-popconfirm title="确认删除吗"
                             confirm-button-text="确认"
                             confirm-button-type="danger"
                             cancel-button-text="取消"
                             cancel-button-type="primary"
                             @confirm="deleteFile(scope,scope.$index)"
              >
                <template #reference>
                  <el-button
                      size="small"
                      type="danger">
                    删除
                  </el-button>
                </template>
              </el-popconfirm>
            </el-col>
            <el-col :span="6" >
              <el-button v-if="fileList[scope.$index].publication==true"
                         size="small"
                         type="primary"
                         plain
                         @click="submitPublication(scope.$index)"
              >
                已发布
              </el-button>
              <el-button v-if="fileList[scope.$index].publication==false"
                         size="small"
                         type="primary"
                         plain
                         @click="submitPublication(scope.$index)"
              >
                发布
              </el-button>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
    </el-table>
    <el-row justify="center" align="middle" style="width: 100%;">
      <el-col :span="24"
              style="display: flex;
              justify-content: center;
              align-items: center;
              width: 100%;">
        <el-upload
            :auto-upload="false"
            v-model:file-list="upLoadList"
            style="width: 100%;">
          <template #trigger>
            <el-row justify="center" style="width: 100%;">
              <el-col :span="24">
                <el-icon size="60px"><upload-filled /></el-icon>
              </el-col>
              <el-col :span="24">
                添加文件 <em style="color:rgb(72,175,217)">请点击这里</em>
              </el-col>
            </el-row>
          </template>
          <el-row>
            <el-col>
              <el-button size="small" type="success" @click="submitUpLoadList">上传全部文件</el-button>
            </el-col>
          </el-row>

        </el-upload>
      </el-col>
    </el-row>

  </div>


</template>

<script>
export default {
  name: "knowledgeChildList"
}
</script>
<script setup>
import {ref, reactive, onMounted} from "vue";
import { useRouter,useRoute } from 'vue-router';
import request from "../../../../http/request.js";
let router=useRouter();
let route=useRoute();
let folderName=route.query.folderName;
let folderAuthor=route.query.folderAuthor;
let fileList=ref();


let arrowUp=(scope,index, row)=>{
  let temp=fileList.value[index-1];
  fileList.value[index-1]=fileList.value[index];
  fileList.value[index]=temp;
}
let arrowDown=(scope,index, row)=>{
  let temp=fileList.value[index];
  fileList.value[index]=fileList.value[index+1];
  fileList.value[index+1]=temp;
}

let deleteFile=(scope,index)=>{
  console.log(index);
  let deleteFile=fileList.value[index];
  let folderName=deleteFile.folderName;
  let folderAuthor=deleteFile.folderAuthor;
  let fileName=deleteFile.fileName;
  request.delete("/home/knowledgeList/deleteFile",{
    data:{
      folderName:folderName,
      folderAuthor:folderAuthor,
      fileName:fileName
    }
  }).then(function (res){
    console.log('delete file success');
    fileList.value.splice(index,1);
  }).catch(function (error){
    console.log('delete file error')
  })
}
let upLoadList=ref();
let upLoadCollationList=ref();
upLoadCollationList.value=[];
let submitUpLoadList=()=>{
  console.log(upLoadList.value[0].raw.lastModifiedDate);
  for(let i=0;i<upLoadList.value.length;i++){
    let fileName=upLoadList.value[i].name;
    let fileSize=upLoadList.value[i].size;
    upLoadCollationList.value.push({
      folderName:folderName,
      folderAuthor:folderAuthor,
      fileName:fileName,
      fileSize:fileSize,
      publication:false
    });
  }
  request.post("/home/knowledgeList/upLoadFileList",{
    upLoadCollationList:upLoadCollationList.value
  }).then(res=>{
    for(let i=0;i<upLoadCollationList.value.length;i++){
      fileList.value.push({
        folderName:upLoadCollationList.value[i].folderName,
        folderAuthor:upLoadCollationList.value[i].folderAuthor,
        fileName:upLoadCollationList.value[i].fileName,
        fileSize:upLoadCollationList.value[i].fileSize,
        publication:upLoadCollationList.value[i].publication
      });
    }
    let oldLength=upLoadCollationList.value.length;
    upLoadCollationList.value.splice(0,oldLength);
    console.log("success upload file list");

  }).catch(err=>{});
  console.log(upLoadCollationList.value);
}


let roomList=ref();
let roomListCheck=ref();
let classroomList=ref();
let dialogVisible=ref(false);
let publicationItemIndex=0;
let submitPublication=(index)=>{
  dialogVisible.value=true;
  publicationItemIndex=index;

}
let term=ref();
let submitSelectClassroomAndPublication=()=>{
  request.post("/home/knowledgeList/publicateToClassroom",{
    folderName:folderName,
    fileName:fileList.value[publicationItemIndex].fileName,
    folderAuthor:folderAuthor,
    acadmey:'computer',
    term:term.value,
    roomList:roomListCheck.value,
    downLoadNumber:0
  }).then(res=>{
    console.log("res.data.publicationKnowledgeData");
    console.log(res.data.publicationKnowledgeData);
  }).catch(err=>{});
  dialogVisible.value=false;

  request.post("/home/knowledgeList/publication",{
    folderName:folderName,
    folderAuthor:folderAuthor,
    fileName:fileList.value[publicationItemIndex].fileName
  }).then(res=>{
    fileList.value[publicationItemIndex].publication=res.data.fileFilter[0].publication;;
  }).catch(err=>{});

}
let handleSelectTermCommand=(command)=>{
  term.value=command;
  request.get("/home/knowledgeList/room",{
    data:{
      folderAuthor:folderAuthor,
      acadmey:'computer',
      term:term.value
    }
  }).then(res=>{
    console.log(res.data);
    roomList.value=res.data.teacherRoomData;

  }).catch(err=>{});
  request.get("/home/knowledgeList/publicateRoomList",{
    data:{
      folderName:folderName,
      fileName:fileList.value[publicationItemIndex].fileName,
      folderAuthor:folderAuthor,
      acadmey:'computer',
      term:term.value
    }
  }).then(res=>{
    console.log(res.data);
    roomListCheck.value=res.data.publicationKnowledgeData;

  }).catch(err=>{});

}


let downLoad=(scope,index)=>{
  let folder=fileList.value[index];
  let folderAuthor=folder.folderAuthor;
  let fileName=folder.fileName;
  request.get("/home/knowledgeList/downLoadFile",{
    data:{
      folderName:folderName,
      folderAuthor:folderAuthor,
      fileName:fileName
    }
  }).then(res=>{
    console.log("downLoad file success");
    console.log(res.data);
  }).catch(error=>{
    console.log("downLoad file error");
  });
}

let createFiles=()=>{
  let folder=fileList.value[index];
  let folderAuthor=folder.folderAuthor;
  let fileName=folder.fileName;
  request.get("/home/knowledgeList/downLoadFile",{
    data:{
      folderName:folderName,
      folderAuthor:folderAuthor,
      fileName:fileName
    }
  }).then(res=>{
    console.log("downLoad file success");
    console.log(res.data);
  }).catch(error=>{
    console.log("downLoad file error");
  });
}




let form=reactive({
  inputSearch:''
});
let submitSearch=()=>{
  console.log("search folderName success");
  request.get("/home/knowledgeList/filterFile",{
    data:{
      folderName:folderName,
      folderAuthor:folderAuthor,
      fileName:form.inputSearch
    }
  }).then(res=>{
    fileList.value=res.data.knowledgeData;

    console.log("find file success");
    console.log(fileList.value);
  }).catch(error=>{
    console.log('find file error');
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

onMounted(() => {
  //调用方法
  request
      .get("/home/knowledgeList/knowledgeFileList", {
        data:{
          folderName: folderName,
          folderAuthor: folderAuthor
        }
      })
      .then(function(res) {
        if(res.data){
          console.log(res.data);
          fileList.value=res.data.data;
          console.log('get informationFileList success');
        }
      })
      .catch(function(error) {
        console.log('get informationFileList error');
      });
  request.get("/home/knowledgeList/classroom",{
    data:{
      folderAuthor:folderAuthor,
      acadmey:'computer'
    }
  }).then(function(res) {
    if(res.data){
      console.log(res.data.teacherClassroomData);
      classroomList.value=res.data.teacherClassroomData;
      console.log('get classroom success');
    }
  }).catch(function(error) {
        console.log('get classroom error');
      });

});

</script>

<style scoped>

</style>