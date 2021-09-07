<template>
  <el-form :model="contactForm" :rules="rules" ref="contactForm" class="contactForm">
    <el-row>
      <el-col class="left_col" :sm="24" :md="8">
        <el-upload
          class="dd_logo"
          drag
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">
            Логотип компании <em>click to upload</em><br />Любой формат jpg,
            png, svg
          </div>
        </el-upload>
        <el-form-item label="Название ИП, ООО,  ОАО" prop="name">
          <el-input
            class="custom_input"
            v-model="contactForm.companyName"
            placeholder="Название"
          ></el-input>
        </el-form-item>
        <el-form-item label="Название компании">
          <el-input
            class="custom_input"
            v-model="contactForm.companyAdress2"
            placeholder="Название"
          ></el-input>
        </el-form-item>
        <el-form-item label="Адрес компании" prop="adress">
          <el-input
            class="custom_input"
            v-model="contactForm.companyAdress"
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col class="right_col" :sm="24" :md="16">
        <el-form-item
          label="ФИО руководителя компании"
          prop="ceo"
          :rules="[{ required: true, message: 'Введите имя' }]"
        >
          <el-input
            class="custom_input"
            v-model="contactForm.ceo"
            placeholder="Ф И О"
          />
        </el-form-item>
        <el-form-item label="ФИО менеджера">
          <el-input
            class="custom_input"
            v-model="contactForm.manager"
            placeholder="Ф И О"
          />
        </el-form-item>
        <el-form-item
          label="Контактный телефон"
          prop="phone"
          :rules="[
            { required: true, message: 'Введите телефон' },
            { type: 'number', message: 'Телефон может быть только из цифр' },
          ]"
        >
          <el-input v-model.number="contactForm.phone"></el-input>
        </el-form-item>
        <el-form-item
          label="Контактный телефон"
          :rules="[
            { type: 'number', message: 'Телефон может быть только из цифр' },
          ]"
        >
          <el-input v-model.number="contactForm.phone2"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('contactForm')">
            Отправить заявку
          </el-button>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>
<script>
export default {
  data() {
    return {
      contactForm: {
        name: "",
        companyName: "",
        phone: "",
        ceo: "",
        manager: "",
        phone2: "",
        fileList: "",
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
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$emit("contacts-form-submit", this.contactForm);
        } else {
          return false;
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
::v-deep .el-input__inner {
  background: transparent;
  height: 40px;
  border: none;
  color: white;
  width: 100%;
  display: inline-block;
  border-bottom: 1px solid $secondary;
  border-radius: 0;
  &:focus-visible {
    outline: none;
    border-bottom-color: $green;
  }
  &::placeholder {
    color: gray;
  }
}
::v-deep .el-form-item__label {
  font-size: 17px;
  letter-spacing: -0.7px;
}
.dd_logo {
  min-height: 100px;
  margin-bottom: 30px;
}
::v-deep .el-upload-dragger {
  background: rgba(255, 255, 255, 0.202673);
  // border: 1px dashed #c1c1c1;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.101421);
  border-radius: 4px;
  flex-basis: 290px;
  line-height: 22px;
  font-size: 2rem;
  height: 65px;
  color: #cfcfd4;
  letter-spacing: -0.571429px;
  background-image: url("data:image/svg+xml,%3Csvg width='40' height='36' viewBox='0 0 40 36' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M35.8748 0H11.1249C8.85141 0 7 1.82335 7 4.06267V21.9373C7 24.1766 8.85141 26 11.1249 26H35.8748C38.1486 26 40 24.1766 40 21.9373V4.06267C40 1.82335 38.1486 0 35.8748 0ZM11.1249 3.25007H35.8748C36.3304 3.25007 36.6999 3.61397 36.6999 4.06267V15.5985L31.4877 9.60859C30.9348 8.97006 30.1345 8.62878 29.2749 8.60944C28.4202 8.6142 27.6184 8.98792 27.0706 9.63478L20.9424 16.8788L18.9459 14.9174C17.8175 13.806 15.9809 13.806 14.854 14.9174L10.3001 19.4008V4.06267C10.3001 3.61397 10.6696 3.25007 11.1249 3.25007ZM15.5002 11C17.4305 11 19 9.43024 19 7.5C19 5.56976 17.4305 4 15.5002 4C13.5698 4 12 5.56976 12 7.5C12 9.43024 13.5698 11 15.5002 11ZM10.2319 28.5339C7.61081 28.5339 5.27932 26.8333 4.43271 24.3014L4.37545 24.1106C4.17579 23.4402 4.09215 22.8763 4.09215 22.3122V11L0.120202 24.4357C-0.390643 26.4119 0.773449 28.4607 2.72659 29.0066L28.0437 35.8773C28.3597 35.9602 28.6757 36 28.9869 36C30.6174 36 32.1074 34.9033 32.525 33.2871L34 28.5339H10.2319Z' fill='%23CFCFD4' fill-opacity='0.50127'/%3E%3C/svg%3E%0A");
  background-repeat: no-repeat;
  background-position: center left 20px;
  padding: 10px 0;
  .small_text {
    line-height: 16px;
    font-size: 1.2rem;
  }
  .el-icon-upload {
    display: none;
  }
  .el-upload__text {
    color: inherit;
  }
}
.left_col {
  padding-right: 4.5rem;
  position: relative;
  &::after {
    content: "";
    display: block;
    position: absolute;
    width: 2px;
    height: 30%;
    background: $secondary;
    right: 0;
    top: 35%;
  }
}
.right_col {
  padding-left: 4.5rem;
}
</style>