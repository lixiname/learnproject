<template>
  <el-row justify="center">
    <el-col :span="18" style="width: 100%">
      <el-form label-position="top">
        <el-form-item>
          <template #label>
            第一题
          </template>
          <el-input type="textarea" v-model="content">
          </el-input>
          <el-input type="file" v-model="content">
          </el-input>
        </el-form-item>

      </el-form>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "processHomework",
  data(){
    return{
      content:''
    }
  }
}
</script>

<style scoped>

</style>