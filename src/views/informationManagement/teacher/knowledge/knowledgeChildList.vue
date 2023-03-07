<template>
  <div style="height: 100%;">
    <div v-if="visible==true">
      <el-alert
          title="早已提交过请勿重复提交"
          type="warning"
          show-icon>
      </el-alert>
    </div>
    <el-dialog
        v-model="dialogVisible"
        width="30%"
        style="height: 40%"
    >
      <el-card>
        <template #header>
          发布信息
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
        <span >选择时间段</span>
        <el-date-picker
            v-model="timeRange"
            type="datetimerange"
            range-separator="到"
            start-placeholder="开始时间"
            end-placeholder="截止时间"
        />

        <el-input v-model="studyFileName" placeholder="为发布的内容起名">
        </el-input>
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
                      type="danger"
                  disabled>
                    删除
                  </el-button>
                </template>
              </el-popconfirm>
            </el-col>
            <el-col :span="6" >
              <el-button v-if="fileList[scope.$index].publication==1"
                         size="small"
                         type="primary"
                         plain
                         @click="submitPublication(scope.$index)"
              >
                已发布
              </el-button>
              <el-button v-if="fileList[scope.$index].publication==0"
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
            :limit="1"
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
import {getTokenN, getTokenID, getTokenIdentity, getDateTime} from "../../../../utils/auth";
import {teacherClassroom} from "../../../../mock/informationKnowledgeList";
let router=useRouter();
let route=useRoute();
let folderName=route.query.folderName;
let folderAuthor=route.query.folderAuthor;
let teacherID=route.query.teacherID;

let fileList=ref();
fileList.value=[];

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
  });
}
let upLoadList=ref();
upLoadList.value=[];
let upLoadCollationList=ref();
upLoadCollationList.value=[];
let submitUpLoadList=()=>{

  let idcard=getTokenID();
  let Name=getTokenN();
  let identity=getTokenIdentity();
  let datetime = getDateTime();
  console.log('uploadlist:');
  console.log(upLoadList.value);
  for(let i=0;i<upLoadList.value.length;i++){
    let fileName=upLoadList.value[i].name;
    let fileSize=upLoadList.value[i].size;
    upLoadCollationList.value.push({
      folderName:folderName,
      teacherID:idcard,
      folderAuthor:Name,
      fileName:fileName,
      fileSize:fileSize,
      createDate:datetime,
      publication:0
    });
  }
  //mock home/knowledgeList/upLoadFileList
  console.log("repeat upload file list");
  request.post("/home/knowledgeList/upLoadOneFile",{
    folderName:folderName,
    teacherID:idcard,
    folderAuthor:Name,
    fileName:upLoadCollationList.value[0].fileName,
    fileSize:1,
    createDate:datetime,
    publication:0
  }).then(res=>{
    if(res.data=='success'){
      console.log("success upload file list");
      for(let i=0;i<upLoadCollationList.value.length;i++){
        fileList.value.push({
          folderName:upLoadCollationList.value[i].folderName,
          folderAuthor:upLoadCollationList.value[i].folderAuthor,
          fileName:upLoadCollationList.value[i].fileName,
          fileSize:1,
          publication:upLoadCollationList.value[i].publication
        });
      }
    }
    else if(res.data=='notSuccess'){
      console.log("repeat upload file list");
    }
    let oldLength=upLoadCollationList.value.length;
    upLoadCollationList.value.splice(0,oldLength);
    upLoadList.value.splice(0,oldLength);
    console.log(upLoadCollationList.value);
    console.log(res.data);

  }).catch(err=>{});
  console.log("failed upload file list");
}


let roomList=ref();
roomList.value=[];
let roomListCheck=ref();
roomListCheck.value=[];
let classroomList=ref();
classroomList.value=[];
let dialogVisible=ref(false);
let publicationItemIndex=0;
let visible=ref(false);
const timeRange = ref([
  new Date(2000, 10, 10, 10, 10),
  new Date(2000, 10, 11, 10, 10),
])

let submitPublication=(index)=>{
  //默认学习和file两者一样名字
  studyFileName.value=fileList.value[index].fileName;
  if(fileList.value[index].publication==0){
    dialogVisible.value=true;
    visible.value=false;
  }
  else{
    console.log('exist this tuple');
    visible.value=true;
  }
  publicationItemIndex=index;

}

let term=ref();
let studyFileName=ref();
let submitSelectClassroomAndPublication=()=>{
  let idcard=getTokenID();
  let Name=getTokenN();
  let identity=getTokenIdentity();
  let datetime = getDateTime();
  console.log("选择完了");
  console.log(roomListCheck);

  roomListCheck.value.forEach(function (element){
    //mock home/knowledgeList/publicateToClassroom
    request.post("/home/knowledgeList/publicateToOneClassroom",{
      teacherID:idcard,
      studyFileName:studyFileName.value,
      major:'大数据',
      term:term.value,
      room:element,
      teacherName:Name,
      acadmey:'计算机',
      folderName:folderName,
      fileName:fileList.value[publicationItemIndex].fileName,
      downLoadNumber:0,
      dateStart:'2022-11-13 10:10:12',
      dateEnd:'2022-11-17 10:10:12',

    }).then(res=>{
      if(res.data=="success"){
        dialogVisible.value=true;
        content.value="成功上传";
        console.log("success add ");
        //console.log(res.data.publicationKnowledgeData);
      }
      else if(res.data=="successNot"){
        dialogVisible.value=true;
        content.value="不要重复上传相同内容";
        console.log("重复 add same ");
      }
      else
        console.log("3 error 其他错误");



  }).catch(err=>{});
  });
  dialogVisible.value=false;

  // request.post("/home/knowledgeList/publication",{
  //   folderName:folderName,
  //   folderAuthor:folderAuthor,
  //   fileName:fileList.value[publicationItemIndex].fileName
  // }).then(res=>{
  //   fileList.value[publicationItemIndex].publication=res.data.fileFilter[0].publication;;
  // }).catch(err=>{});

}

let handleSelectTermCommand=(command)=>{
  term.value=command;
  let idcard=getTokenID();
  getTokenN();
  //mock /home/knowledgeList/room
  request.get("/home/knowledgeList/oneTermRooms",{
    params:{
      idcard:idcard,
      acadmey:'computer',
      term:term.value
    }
  }).then(res=>{
    if(res.data){
      roomList.value=[];
      res.data.forEach(function (element){
        console.log(element);
        roomList.value.push({
          room:element.room,
        });
      });
      //roomList.value=res.data.teacherRoomData;
      console.log(roomList.value);
    }
  }).catch(err=>{});

  let fileName=fileList.value[publicationItemIndex].fileName;
  request.get("/home/knowledgeList/publicateRoomList",{
    params:{
      teacherID:idcard,
      studyFileName:fileName,
      major:'大数据',
      term:term.value
    }
  }).then(res=>{
    console.log("已经选择过了");
    console.log(res.data);
    if(res.data){
      roomListCheck.value=[];
      res.data.forEach(function (element){
        console.log(element);
        roomListCheck.value.push(element.room);
      });
      console.log("初始化的roomListCheck");
      console.log(roomListCheck.value);
      //roomListCheck.value=res.data.publicationKnowledgeData;
    }
  }).catch(err=>{});

}


let downLoad=(scope,index)=>{
  let folder=fileList.value[index];
  let folderAuthor=folder.folderAuthor;
  let fileName=folder.fileName;
  let teacherID=folder.teacherID;

  //mock home/knowledgeList/downLoadFile
  request.get("/home/knowledgeList/downOneFile",{
    params:{
      folderName:folderName,
      idcard:teacherID,
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
  //mock home/knowledgeList/knowledgeFileList
  //调用方法
  let idcard=getTokenID();
  request
      .get("/home/knowledgeList/knowledgeFileList", {
        params:{
          folderName: folderName,
          idcard: teacherID
        }
      })
      .then(function(res) {
        if(res.data){
          console.log(res.data);
          res.data.forEach(function (element){
            fileList.value.push({
              folderName:element.folderName,
              teacherID:element.teacherID,
              folderAuthor:element.folderAuthor,
              fileName:element.fileName,
              fileSize:element.fileSize,
              createDate:element.createDate,
              publication:element.publication
            });
          });
          //fileList.value=res.data.data;
          console.log('get informationFileList success');
        }
      })
      .catch(function(error) {
        console.log('get informationFileList error');
      });

  request.get("/home/knowledgeList/classroom",{
    params:{
      idcard:idcard,
      acadmey:'计算机'
    }
  }).then(function(res) {
    if(res.data){
      res.data.sort(function (a, b) {
        return a.term-b.term;
      });
      //[0]
      classroomList.value.push({
        teacherID:res.data[0].teacherID,
        teacherName:res.data[0].teacherName,
        acadmey:res.data[0].acadmey,
        major:res.data[0].major,
        term:res.data[0].term,
        room:res.data[0].room
      });
      //[1..n]
      for (let i = 0; i < res.data.length-1; i++) {
        if (res.data[i].term !== res.data[i+1].term) {
          classroomList.value.push({
            teacherID:res.data[i+1].teacherID,
            teacherName:res.data[i+1].teacherName,
            acadmey:res.data[i+1].acadmey,
            major:res.data[i+1].major,
            term:res.data[i+1].term,
            room:res.data[i+1].room
          });
        }
      }
      //classroomList.value=res.data.teacherClassroomData;
      console.log('get classroom success');
    }
  }).catch(function(error) {
        console.log('get classroom error');
      });

});

</script>

<style scoped>

</style>