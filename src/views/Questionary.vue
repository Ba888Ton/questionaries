<template>
  <el-main>
    <h1>Пройдите опрос и мы начнем работать</h1>
    <div style="margin: 20px">
      <transition name="el-fade-in-linear">
        <el-col :span="24">
          <div class="grid-content bg-purple-dark">
            <div v-for="question in questions" :key="question.id_question">
              <task-card
                v-if="currentCard === +question.id_question"
                style="margin-top: 20px"
                class="el-col-24"
              >
                <h4>{{ question.name }}</h4>
                <template v-if="question.multi_choise">
                  <el-checkbox-group
                    v-model="optionsList"
                    style="margin-top: 20px; margin-bottom: 20px"
                  >
                    <el-checkbox
                      v-for="option in currentQuestion(question.id_question)"
                      :label="option"
                      :key="option.id"
                      border
                    >
                      {{ option.answer_value }}
                    </el-checkbox>
                  </el-checkbox-group>
                  <el-button
                    class="btn btn-primary"
                    @click="inputAnswer"
                    :disabled="!isChecked"
                  >
                    ertertert
                  </el-button>
                </template>
                <el-radio-group
                  @change="inputAnswer"
                  v-else
                  v-model="optionsList"
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
                <ClientForm 
                  v-if="question.id_question === '15'"
                  @contacts-form-submit="contactsFormSubmit($event)"
                />
                <!-- может идентификатор формы передавать вместо init -->
              </task-card>
            </div>
          </div>
        </el-col>
      </transition>
    </div>
    {{message}}
  </el-main>
</template>
<script>
import TaskCard from "../components/TaskCard.vue";
import ClientForm from "@/components/ClientForm.vue"

export default {
  name: "Questionary",
  components: {
    TaskCard, ClientForm
  },
  mounted() {
    this.getParams();
  },
  computed: {
    isChecked() {
      return this.optionsList.length ? true : false
    },
  },
  methods: {
    inputAnswer() {
      // тут вот переписать
      const next = this.optionsList && this.optionsList.next_question
        ? this.optionsList.next_question
        : this.optionsList[0].next_question;
      this.checkList.push(this.optionsList);
      this.optionsList = [];
      this.currentCard = +next;
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
    async contactsFormSubmit(form) {
      try {
        const data = {contacts: form, answers: this.checkList}
        const postForm = await this.$http.post("http://localhost:3000/completed_forms", data)
        .then(e => this.message = 'Успешно !')
        this.currentCard += 1
        setTimeout(() => {
          this.message = ''
          setTimeout(() => {
            this.$route.push('/')
          }, 1000);
        }, 3000);
      } catch (error) {
        this.message = 'Что-то пошло не так'
        throw new Error(error)
      }
    }
  },
  data() {
    return {
      handleChange: "",
      checkList: [],
      optionsList: [],
      errors: [],
      questions: "",
      answers: "",
      showForm: false,
      currentCard: 15,
      message: ''
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
   