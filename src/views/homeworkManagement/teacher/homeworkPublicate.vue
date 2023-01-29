<template>
  <el-row justify="center">
    <el-col :span="15">
      <el-card>
        <template #header>
          <div>
            <span>上传题目</span>
          </div>
        </template>
        <div>
          <el-dropdown @command="handleSelectTermCommand">
            <el-button>
              选择知识点种类<el-icon ><arrow-down /></el-icon>
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <div v-for="item in classroomList">
                  <el-dropdown-item :command="item.term">{{item.term}}级</el-dropdown-item>
                </div>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <el-dropdown @command="handleSelectTermCommand">
            <el-button>
              选择题型年份<el-icon ><arrow-down /></el-icon>
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <div v-for="item in classroomList">
                  <el-dropdown-item :command="item.term">{{item.term}}级</el-dropdown-item>
                </div>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <div></div>
          <el-form  label-position="right">
            <el-form-item label="填写题干要求">
              <el-input v-model="title" placeholder="例如假设f(x)是偶函数这样的描述内容"  type="textarea">
                <template #prefix>
                  <el-icon><Document /></el-icon>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item label="设置选项">
              <el-icon><CirclePlusFilled /></el-icon>
              <el-icon><RemoveFilled /></el-icon>
            </el-form-item>
            <el-form-item label="A">
              <el-input v-model="title" placeholder="填写答案描述"  >
                <template #prefix>
                  <el-icon><Document /></el-icon>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item label="B">
              <el-input v-model="title" placeholder="填写答案描述"  >
                <template #prefix>
                  <el-icon><Document /></el-icon>
                </template>
              </el-input>
            </el-form-item>
            <el-button
                type="primary"
                class="loginBtn"
                @click="login"
            >
              提交
            </el-button>
          </el-form>

        </div>
      </el-card>
    </el-col>
  </el-row>


</template>

<script>
export default {
  name: "homeworkPublicate"
}
</script>
<script setup>
import {ref, reactive, onMounted} from "vue";
import { useRouter,useRoute } from 'vue-router';
let title=ref();


</script>

<style scoped>

</style>