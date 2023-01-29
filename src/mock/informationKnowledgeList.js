import Mock from 'mockjs'
let knowledgeList=Mock.mock({
    'data|10':[{
        fileName: '@id',
        author: '@cname',
        fileSize:'1k',
        createDate:'@date'
    }]
});
let knowledgeFolderList=[
    {
        folderName: '123',
        teacherID:'20212232145',
        folderAuthor: 'chen',
        fileNumber:2,
        createDate:'2022-5'
    },
    {
        folderName: '极限',
        teacherID:'20212232145',
        folderAuthor: 'chen',
        fileNumber:0,
        createDate:'2022-6'
    },
    {
        folderName: '导数',
        teacherID:'20212232145',
        folderAuthor: 'chen',
        fileNumber:0,
        createDate:'2022-5'
    },
    {
        folderName: '微分',
        teacherID:'20212232145',
        folderAuthor: 'chen',
        fileNumber:0,
        createDate:'2022-6'
    },
];
let knowledgeFileList=[
    {
        folderName:'123',
        teacherID:'20212232145',
        folderAuthor:'chen',
        fileName:'第一个文件',
        fileSize:'1k',
        createDate:'2022-11',
        publication:true
    },
    {
        folderName:'123',
        teacherID:'20212232145',
        folderAuthor:'chen',
        fileName:'第二个文件',
        fileSize:'1k',
        createDate:'2022-11',
        publication:false
    },
];
let classRoomList=[
    {
        acadmey:'computer',
        major:'大数据',
        term:'2020',
        room:'1'

    },
    {
        acadmey:'computer',
        major:'大数据',
        term:'2020',
        room:'2'

    },
    {
        acadmey:'computer',
        major:'大数据',
        term:'2020',
        room:'3'

    },
    {
        acadmey:'computer',
        major:'大数据',
        term:'2021',
        room:'1'

    },
    {
        acadmey:'computer',
        major:'大数据',
        term:'2022',
        room:'2'

    },

];
let teacherClassroom=[
    {
        teacherID:'20212232145',
        teacherName:'chen',
        acadmey:'computer',
        major:'大数据',
        term:'2020',
        room:'1'

    },
    {
        teacherID:'20212232145',
        teacherName:'chen',
        acadmey:'computer',
        major:'大数据',
        term:'2022',
        room:'2'

    },
    {
        teacherID:'20212232145',
        teacherName:'chen',
        acadmey:'computer',
        major:'大数据',
        term:'2020',
        room:'3'

    },
    {
        teacherID:'20212232145',
        teacherName:'chen',
        acadmey:'computer',
        major:'大数据',
        term:'2020',
        room:'2'

    },
    {
        teacherID:'20212232145',
        teacherName:'chen',
        acadmey:'computer',
        major:'大数据',
        term:'2021',
        room:'1'

    },
];
let publicationKnowledge=[
    {
        teacherID:'20212232145',
        studyFileName:'fole',
        teacherName:'chen',
        acadmey:'computer',
        major:'大数据',
        term:'2020',
        room:'1',
        folderName:'123',
        fileName:'zhenbucuo',
        downLoadNumber:20,
        dateStart:'2022-9-10',
        dateEnd:'2022-9-15'

    },
];
let fileStudySituationList=[
    {
        teacherID:'20212232145',
        studyFileName:'fole',
        studentID:'20202232101',
        acadmey:'computer',
        major:'大数据',
        term:'2020',
        room:'1',
        teacherName:'chen',
        studentName:'王全',
        completed:'good'

    },
    {
        teacherID:'20212232145',
        studyFileName:'fole',
        studentID:'20202232102',
        acadmey:'computer',
        major:'大数据',
        term:'2020',
        room:'1',
        teacherName:'chen',
        studentName:'王乡宁',
        completed:'bad'

    },
    {
        teacherID:'20212232145',
        teacherName:'chen',
        acadmey:'computer',
        major:'大数据',
        studyFileName:'fole',
        term:'2020',
        room:'1',
        studentName:'程美玲',
        studentID:'20202232107',
        completed:'good'

    },
    {
        teacherID:'20212232145',
        teacherName:'chen',
        acadmey:'computer',
        major:'大数据',
        studyFileName:'fole',
        term:'2020',
        room:'1',
        studentName:'程美玲',
        studentID:'20202232107',
        completed:'bad'

    },
    {
        teacherID:'20212232145',
        teacherName:'chen',
        acadmey:'computer',
        major:'大数据',
        studyFileName:'fole',
        term:'2020',
        room:'1',
        studentName:'王敏',
        studentID:'20202232106',
        completed:'good'

    },
    {
        teacherID:'20212232145',
        teacherName:'chen',
        acadmey:'computer',
        major:'大数据',
        studyFileName:'fole',
        term:'2020',
        room:'1',
        studentName:'董强山',
        studentID:'20202232110',
        completed:'bad'

    },
];
function list(res){
    return{
        code:200,
        message:'success',
        knowledgeData:knowledgeFolderList
    }
};
export {knowledgeFolderList,list,knowledgeFileList,classRoomList,teacherClassroom,publicationKnowledge,fileStudySituationList}
