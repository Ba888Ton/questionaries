<template>
  <el-main>
    <h1>Пройдите опрос и мы начнем работать</h1>
    <div style="margin: 20px">
      <transition name="el-fade-in-linear">
        <el-col :span="24">
          <div class="grid-content bg-purple-dark">
            <div
              v-for="question in questions"
              :key="question.id_question"
            >
              <task-card
                v-if="currentCard === +question.id_question"
                style="margin-top: 20px"
                class="el-col-24"
              >
                <h4>{{ question.name }}</h4>
                <template v-if="question.multi_choise">
                  <el-checkbox-group
                    @change="(e) => (isChecked = e.length ? true : false)"
                    v-model="checkList[question.name]"
                    style="margin-top: 20px; margin-bottom: 20px"
                  >
<!-- вот тут магия v-model не работает как в радио баттон -->
                    <el-checkbox
                      v-for="option in currentQuestion(question.id_question)"
                      :label="option"
                      :key="option.id"
                      border
                    >
                      {{ option.answer_value }}
                    </el-checkbox>
                  </el-checkbox-group>
                  <el-button class="btn btn-primary" :disabled="!isChecked"
                    >ertertert</el-button
                  >
                </template>
                <el-radio-group
                  @change="(e) => isSelected(e)"
                  v-else
                  v-model="checkList[question.name]"
                  style="margin-top: 20px"
                >
                  <el-radio
                    v-for="option in currentQuestion(question.id_question)"
                    :label="option"
                    :key="option.id"
                    border
                  >
                    {{ option.answer_value }}
                  </el-radio>
                </el-radio-group>
              </task-card>
            </div>
          </div>
        </el-col>
      </transition>
    </div>
  </el-main>
</template>
<script>
import TaskCard from "../components/TaskCard.vue";
export default {
  name: "Questionary",
  components: {
    TaskCard,
  },
  mounted() {
    this.getParams();
  },
  methods: {
    isSelected(e) {
      console.log(e);
      this.currentCard = +e.next_question
    },
    currentQuestion(id) {
      return this.answers.filter((item) => item.id_question === id);
    },
    async getParams() {
      try {
        const answers = await this.$http.get(
          "http://localhost:3000/answers_table"
        );
        const questions = await this.$http.get(
          "http://localhost:3000/questions_table"
        );
        this.answers = answers.data;
        this.questions = questions.data;
      } catch (error) {
        console.log("questionry error", error.response);
      }
    },
  },
  data() {
    return {
      isChecked: false,
      handleChange: "",
      checkList: {},
      errors: [],
      questions: "",
      answers: "",
      form: [],
      currentCard: 1,
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
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
   