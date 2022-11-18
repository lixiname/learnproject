<template>
  <el-row justify="center">
    <el-col :span="15">
      <el-card>
        <template #header>
          <div>
            <span>PDF书籍信息</span>
          </div>
        </template>
        <div>
          <el-descriptions :border="true" :column="1">
            <el-descriptions-item >
              <template #label>
                <div>
                  <el-icon><Notebook /></el-icon>
                  书名
                </div>
              </template>
              数学
            </el-descriptions-item>
            <el-descriptions-item >
              <template #label>
                <div>
                  <el-icon><Bottom /></el-icon>
                  下载数量
                </div>
              </template>
              120
            </el-descriptions-item>
            <el-descriptions-item >
              <template #label>
                <div>
                  <el-icon><Memo /></el-icon>
                  ISBN
                </div>
              </template>
              xss
            </el-descriptions-item>
          </el-descriptions>
        </div>
        <el-row justify="center">
          <el-col :span="5">
            <el-button >修改</el-button>
          </el-col>
        </el-row>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "bookAdd"
}
</script>
<script setup>
import {ref, reactive, onMounted} from "vue";
let vs=ref(false);
</script>

<style scoped>

</style>