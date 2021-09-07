<template>
<main class="main">
  <h1 class="main_title">Заявка на разработку</h1>
  <div class="qqq">
    <div class="square">
      <div class="child"></div>
    </div>
  </div>
  <el-main class="quest_wrapper">
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="Опросник на разработку" name="first">
      <div slot="label" class="custom_tab">Опросник на разработку</div>
      <div class="title">
        1 шаг из 10
      </div>
      <h2>Опросник: О компании</h2>
      <ClientForm
        @contacts-form-submit="contactsFormSubmit($event)"
      />
    </el-tab-pane>
    <el-tab-pane name="second">
      <div slot="label" class="custom_tab">О компании</div>
      <ClientForm
        @contacts-form-submit="contactsFormSubmit($event)"
      />
    </el-tab-pane>
    <el-tab-pane name="third">
      <div slot="label" class="custom_tab">Вопрос</div>
      <ClientForm
        @contacts-form-submit="contactsFormSubmit($event)"
      />
    </el-tab-pane>
  </el-tabs>
    <div style="margin: 20px">
      <transition name="el-fade-in-linear">
        <el-col :span="24">
          <div class="grid-content">
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
    {{ message }}
  </el-main>
</main>
</template>
<script>
import TaskCard from "../../components/TaskCard.vue";
import ClientForm from "@/components/ClientForm.vue"

export default {
  name: "Questionary",
  data() {
    return {
      handleChange: "",
      checkList: [],
      optionsList: [],
      errors: [],
      questions: "",
      answers: "",
      showForm: false,
      currentCard: 1,
      message: '',
      activeName: 'first',
      
    };
  },
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
          "http://localhost:5000/answers_table"
        );
        const questions = await this.$http.get(
          "http://localhost:5000/questions_table"
        );
        this.answers = answers.data;
        this.questions = questions.data;
      } catch (error) {
        console.log("questionry error", error.response);
      }
    },
    async contactsFormSubmit(form) {
      try {
        const loader = this.$loading({fullscreen: true})
        const data = {contacts: form, answers: this.checkList}
        const postForm = await this.$http.post("http://localhost:5000/completed_forms", data)
        .then(() => { 
          this.message = 'Успешно !'
          this.currentCard = 0
          loader.close()
        })
        .then(() => setTimeout(() => {
          this.message = ''
          setTimeout(() => {
            this.$router.push('/')
          }, 1000)
        }, 3000))
      } catch (error) {
        this.currentCard = 0
        loader.close()
        this.message = 'Что-то пошло не так'
        throw new Error(error)
      }
    },
    handleClick() {
      console.log('click');
    }
  },
};
</script>
<style lang="scss" scope>

.main {
  max-width: 1140;
  margin: 0 auto;
  padding: 2.4rem;
  color: #fff;
}
.main_title {
  color: $black;
  font-family: PF BeauSans Pro;
  font-style: normal;
  font-weight: normal;
  letter-spacing: -2px;
  text-align: left;
}
.transition-box {
  background: #fff;
}
.transition-box2 {
  background: #fff;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.el-radio.is-bordered,
.el-checkbox.is-bordered {
  background: #fff;
  color: $secondary;
  border-color: $secondary;
}
.quest_wrapper {
  min-height: 670px;
  border-radius: 10px;
  background-image: url('../../assets/img/card_bg.png');
  background-size: cover;
  background-repeat: no-repeat;
}
.step {
  display: inline-block;
  width: 300px;
  background: coral;
}

.el-tabs__item {
  background: #323B5D;
  padding: 0;
  height: 44px;
  line-height: 44px;
  color: #5A5A63;
  .custom_tab {
  width: 300px;
}
  &.is-active {

    // background-image: url('../../assets/img/arrow.png');
    // background-position: right center;
    .custom_tab {
      color: #fff;
      background-color: #748EF7;
      background-image: url('../../assets/img/arrow.jpg');
      background-position: right center;
      background-repeat: no-repeat;
      background-size: contain;
    }
  }
  &:hover {
    color: #fff;
    background: #474d64;
  }
}
.el-tabs__active-bar {
  background-color: #145E79;
  bottom: -16px;
}
.el-tabs__nav-wrap::after {
 background: #1C2B3B;
}
.el-tabs__nav-scroll {
  padding-bottom: 16px;
}
</style>
   