<template>
  <el-main>
    <h1>Поступившие заявки</h1>
    <el-row :gutter="12">
      <task-card v-for="card in tasks" :key="card.value">
        <template v-slot:title>
          <h3>{{ card.value }}</h3>
        </template>
        <div>
          <el-button style="margin-top: 12px">Взять в работу</el-button>
        </div>
      </task-card>
    </el-row>

    <el-row :gutter="12">
      <task-table
        v-if="params"
        :components="components"
      >
      </task-table>
    </el-row>
  </el-main>
</template>
<script>
import TaskCard from "../components/TaskCard.vue";
import TaskTable from "../components/TaskTable.vue";

export default {
  components: { TaskCard, TaskTable },
  mounted() {
    this.getParams();
  },
  computed: {
    components() {
      const componentsList = this.params.types[this.current_type].options;
      const componentsObject = componentsList.reduce((obj, key) => {
          obj[key] = this.params.components[key]
          return obj;
        }, {});
        for (const key in componentsObject) {
          let newSection = componentsObject[key].section.reduce((arr, key) => {
            arr.push(this.params.section[key])
            return arr
          },[])
          componentsObject[key].section = newSection
        }
      return componentsObject;
    },
  },
  methods: {
    async getParams() {
      try {
        const res = await this.$http.get("http://localhost:3000/settings");
        this.params = res.data;
      } catch (error) {
        console.log("components error", error.response);
      }
    },
  },
  data() {
    return {
      params: "",
      current_type: "ecom",
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
          button: "Взять в работу",
        },
        {
          value: "Option3",
          label: "Option3",
          button: "push me",
        },
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
   