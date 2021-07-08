<template>
  <el-col :span="8">
    <el-card shadow="hover"> 
      <slot name="title"></slot>
      <slot></slot>
    </el-card>
  </el-col>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.el-col {
  border-radius: 4px;
  margin-top: 20px;
  &:last-child {
    margin-bottom: 20px;
  }
}
</style>