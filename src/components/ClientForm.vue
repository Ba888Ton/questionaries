<template>
  <el-form
    :model="ruleForm"
    :rules="rules"
    ref="ruleForm"
    label-width="170px"
    class="ruleForm"
  >
    <el-form-item label="Имя" prop="name">
      <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>
    <el-form-item label="Фамилия" prop="name">
      <el-input v-model="ruleForm.surname"></el-input>
    </el-form-item>
    <el-form-item label="Компания" prop="name">
      <el-input v-model="ruleForm.companyName"></el-input>
    </el-form-item>
    <el-form-item
      label="Контактный телефон"
      prop="phone"
      :rules="[
        { required: true, message: 'Введите телефон' },
        { type: 'number', message: 'Телефон может быть только из цифр' },
      ]"
    >
      <el-input v-model.number="ruleForm.phone"></el-input>
    </el-form-item>
    <el-form-item label="Activity form">
      <el-input type="textarea" v-model="ruleForm.desc"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">
        Отправить заявку
      </el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  data() {
    return {
      ruleForm: {
        name: "",
        surname: "",
        companyName: "",
        phone: "",
        desc: "",
      },
      rules: {
        name: [
          {
            required: true,
            message: "Please input name",
            trigger: "blur",
          },
          {
            min: 3,
            max: 40,
            message: "Length should be 3 to 40",
            trigger: "blur",
          },
        ],
        phone: [
          {
            required: true,
            message: "Please input phone number",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$emit("contacts-form-submit", this.ruleForm);
        } else {
          return false;
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.ruleForm {
  max-width: 800px;
  margin: 0 auto;
}
</style>