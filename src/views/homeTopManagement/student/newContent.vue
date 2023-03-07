<template>
  <el-row justify="center">
    <el-col :span="16">
      <el-card >
        <div>
          <el-row justify="center" style="font-size: 25px">
            <el-col :span="10">{{newTitle}}</el-col>
          </el-row>
        </div>
        <div class="new-border">
          <el-row justify="center" class="new-time-department" >
            <el-col :span="4" >
              <span>{{time}}</span>
            </el-col>
            <el-col :span="8" class="new-time-department">
              <span >发布单位:{{department}}</span>
            </el-col>
          </el-row>
          <el-row justify="center" style="height: 300px">
            <el-col :span="18"  >
              <el-empty description="暂无资源" />
            </el-col>
          </el-row>
        </div>




      </el-card>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "newContent"
}
</script>
<script setup>
import { useRoute } from 'vue-router';
let route=useRoute();
let newTitle=route.query.newTitle;

let time=route.query.times;
let department='计算机学院';

</script>
<style scoped>
.new-border{
  border-style:solid;
  border-width:1px;
  border-color:black;
}
.new-time-department{
  background-color: rgb(228,228,228);
  color: rgb(153,153,153);
}
</style>