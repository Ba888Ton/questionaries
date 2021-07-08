
<template>
  <el-main>
    <h1>Поступившие заявки</h1>
    <el-row :gutter="12">
      <task-card v-for="card in tasks" :key="card.value"> 
        <template v-slot:title>
          <h3>{{ card.value }}</h3>
        </template>
        <div>
          <el-button style="margin-top: 12px" @click="click">Взять в работу</el-button>
        </div>
      </task-card>
    </el-row>
    <el-row :gutter="12">
      <TaskTable :id="id" />
    </el-row>
  </el-main>
</template>
<script>
import TaskCard from "../components/TaskCard.vue";
import TaskTable from "../components/TaskTable.vue";
export default {
  components: { TaskCard, TaskTable },
  methods: {
    click() {
      console.log('click!!')
    },
  },
  data() {
    return {
      show: true,
      errors: [],
      email: "",
      input_platform: "",
      input: "",
      active: 1,
      radio1: "",
      radio2: "1",
      percentage: 80,
      typeValue: "",
      id: 234,
      tasks: [
        {
          value: "Задача 1",
          label: "Option1",
        },
        {
          value: "Option2",
          label: "Option2",
          button: "Взять в работу"
        },
        {
          value: "Option3",
          label: "Option3",
          button: "push me"
        }
      ],
      form: {
        platform: "",
        version: [],
        options: [],
        settings: [],
      },
      cases: {
        platform: ["mobile", "desktop"],
        version: {
          mobile: ["android", "ios"],
          desktop: ["ecom", "info", "crm", "erp", "bi"],
        },
        options: {
          mobile: ["loyality", "delivery"],
          desktop: [
            "admin_panel",
            "rss",
            "data_base",
            "other_module",
            "user_account",
          ],
        },
        settings: ["cheap", "good", "fast"],
      },
    };
  },
};
</script>
<style lang="scss">
.transition-box {
  background: #fff;
}
.transition-box2 {
  background: $secondary;
}
</style>
   