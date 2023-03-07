<template>
  <el-row justify="center">
    <el-col :span="16">
      <el-card >
        <el-carousel height="400px" style="background-color: rgb(228,228,228)">
          <el-carousel-item v-for="item in imageList" :key="item" >
            <el-row justify="center">
              <el-col>
                <el-image fit="contain" :src="item.url"></el-image>
              </el-col>
            </el-row>
          </el-carousel-item>
        </el-carousel>
        <div class="new-border">
          <el-row justify="space-around" style="background-color:cornflowerblue" class="new-title-font">
            <el-col :span="18" >
              <el-icon><ChatDotRound /></el-icon>
              <span>校内新闻</span>
            </el-col>
            <el-col :span="4" style="background-color: cornflowerblue">
              <div >更多资讯</div>
            </el-col>
          </el-row>
          <el-row justify="space-around" v-for="items in newList" class="new-item-border" :key="items" @click="openNewItem(items)" >
            <el-col :span="18"  >
              <el-icon><ArrowLeftBold /></el-icon>
              {{items.title}}
            </el-col>
            <el-col :span="4">
              2023-3-1
            </el-col>
          </el-row>
        </div>




      </el-card>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "schoolNewStd"
}
</script>

<script setup>
import { useRouter } from 'vue-router';
import {ref} from "vue";

let router=useRouter();

let newList=ref();
newList.value=[
  { title:'第1条资讯的内容待定'},
  { title:'第2条资讯的内容待定'},
  { title:'第3条资讯的内容待定'},
  { title:'第4条资讯的内容待定'},
  { title:'第5条资讯的内容待定'},
];

let imageList=[
  {url:'/public/1.jpeg'},
  {url:'/public/2.jpeg'},
  {url:'/public/3.jpeg'},
  {url:'/public/4.jpeg'}
];

let openNewItem=(items)=>{
  router.push({path:'/home/newContent',
    query:{
      newTitle:items.title,
      times:'2023-3-1'
    }});
}

</script>
<style scoped>
.new-item-border{
  border-style:dashed;
  border-width:2px;
  border-color:silver;
  border-radius: 30px;
  margin:25px;
}
.new-border{
  border-style:solid;
  border-width:1px;
  border-color:black;
}
.new-title-font{
  font-size:25px;
  color: white;
}

</style>