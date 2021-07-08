<template>
  <div class="qqq">
    <h1>Настроить заявку</h1>
    <el-col>
      <el-card class="box-card" shadow="always">
        <div slot="header" class="clearfix">
          <span>Card name</span>
          <el-button style="float: right; padding: 3px 0" type="text">Operation button</el-button>
        </div>
        <div v-for="(part, key) in project" :key="{key}">
          {{ key }} , {{ part }}
        </div>

        <!-- <slot v-for="part in project" :name="part">{{part}}</slot> -->
      </el-card>
    </el-col>
  </div>
</template>

<script>
export default {
  computed: {
    // parrentId() {
    //   return this.props?.id
    // }
  },
  data() {
    return {
      project: {
        id: 123,
        design: [],
        front: [],
        backend: [],
        teamLead: [],
        analyst: [],
        architect: [],
      },
    };
  },
};
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