<template>
  <el-main>
    <h1>Пройдите опрос и мы начнем работать</h1>
    <el-progress
      :percentage="percentage"
      class="el-progress el-progress--secondary"
    ></el-progress>

    <el-steps :active="active">
      <el-step title="Step 1" icon="el-icon-edit"></el-step>
      <el-step title="Step 2" icon="el-icon-upload"></el-step>
      <el-step title="Step 3" icon="el-icon-error"></el-step>
      <el-step title="Step 4" icon="el-icon-service"></el-step>
      <el-step title="Step 5" icon="el-icon-chicken"></el-step>
    </el-steps>
    <el-button style="margin-top: 12px" @click="nextStep" :disabled="active > 4"
      >Next step</el-button
    >
    <div style="margin: 20px">
      <h4>Какая платформа?</h4>
      <transition name="el-fade-in-linear">
        <div v-show="!form.platform" class="transition-box">
          <el-radio-group v-model="form.platform">
            <span v-for="item in cases.platform" :key="item">
              <el-radio :label="item" border>{{ item }}</el-radio>
            </span>
          </el-radio-group>
        </div>
      </transition>
    </div>
    <div style="margin: 20px">
      <el-radio-group v-model="form.version">
        <el-radio label="1" border>Option A</el-radio>
        <el-radio label="2" border>Option B</el-radio>
      </el-radio-group>
    </div>

    <el-select v-model="typeValue" placeholder="Select your type">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
    <div>
      <el-button @click="show = !show" class="el-button--success"
        >Click Me</el-button
      >

      <div style="display: flex; margin-top: 20px; height: 100px">
        <transition name="el-fade-in-linear">
          <div v-show="show" class="transition-box">.el-fade-in-linear</div>
        </transition>
        <transition name="el-fade-in-linear">
          <div v-show="show" class="transition-box2">.el-fade-in-linear</div>
        </transition>
      </div>
    </div>

    <!-- <el-form style="margin: 20px">
      <el-input placeholder="email" v-model="email" type="text"></el-input>
      <el-form-item label="Выберите платформу">
        <el-input
          placeholder="Please input platform"
          v-model="input_platform"
        ></el-input>
      </el-form-item>
      <el-input placeholder="Please input" v-model="input"></el-input>
    </el-form> -->
  </el-main>
</template>
<script>
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
      percentage: 80,
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
   