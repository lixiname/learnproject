import Mock from 'mockjs'
let bookList=[
    {
        bookName:'C#经典实例',
        author:'Jay Hilyard Stephen',
        bookType:'编程',
        publisher:'人民邮电出版社',
        downloadAmount:10,
        ISBN:'978711116560',
        agreedNum:2,
        publicateUserNameID:'2021232235',
        publicateUserName:'lixin',
        nickname:'圆滚滚',
        publicateTime:'2020-11-12',
    },
    {
        bookName:'Spring Boot实战',
        author:'Jay Hilyard Stephen',
        bookType:'编程',
        publisher:'人民邮电出版社',
        downloadAmount:10,
        ISBN:'978711116561',
        agreedNum:0,
        publicateUserNameID:'2021232235',
        publicateUserName:'lixin',
        nickname:'圆滚滚',
        publicateTime:'2020-11-12',
    },
    {
        bookName:'TensorFlow深度学习',
        author:'Jay Hilyard Stephen',
        bookType:'编程',
        publisher:'人民邮电出版社',
        downloadAmount:10,
        ISBN:'978711116562',
        agreedNum:0,
        publicateUserNameID:'2020232214',
        publicateUserName:'zhangxin',
        nickname:'指间流沙',
        publicateTime:'2020-11-12',
    }
];

let bookLikeList=[
    {
        bookName:'C#经典实例',
        publicateUserNameID:'2021232235',
        likeNameID:'chen',
        likeName:'不圆滚古',
        time:'2022-10-13'
    },
    {
        bookName:'TensorFlow深度学习',
        publicateUserNameID:'2020232214',
        likeNameID:'chen',
        likeName:'不圆滚古',
        time:'2022-10-13'
    }
];









export {bookList,bookLikeList}