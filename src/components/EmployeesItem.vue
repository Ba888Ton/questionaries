<template>
  <el-table :data="employees" style="width: 100%">
    <div class="qqqq" slot="empty">Добавьте исполнителя</div>
    <el-table-column prop="id" label="id" width="180">
      <template slot-scope="id">
        <editable-cell
          :scope="id"
          @new-value="changeEmployee"
        ></editable-cell>
      </template>
    </el-table-column>
    <el-table-column prop="name" label="name" width="180">
      <template slot-scope="name">
        <editable-cell
          :scope="name"
          @new-value="changeEmployee"
        ></editable-cell>
      </template>
    </el-table-column>
    <el-table-column prop="type" label="type">
      <template slot-scope="type">
        <editable-cell
          :scope="type"
          @new-value="changeEmployee"
        ></editable-cell>
      </template>
    </el-table-column>
    <el-table-column prop="hours" label="hours">
      <template slot-scope="hours">
        <editable-cell
          :scope="hours"
          @new-value="changeEmployee"
        ></editable-cell>
      </template>
    </el-table-column>
    <el-table-column prop="id" label="actions">
      <template slot-scope="scope">
        <el-button @click="deleteEmployee(scope.row)">Delete</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import EditableCell from "./EditableCell.vue";
export default {
  components: { EditableCell },
  name: "EmployeesItem",
  props: {
    employees: {
      type: Array,
    },
  },
  methods: {
    deleteEmployee(row) {
      const newEmployees = JSON.parse(JSON.stringify(this.employees)).filter(
        (item) => {
          if (item.id === row.id) {
            return false;
          }
          return true;
        }
      );
      this.$emit("update-employees", newEmployees);
    },
    changeEmployee(field, row, value) {
      const newEmployees = JSON.parse(JSON.stringify(this.employees)).map(
        (item) => {
          if (item.id === row.id) {
            const object = { ...item, [field]: value };
            return object;
          }
          return item;
        }
      );
      this.$emit("update-employees", newEmployees);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>