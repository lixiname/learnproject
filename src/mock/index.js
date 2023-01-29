//const Mock = require('mockjs');
import Mock from 'mockjs';
import {list} from './informationKnowledgeList.js';
import {knowledgeFolderList,knowledgeFileList,classRoomList,teacherClassroom,publicationKnowledge,fileStudySituationList} from './informationKnowledgeList.js';
import {bookList,bookLikeList} from './bookList.js';
import Router from "../router";
// 设置拦截ajax请求的相应时间
Mock.setup({
    timeout: '200-600'
});

Mock.mock(/\/home\/knowledgeList\/classroom/,'get',function (options){
    let Obj = JSON.parse(options.body);
    let teacherName = Obj.folderAuthor;
    let acadmey = Obj.acadmey;
    let teacherClassroomFilter=teacherClassroom.filter(val =>val.teacherName === teacherName&&val.acadmey===acadmey);
    teacherClassroomFilter.sort(function (a, b) {
        return a.term-b.term;
    });
    let resultArr=[];
    resultArr[0] =teacherClassroomFilter[0];
    for (let i = 0; i < teacherClassroomFilter.length-1; i++) {
        if (teacherClassroomFilter[i].term !== teacherClassroomFilter[i+1].term) {
            resultArr[resultArr.length] =teacherClassroomFilter[i+1];
        }
    }
    return {
        code: '0',
        message: 'success',
        teacherClassroomData: resultArr
    }
});
Mock.mock(/\/home\/knowledgeList\/room/,'get',function (options){
    let Obj = JSON.parse(options.body);
    let teacherName = Obj.folderAuthor;
    let acadmey = Obj.acadmey;
    let term=Obj.term;
    let teacherRoomFilter=teacherClassroom.filter(val =>val.teacherName === teacherName&&val.acadmey===acadmey&&val.term===term);
    teacherRoomFilter.sort(function (a, b) {
        return a.room-b.room;
    });
    return {
        code: '0',
        message: 'success',
        teacherRoomData: teacherRoomFilter
    }
});

Mock.mock(/\/home\/knowledgeList\/publicateToClassroom/,'post',function (options){
    let Obj = JSON.parse(options.body);
    let folderName=Obj.folderName;
    let fileName=Obj.fileName;
    let teacherName = Obj.folderAuthor;
    let acadmey = Obj.acadmey;
    let term=Obj.term;
    let roomList=Obj.roomList;
    let downLoadNumber=Obj.downLoadNumber;
    let dateStart=Obj.dateStart;
    let dateEnd=Obj.dateEnd;
    let studyFileName=Obj.studyFileName;
    for(let i=0;i<roomList.length;i++){
        publicationKnowledge.push(
            {
                teacherName:teacherName,
                acadmey:acadmey,
                term:term,
                room:roomList[i],
                folderName:folderName,
                fileName:fileName,
                downLoadNumber:downLoadNumber,
                dateStart:dateStart,
                dateEnd:dateEnd,
                studyFileName:studyFileName
            }
        );
    }
    return {
        code: '0',
        message: 'success',
        publicationKnowledgeData: publicationKnowledge
    }
});

Mock.mock(/\/home\/knowledgeList\/publicateRoomList/,'get',function (options){
    let Obj = JSON.parse(options.body);
    let folderName=Obj.folderName;
    let fileName=Obj.fileName;
    let teacherName = Obj.folderAuthor;
    let acadmey = Obj.acadmey;
    let term=Obj.term;
    let publicationKnowledgeData=publicationKnowledge.filter(val =>val.folderName===folderName&&val.fileName===fileName&&
        val.teacherName === teacherName&&val.acadmey===acadmey&&val.term===term);
    let result=[];
    for(let i=0;i<publicationKnowledgeData.length;i++){
        let {room}=publicationKnowledgeData[i];
        result.push(room);
    }
    return {
        code: '0',
        message: 'success',
        publicationKnowledgeData: result
    }
});

Mock.mock(/\/home\/knowledgeList\/folder/,'get',list());
Mock.mock(/\/home\/knowledgeList\/filterFolder/,'get',function (options){
    let Obj = JSON.parse(options.body);
    let folderName = Obj.folderName;
    let folderAuthor = Obj.folderAuthor;
    let KnowledgeLists=knowledgeFolderList.filter(val => val.folderName === folderName&&val.folderAuthor===folderAuthor);
    return {
        code: '0',
        message: 'success',
        knowledgeData: KnowledgeLists
    }
});
Mock.mock(/\/home\/knowledgeList\/filterFile/,'get',function (options){
    let Obj = JSON.parse(options.body);
    let folderName = Obj.folderName;
    let folderAuthor = Obj.folderAuthor;
    let fileName=Obj.fileName;
    let KnowledgeLists=knowledgeFileList.filter(val => val.folderName === folderName&&val.folderAuthor===folderAuthor&&fileName===val.fileName);
    return {
        code: '0',
        message: 'success',
        knowledgeData: KnowledgeLists
    }
});
Mock.mock(/\/home\/knowledgeList\/deleteFolder/,'delete',function (options){
    let deleteObj = JSON.parse(options.body);
    let folderName = deleteObj.folderName;
    let folderAuthor = deleteObj.folderAuthor;
    let deleteKnowledgeLists=list().knowledgeData.filter(val => val.folderName !== folderName&&val.folderAuthor!==folderAuthor);
    return {
        code: '0',
        message: 'success',
        data: []
    }
});
Mock.mock(/\/home\/knowledgeList\/publication/,'post',function (options){
    let Obj = JSON.parse(options.body);
    let folderName = Obj.folderName;
    let folderAuthor = Obj.folderAuthor;
    let fileName=Obj.fileName;
    for(let i=0;i<knowledgeFileList.length;i++){
        if(knowledgeFileList[i].folderName === folderName&&knowledgeFileList[i].folderAuthor===folderAuthor&&knowledgeFileList[i].fileName===fileName)
            knowledgeFileList[i].publication=true;
    }
    let fileFilter=knowledgeFileList.filter(val=>val.folderName === folderName&&val.folderAuthor===folderAuthor&&val.fileName===fileName);
    return {
        code: '0',
        message: 'success',
        fileFilter: fileFilter
    }
});

Mock.mock(/\/home\/knowledgeList\/deleteFile/,'delete',function (options){
    let deleteObj = JSON.parse(options.body);
    let folderName = deleteObj.folderName;
    let folderAuthor = deleteObj.folderAuthor;
    let fileName = deleteObj.fileName;
    let deleteKnowledgeLists=knowledgeFileList.filter(val => val.folderName !== folderName&&val.folderAuthor!==folderAuthor&&val.fileName!==fileName);
    return {
        code: '0',
        message: 'success',
        data: deleteKnowledgeLists
    }
});
Mock.mock(/\/home\/knowledgeList\/upLoadFileList/,'post',function (options){
    let Obj = JSON.parse(options.body);
    let upLoadCollationList=Obj.upLoadCollationList;
    for(let i=0;i<upLoadCollationList.length;i++){
        knowledgeFileList.push({
            folderName:upLoadCollationList[i].folderName,
            folderAuthor:upLoadCollationList[i].folderAuthor,
            fileName:upLoadCollationList[i].fileName,
            fileSize:upLoadCollationList[i].fileSize,
            publication:upLoadCollationList[i].publication
        });
    }
    return {
        code: '0',
        message: 'success',
        data: []
    }
});
Mock.mock(/\/home\/knowledgeList\/downLoadList/,'get',function (options){
    let downLoadObj = JSON.parse(options.body);
    let folderName = downLoadObj.folderName;
    let folderAuthor = downLoadObj.folderAuthor;
    let knowledgeFileLists=knowledgeFileList.filter(val => val.folderName === folderName&&val.folderAuthor===folderAuthor);
    return {
        code: '0',
        message: 'success',
        data: knowledgeFileLists
    }
});
Mock.mock(/\/home\/knowledgeList\/downLoadFile/,'get',function (options){
    let downLoadObj = JSON.parse(options.body);
    let folderName = downLoadObj.folderName;
    let folderAuthor = downLoadObj.folderAuthor;
    let fileName=downLoadObj.fileName;
    let knowledgeFileLists=knowledgeFileList.filter(val => val.folderName === folderName&&val.folderAuthor===folderAuthor&&val.fileName===fileName);
    return {
        code: '0',
        message: 'success',
        data: knowledgeFileLists
    }
});
Mock.mock(/\/home\/knowledgeList\/knowledgeFileList/,'get',function (options){
    let downLoadObj = JSON.parse(options.body);
    let folderName = downLoadObj.folderName;
    let folderAuthor = downLoadObj.folderAuthor;
    let knowledgeFileLists=knowledgeFileList.filter(val => val.folderName === folderName&&val.folderAuthor===folderAuthor);
    return {
        code: '0',
        message: 'success',
        data: knowledgeFileLists
    }
});
Mock.mock(/\/home\/knowledgeList\/newFolder/,'post',function (options){
    let newFolder = JSON.parse(options.body);
    let folderName = newFolder.folderName;
    let folderAuthor = newFolder.folderAuthor;
    let fileNumber=newFolder.fileNumber;
    let createDate=newFolder.createDate;
    let knowledgeFileLists=knowledgeFolderList.push({
        folderName :folderName,
        folderAuthor :folderAuthor,
        fileNumber :fileNumber,
        createDate :createDate
    });
    return {
        code: '0',
        message: 'success',
        data: knowledgeFileLists
    }
});

Mock.mock(/\/home\/knowledgeList\/studySituation/,'get',function (options){
    let Obj = JSON.parse(options.body);
    let teacherName = Obj.folderAuthor;
    let acadmey = Obj.acadmey;
    let term=Obj.term;
    let room=Obj.room;
    let publicationKnowledgeData=publicationKnowledge.filter(val => val.teacherName === teacherName&&val.acadmey===acadmey&&val.term===term&&val.room==room);
    return {
        code: '0',
        message: 'success',
        publicationKnowledgeData: publicationKnowledgeData
    }
});
Mock.mock(/\/home\/knowledgeList\/fileStudySituationList/,'get',function (options){
    let Obj = JSON.parse(options.body);
    let teacherName = Obj.teacherName;
    let acadmey = Obj.acadmey;
    let term=Obj.term;
    let room=Obj.room;
    let studyFileName=Obj.studyFileName;
    let fileStudySituationLists=fileStudySituationList.filter(val => val.teacherName === teacherName&&val.acadmey===acadmey&&
        val.term===term&&val.room==room&&val.studyFileName==studyFileName);
    return {
        code: '0',
        message: 'success',
        fileStudySituationList: fileStudySituationLists
    }
});

//book
Mock.mock(/\/home\/book\/AllBooksList/,'get',function (options){
    console.log('think');
    console.log(options);
    return {
        code: '0',
        message: 'success',
        bookList: bookList
    }
});
Mock.mock(/\/home\/book\/bookDetail/,'get',function (options){
    let Obj = JSON.parse(options.body);
    let bookName=Obj.bookName;
    let publicateUserNameID=Obj.publicateUserNameID;
    let book=bookList.filter(val => val.bookName == bookName&&val.publicateUserNameID==publicateUserNameID);
    let onebook=book[0];
    return {
        code: '0',
        message: 'success',
        book: onebook
    }
});
Mock.mock(/\/home\/book\/teacherAgreed/,'get',function (options){
    let Obj = JSON.parse(options.body);
    let bookName=Obj.bookName;
    let publicateUserNameID=Obj.publicateUserNameID;
    let userID=Obj.userID;
    let book=bookLikeList.filter(val => val.bookName == bookName&&val.publicateUserNameID==publicateUserNameID&&val.likeNameID==userID);
    return {
        code: '0',
        message: 'success',
        book: book
    }
});



Mock.mock(/\/home\/book\/deleteBook/,'delete',function (options){
    let deleteObj = JSON.parse(options.body);
    let bookName = deleteObj.bookName;
    let publicateUserNameID = deleteObj.publicateUserNameID;
    let deleteBookLists=bookList.filter(val => val.bookName !== bookName&&val.publicateUserNameID!==publicateUserNameID);
    return {
        code: '0',
        message: 'success',
        data: deleteBookLists
    }
});













// let configArray = [];
//
// // 使用webpack的require.context()遍历所有mock文件
// const files = require.context('.', true, /\.js$/);
// files.keys().forEach((key) => {
//     if (key === './index.js') return;
//     configArray = configArray.concat(files(key).default);
// });
//
// // 注册所有的mock服务
// configArray.forEach((item) => {
//     for (let [path, target] of Object.entries(item)) {
//         let protocol = path.split('|');
//         Mock.mock(new RegExp('^' + protocol[1]), protocol[0], target);
//     }
// });
export default Mock;