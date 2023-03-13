# 项目名learnProject

This project is a study management system.
___
**该管理系统是前后端分离的单页面程序，分为前端的vue和后端的springboot两部分，前端vue只负责页面切换，后端只负责数据的处理和响应**

技术栈中前端使用**javascript** + 后端使用**java**语言编写，数据库主要采用**mysql**.
___
## 环境Configuration
___
**vue3前端依赖**

`npm install element-plus`<br>
ui组件库

`npm install echarts`<br>
图表库

`npm install downloadjs`<br>
前端下载pdf插件
___
**springboot后端依赖**

`junit、redis、lettuce、mybatis、elasticsearch`<br>
单元测试、存token的redis库、redis的lettuce封装、负责元组和实体映射的mybatis、查询组件elasticsearch，这些依赖都采用maven安装和管理
___
## 项目功能描述

用户类型**学生**、**老师**和**管理员**三种
___
**学生用户**包括以下四大功能：<br>
图书管理、资料管理、作业管理、用户管理。前端总体功能页面如下图1-1所示

![这是图片](/src/assets/img/std-summary.png "std-summary")
图1-1

四大功能描述如下：<br>
1 图书管理功能允许**学生用户**搜索、查看、点赞和下载由**其他用户**上传的并且已经通过**管理员**审核的书籍。<br>
**学生用户**也可以上传想要分享的书籍，但上传的书籍只有通过审核后才能被**其他用户**检索到

2 资料管理功能允许**学生用户**搜索、查看和下载由**老师用户**发布的资料。

3 作业管理功能允许**学生用户**查看由**老师用户**发布的作业。<br>
**学生用户**可以就**老师用户**发布的作业进行完成，并且**学生用户**可以按作业截止日期对作业进行排序查看，以安排完成作业的计划。

4 用户管理功能允许**学生用户**查看个人资料并对密码进行修改。<br>
**学生用户**也可以在这里查看自己曾上传过哪些书籍。

5 **学生用户**可以查看主页，了解发布的新资讯，如下图1-2所示。

![这是图片](/src/assets/img/std-home.png "std-home")
图1-2
___








