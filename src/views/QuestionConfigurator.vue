<template>
  <el-main>
    <h1>Список опросников</h1>
    <p v-if="!allQuests">пока ничего нет ...</p>
    <el-row
      :gutter="12"
      class="infinite-list-wrapper card-wrapper"
      style="overflow: auto; max-height: 500px"
    >
      <task-card v-for="quest in allQuests" :key="quest.id">
        <template v-slot:title>
          <h3>Опросник {{ quest.name }}</h3>
        </template>
        <div>
          <el-button 
            style="margin-top: 12px" 
            @click="() => selectQuest(quest)"
          >
            Развернуть
          </el-button>
        </div>
      </task-card>
    </el-row>
    <el-row :gutter="12">
      <table>
        <tr>
          <td>      
            <p v-for="qu in questionsTable" :key="qu.id">
              {{qu.id}}   {{qu.name}}  
            </p>
          </td>
          <td>      
            <p v-for="an in answersTable" :key="an.id">

               фильтруем по id вопроса
              {{an.answer_id}}   {{an.answer_value}}  
            </p>
          </td>
        </tr>
      </table>
    </el-row>
  </el-main>
</template>
<script>
import TaskCard from "../components/TaskCard.vue";
import TaskTable from "../components/TaskPage.vue";
import SideMenu from "../components/SideMenu.vue";


export default {
  components: { TaskCard, TaskTable, SideMenu },
  mounted() {
    this.getParams();
  },
  methods: {
    async getParams() {
      try {
        const settings = await this.$http.get("http://localhost:5000/settings");
        const questionsTable = await this.$http.get("http://localhost:5000/questions_table");
        const answersTable = await this.$http.get("http://localhost:5000/answers_table");
        this.questionsTable = questionsTable.data;
        this.answersTable = answersTable.data;
        this.params = settings.data;
        this.allQuests = this.params.types
        console.log(this.answersTable);
      } catch (error) {
        console.log("components error", error.response);
      }
    },
    selectQuest(quest) {
      console.log(quest);
      debugger
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
      console.log('reorder event::::' + event);
    },
    deleteEl(event) {
      console.log('delete event::::' + event);
    }
  },
  data() {
    return {
      params: "",
      current_type: "",
      currentTask: "",
      allQuests: "",
      answersTable: "",
      questionsTable: ""
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
  flex-wrap: wrap;
  h3 {
    height: 60px;
  }
  @media (max-width: 1024px) {
    flex-direction: column;
    & > .el-col-8 {
      width: 100%;
    }
  }
}
</style>
   