<template>
  <el-main>
    <h1>Пройдите опрос и мы начнем работать</h1>
    <div style="margin: 20px">
      <transition name="el-fade-in-linear">
        <div v-show="!form.platform" class="transition-box">
          <h4>Какая платформа?</h4>
          <el-radio-group v-model="form.platform">
            <template v-for="item in cases.platform">
              <el-radio :label="item" :key="item" border>{{ item }}</el-radio>
            </template>
          </el-radio-group>
        </div>
      </transition>
      <transition name="el-fade-in-linear">
        <div v-show="form.platform && form.options" class="transition-box">
          <h4>Дополнительные вопросы</h4>
          <template v-for="(question, id) in cases[form.platform + 'Questions']">
            <transition name="el-fade-in-linear" :key="id">
              <div
                v-for="(array, name) in question"
                :key="array.id"
                v-show="form.options[name] === ''"
              >
                <h4>{{ name }} </h4>
                <el-radio-group v-model="form.options[name]" :key="array.id">
                  <el-radio
                    v-for="item in array"
                    :label="item"
                    border
                    :key="item.id"
                  >
                    {{ item }}
                  </el-radio>
                </el-radio-group>
              </div>
            </transition>
          </template>
        </div>
      </transition>
    </div>
  </el-main>
</template>
<script>
import { nanoid } from "nanoid";
export default {
  methods: {
    nextStep() {
      if (this.active++ > 4) this.active = 0;
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
      // percentage: 80,
      typeValue: "",
      options: [
        {
          value: "Option1",
          label: "Option1",
        },
        {
          value: "Option2",
          label: "Option2",
        },
        {
          value: "Option3",
          label: "Option3",
        },
        {
          value: "Option4",
          label: "Option4",
        },
        {
          value: "Option5",
          label: "Option5",
        },
      ],
      form: {
        platform: "",
        options: { type: "", vendor: "", features: "" },
        settings: [],
      },
      cases: {
        platform: ["mobile", "desktop"],
        mobileQuestions: [
          { type: ["loyality", "delivery"] },
          { vendor: ["android", "ios"] },
        ],
        desktopQuestions: [
          { type: ["ecom", "info", "crm", "erp", "bi"] },
          {
            features: [
              "admin_panel",
              "rss",
              "data_base",
              "other_module",
              "user_account",
            ],
          },
        ],
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
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
   