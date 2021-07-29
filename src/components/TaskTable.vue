<template>
  <div class="qqq">
    <h1>Настроить заявку</h1>
    <el-col>
      <el-card class="box-card" shadow="always">
        <div slot="header" class="clearfix">
          <span>Проект № 123</span>
          <el-button style="float: right; padding: 3px 0" type="text">Меню проекта</el-button>
        </div>
        <template v-for="(part, key) in components">
          <el-card
            class="box-card"
            shadow="always"
            :key="key"
            v-if="part === Object(part)"
          >
            <div slot="header" class="clearfix">
              <span>Раздел {{ part.name }}</span>
              <el-button style="float: right; padding: 3px 0" type="text">
                Меню раздела
              </el-button>
            </div>
            <table width="100%">
              <tr v-for="row in part.section" :key="row.name"> 
                <td width="200">{{ row.name }}</td>
                <td>{{ row.defaultRate }}</td>
                <td>25</td>
                <td> сумма: {{row.defaultRate * 25}} </td>
              </tr>
            </table>
          </el-card>
        </template>
      </el-card>
    </el-col>
    {{ sections }}
  </div>
</template>

<script>
export default {
  props: {
    components: {
      type: Object,
      default: null
    },
    sections: {
      type: Object,
      default: null
    },
  },
};
</script>

<style lang="scss" scoped>
.el-col {
  border-radius: 4px;
  margin-top: 20px;
  &:last-child {
    margin-bottom: 20px;
  }
}
.box-card {
  margin-bottom: 20px;
}
</style>