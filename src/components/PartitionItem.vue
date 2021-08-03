<template>
  <el-card class="box-card" shadow="hover">
    <div slot="header" class="clearfix">
      <span>Раздел {{ part.name }}</span>
      <el-button style="float: right; padding: 3px 0" type="text">
        Меню раздела
      </el-button>
      <el-button
        style="float: right; margin-right: 10px; padding: 3px 0; color: salmon"
        type="text"
        @click="$emit('delete-partition', part.id)"
      >
        Удалить
      </el-button>
    </div>
    <el-table :data="part.employers" style="width: 100%">
      <el-table-column prop="id" label="id" width="180"> </el-table-column>
      <el-table-column prop="employers" label="Name" width="180">
      </el-table-column>
      <el-table-column prop="type" label="type"> </el-table-column>
      <el-table-column prop="hours" label="hours"> </el-table-column>
      <el-table-column prop="id" label="actions">
        <el-button>Удалить</el-button>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  name: "PartitionItem",
  props: {
    part: {
      type: Object,
      default: {},
    },
  },
  methods: {
    updatePartition(id) {},
  },
};
</script>

<style lang="scss" scoped>
</style>