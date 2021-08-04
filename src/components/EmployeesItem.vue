<template>
  <el-table :data="employees" style="width: 100%" :row-key="employees.id">
    <div class="qqqq" slot="empty">Добавьте исполнителя</div>
    <el-table-column prop="id" label="id" width="180"> </el-table-column>
    <el-table-column prop="name" label="Name" width="180"> </el-table-column>
    <el-table-column prop="type" label="type"> </el-table-column>
    <el-table-column prop="hours" label="hours">
      <template slot-scope="hours">
        <el-button @click="$emit('on-toggle')" v-if="!isEditing">
          <span>{{ description }}</span>
        </el-button>
        <form v-else class="flex-grow-1" @submit.prevent="finishEditing()">
          <input
            type="text"
            class="form-control"
            v-model="newTodoDescription"
            @blur="finishEditing()"
            ref="newTodo"
          />
        </form>
        <el-button
          @click="$emit('delete-employee', [partitionIndex, hours.$index])"
          >Delete</el-button
        >
      </template>
    </el-table-column>
    <el-table-column prop="id" label="actions">
      <template slot-scope="scope">
        <el-button
          @click="$emit('delete-employee', [partitionIndex, scope.$index])"
          >Delete</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: "EmployeesItem",
  props: {
    employees: {
      type: Array,
    },
    partitionIndex: {
      type: Number,
    },
  },
};
</script>

<style lang="scss" scoped>
</style>