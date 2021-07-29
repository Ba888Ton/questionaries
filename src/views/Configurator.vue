<template>
  <el-main>
    <h1>Поступившие заявки</h1>
    <p v-if="!tasks.length">пока ничего нет ...</p>
    <el-row
      :gutter="12"
      class="infinite-list-wrapper card-wrapper"
      style="overflow: auto; max-height: 400px"
    >
      <task-card v-for="card in tasks" :key="card.id">
        <template v-slot:title>
          <h3>Заявка № {{ card.id }}</h3>
        </template>
        <div>
          <el-button style="margin-top: 12px" @click="() => selectTask(card)"
            >Взять в работу</el-button
          >
        </div>
      </task-card>
    </el-row>
    <el-row v-if="currentTask" :gutter="12">
      <TaskTable :components="currentTask" :id="currentId" 
      @reorder-row="reorder($event)" />
      <!-- <SideMenu :section="params.section" /> -->
    </el-row>
  </el-main>
</template>
<script>
import TaskCard from "../components/TaskCard.vue";
import TaskTable from "../components/TaskTable.vue";
import SideMenu from "../components/SideMenu.vue";


export default {
  components: { TaskCard, TaskTable, SideMenu },
  mounted() {
    this.getParams();
  },
  // computed: {
  //   currentType() {
  //     return this.params.types[this.currentTask.jjjj].option;
  //   },
  // },
  methods: {
    async getParams() {
      try {
        const settings = await this.$http.get("http://localhost:3000/settings");
        const tasks = await this.$http.get(
          "http://localhost:3000/completed_forms"
        );
        this.params = settings.data;
        this.tasks = tasks.data;
      } catch (error) {
        console.log("components error", error.response);
      }
    },
    selectTask(task) {
      const questionAnswerPairs = task.answers.map((answer) => {
        if (answer instanceof Array) {
          const valuesArray = answer.flatMap((item, i) => [
            item.id_question,
            item.id_answer,
          ])
          return valuesArray
        }
        return [answer.id_question, answer.id_answer];
      });
      questionAnswerPairs.forEach(([quest, ans]) => {
        switch (quest) {
          case "2":
            switch (ans) {
              case "14":
                this.current_type = "info";
                break;
              case "15":
                break;
              case "16":
                break;
              case "17":
                break;

              default:
                break;
            }
            break;
          case "3":
            switch (ans) {
              case "4":
                break;
              case "5":
                break;
              default:
                break;
            }
            break;
          case "4":
            break;

          default:
            break;
        }
      });
      if (this.current_type) {
        this.currentTask = {};
        const optionsList = this.params.types[this.current_type].options;
        const optionsObject = {};
        optionsList.forEach((el) => {
          optionsObject[el] = Array.from(this.params.options[el].section);
        });
        for (const key in optionsObject) {
          let newSection = optionsObject[key].map(
            (key) => this.params.section[key]
          );
          optionsObject[key].section = newSection;
        }
        this.currentTask = optionsObject;
        this.currentId = task.id;
        return optionsObject;
      }
    },
    reorder(event) {
      console.log(event);
    }
  },
  data() {
    return {
      params: "",
      current_type: "",
      currentTask: "",
      tasks: "",
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
  @media (max-width: 1024px) {
    flex-direction: column;
    & > .el-col-8 {
      width: 100%;
    }
  }
}
</style>
   