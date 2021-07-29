<template>
  <el-main>
    <h1>Поступившие заявки</h1>
    <el-row :gutter="12" class="infinite-list-wrapper card-wrapper" style="overflow:auto; max-height: 400px">
      <task-card v-for="card in tasks" :key="card.id">
        <template v-slot:title>
          <h3> Заявка № {{card.id}}</h3>
        </template>
        <div>
          <el-button style="margin-top: 12px" @click="() => selectTask(card)">Взять в работу</el-button>
        </div>
      </task-card>
    </el-row>
    <el-row :gutter="12">
      <task-table v-if="currentTask" :components="currentTask"> </task-table>
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
    currentType() {
      return this.params.types[this.currentTask.jjjj].option
    }
  },
  methods: {
    async getParams() {
      try {
        const settings = await this.$http.get("http://localhost:3000/settings");
        const tasks = await this.$http.get("http://localhost:3000/completed_forms");
        this.params = settings.data;
        this.tasks = tasks.data
      } catch (error) {
        console.log("components error", error.response);
      }
    },
    selectTask(task) {
      const values = task.answers.map(answer => {
        if (answer instanceof Array) {
          const valuesArray = answer.map(item => item.id_answer)
          return valuesArray
        }
        return answer.id_answer
      });
      console.log(values);
      debugger
      // values.forEach(item => {
      //   switch (item) {
      //     case 'desktop':
            
      //       break;
      //     case 'mobile':
            
      //       break;
        
      //     default:
      //       break;
      //   }
      // });
      this.currentTask = {}
      // const optionsList = this.params.types[this.current_type].options
      const optionsList = this.params.types['ecom'].options
      const optionsObject = {}
      optionsList.forEach(el => {
        optionsObject[el] = Array.from(this.params.options[el].section)
      });
      for (const key in optionsObject) {
        let newSection = optionsObject[key].map(key => this.params.section[key])
        optionsObject[key].section = newSection;
      }
      this.currentTask = optionsObject
      return optionsObject;
    },
  },
  data() {
    return {
      params: "",
      current_type: "ecom",
      currentTask: "",
      tasks: [],
      errors: [],
    };
  },
};
</script>
<style lang="scss">
.transition-box {
  background: #fff;
}
.transition-box2 {
  background: #fff;
}
.card-wrapper {
  display: flex;
  @media(max-width: 1024px) {
    flex-direction: column;
    &>.el-col-8 {
      width: 100%;
    }
  }
  
}
</style>
   