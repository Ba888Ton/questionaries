<template>
  <el-table :data="employees" style="width: 100%">
    <div class="qqqq" slot="empty">Добавьте исполнителя</div>
    <el-table-column prop="id" label="id" width="180"> </el-table-column>
    <el-table-column prop="name" label="Name" width="180"> </el-table-column>
    <el-table-column prop="type" label="type">
      <template slot-scope="type">
        <el-button @click="isEditing = !isEditing" v-if="!isEditing">
          <span>{{ type.row.type }}</span>
        </el-button>
        <form v-else class="flex-grow-1" @submit.prevent="changeEmployee('type',type.row, $event.target.value)">
          <input
            type="text"
            class="form-control"
            :value="type.row.type"
            @blur="changeEmployee('type',type.row, $event.target.value)"
          />
        </form>
      </template>
    </el-table-column>
    <el-table-column prop="hours" label="hours">
      <template slot-scope="hours">
        <el-button @click="isEditing = !isEditing" v-if="!isEditing">
          <span>{{ hours.row.hours }}</span>
        </el-button>
        <form v-else class="flex-grow-1" @submit.prevent="changeEmployee('hours',hours.row, $event.target.value)">
          <input
            type="text"
            class="form-control"
            :value="hours.row.hours"
            @blur="changeEmployee('hours',hours.row, $event.target.value)"
          />
        </form>
      </template>
    </el-table-column>
    <el-table-column prop="id" label="actions">
      <template slot-scope="scope">
        <el-button
          @click="deleteEmployee(scope.row)"
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
    }
  },
  data() {
    return {
      isEditing: false,
      value: ''
    }
  },
  methods: {
    deleteEmployee(row) {
      const newEmployees = JSON.parse(JSON.stringify(this.employees)).filter(item => {
        if (item.id === row.id) {
          return false          
        }
        return true})
      this.$emit('update-employees', newEmployees)
    },
    changeEmployee(field, row, value) {
      const newEmployees = JSON.parse(JSON.stringify(this.employees)).map(item => {
        if (item.id === row.id) {
          return {...item,[field]: value}          
        }
        return item})
      this.isEditing = false;
      this.$emit('update-employees', newEmployees);
    }
  },
};
</script>

<style lang="scss" scoped>
</style>