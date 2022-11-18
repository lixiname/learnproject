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
        folderAuthor: 'xw',
        fileNumber:2,
        createDate:'2022-1'
    },
    {
        folderName: '1',
        folderAuthor: 'xw',
        fileNumber:0,
        createDate:'2022-1'
    },
    {
        folderName: '123456',
        folderAuthor: 'cwzzz',
        fileNumber:0,
        createDate:'2022-1'
    },
    {
        folderName: '123123',
        folderAuthor: 'lwx',
        fileNumber:0,
        createDate:'2022-1'
    },
];
let knowledgeFileList=[
    {
        folderName:'123',
        folderAuthor:'xw',
        fileName:'zhenbucuo',
        fileSize:'1k',
        createDate:'2022-11',
        publication:false
    },
    {
        folderName:'123',
        folderAuthor:'xw',
        fileName:'zhen',
        fileSize:'1k',
        createDate:'2022-11',
        publication:false
    },
];
let classRoomList=[
    {
        acadmey:'computer',
        term:'2022',
        room:'1'

    },
    {
        acadmey:'computer',
        term:'2022',
        room:'3'

    },
    {
        acadmey:'computer',
        term:'2021',
        room:'1'

    },
    {
        acadmey:'computer',
        term:'2022',
        room:'2'

    },

];
let teacherClassroom=[
    {
        teacherName:'xw',
        acadmey:'computer',
        term:'2022',
        room:'1'

    },
    {
        teacherName:'xw',
        acadmey:'computer',
        term:'2022',
        room:'2'

    },
    {
        teacherName:'xw',
        acadmey:'computer',
        term:'2022',
        room:'3'

    },
    {
        teacherName:'xw',
        acadmey:'computer',
        term:'2021',
        room:'1'

    },
    {
        teacherName:'xz',
        acadmey:'computer',
        term:'2021',
        room:'2'

    },
];
let publicationKnowledge=[
    {
        teacherName:'xw',
        acadmey:'computer',
        term:'2022',
        room:'1',
        folderName:'123',
        fileName:'zhenbucuo',
        downLoadNumber:20
    },
];
function list(res){
    return{
        code:200,
        message:'success',
        knowledgeData:knowledgeFolderList
    }
};
export {knowledgeFolderList,list,knowledgeFileList,classRoomList,teacherClassroom,publicationKnowledge}
