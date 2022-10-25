<template>
  <div>
    <el-row justify="center" align="middle">
      <el-col :span="12">
        <el-timeline>
          <el-timeline-item
              v-for="(object,index) in homeworkTimeArray"
              :timestamp="object.time"  placement="top"
              :key="index"
          >
            <el-card shadow="hover">
              <el-row justify="space-between" align="middle">
                <el-col :span="21">
                  <h4>{{object.content}}</h4>
                  <el-descriptions>
                    <el-descriptions-item label="发布时间">
                      {{object.time}}
                    </el-descriptions-item>
                  </el-descriptions>
                </el-col>
                <el-col :span="3">
                  <el-button size="small" :plain="true" type="info">详情</el-button>
                </el-col>
              </el-row>
              <el-row justify="center">
                <el-col :span="20">
                  <el-button size="small" :plain="true" type="primary" style="width: 100%">去完成</el-button>
                </el-col>
              </el-row>

            </el-card>
          </el-timeline-item>

        </el-timeline>
      </el-col>
    </el-row>

  </div>

</template>

<script>
export default {
  name: "homeworkTime",
  data(){
    return{
      homeworkTimeArray:[
        {
          content:'数学',
          time:'2022-10-14'
        },
        {
          content:'英语',
          time:'2022-10-13'
        },
        {
          content:'java',
          time:'2022-10-11'
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>