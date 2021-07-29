<template>
  <div class="qqq">
    <h1>Настроить заявку</h1>
    <el-col>
      <el-card class="box-card" shadow="always">
        <div slot="header" class="clearfix">
          <span>Проект № {{ id }} </span>
          <el-button style="float: right; padding: 3px 0" type="text"
            >Меню проекта</el-button
          >
        </div>
        <template v-for="(part, key) in components">
          <el-card
            class="box-card"
            shadow="always"
            :key="key"
            v-if="part === Object(part)"
          >
            <div slot="header" class="clearfix">
              <span>Раздел {{ key }}</span>
              <el-button style="float: right; padding: 3px 0" type="text">
                Меню раздела
              </el-button>
            </div>
            <table width="100%">
              <drag
                v-for="row in part.section"
                :key="row.name"
                class="drag"
                :data="row"
              >
                <tr>
                  <td width="200">{{ row.name }}</td>
                  <td>{{ row.defaultRate }}</td>
                  <td>25</td>
                  <td>сумма: {{ row.defaultRate * 25 }}</td>
                </tr>
              </drag>
              <drop-list
                :items="part.section"
                class="list"
                @insert="onInsert"
                @reorder="$event.apply(items)"
              >
                <template v-slot:item="{ item }">
                  <drag class="item" :key="item.name">{{ item }}</drag>
                </template>
              </drop-list>
            </table>
          </el-card>
        </template>
      </el-card>
    </el-col>
  </div>
</template>

<script>
import { Drag, Drop, DropMask, DropList } from "vue-easy-dnd";
export default {
  props: {
    components: {
      type: Object,
      default: null,
    },
    id: {
      type: Number,
      default: null,
    },
  },
  components: {
    Drag,
    Drop,
    DropMask,
    DropList,
  },
  methods: {
    onInsert(event) {
      this.items.splice(event.index, 0, event.data);
    }
  },
  computed: {
    rows:{ 
      get(){
        return this.data 
      },
      set(){
        this.$emit('reorder-row', newOrder)
      }
    }
  },
  data() {
    return {
    items : ['a', 'b', 'c', 'd', 'e']
    }
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
.copy {
  margin: 20px 10px;
  border: 1px solid black;
  height: 100px;
  display: inline-block;
  position: relative;
  flex: 1;
}
</style>