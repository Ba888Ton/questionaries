<template>
  <el-card class="box-card" shadow="hover">
    <div slot="header" class="clearfix">
      <span>Раздел {{ part.name }}</span>
      <div class="btn-block">
        <el-button @click="addEmployee" style="padding: 3px 0" type="text">
          Добавить исполнителя
          <div icon="el-icon-top-right"></div>
        </el-button>
        <el-button
          style="float: right; margin-left: 30px; padding: 3px 0; color: salmon"
          type="text"
          @click="$emit('delete-partition', part.id)"
        >
          Удалить раздел
        </el-button>
      </div>
    </div>

    <employees-item
      :employees="part.employees"
      @update-employees="updateEmployees"
    >
    </employees-item>
  </el-card>
</template>

<script>
import { nanoid } from 'nanoid';
import EmployeesItem from "./EmployeesItem.vue";
export default {
  name: "PartitionItem",
  components: {
    EmployeesItem,
  },
  props: {
    part: {
      type: Object,
      default: {},
    }
  },
  methods: {
    addEmployee(partition) {
      const uid = nanoid();
      const addNewEmployee = Object.assign(this.part);
      addNewEmployee.employees.push({
        name: "add name",
        type: "",
        hours: 0,
        id: uid,
      });
      this.$emit("update-partition", addNewEmployee, partition);
    },
    updateEmployees(updatedEmployees) {
      this.$emit("update-partition", updatedEmployees, this.part.id);
    }
  },

};
</script>

<style lang="scss" scoped>
.box-card {
  position: relative;
}
.btn-block {
  position: absolute;
  right: 30px;
  top: 20px;
}
</style>