<template>
  <div class="qqq">
    <h1>Настроить заявку</h1>
    <el-col>
      <el-card class="box-card" shadow="always">
        <div slot="header" class="clearfix">
          <span>Проект № {{ id }} </span>
          <div class="buttons">
            <el-button
              style="padding: 3px 0;
                margin-right: 10px;
                margin-left: auto;
                color: green;"
              type="text"
              @click="addPartition"
              >Добавить раздел</el-button
            >
            <el-button style="float: right; padding: 3px 0" type="text"
              >Меню проекта</el-button
            >
          </div>
        </div>
        <partition-item
          :key="part.id"
          v-for="part in partitions"
          :part="part"
          @delete-partition="deletePartition"
        >
        </partition-item>
      </el-card>
    </el-col>
    <el-col> </el-col>
  </div>
</template>

<script>
import PartitionItem from "./PartitionItem.vue";
import { nanoid } from "nanoid";
export default {
  components: {
    name: 'TaskPage',
    PartitionItem,
  },
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
  data() {
    return {
      partitions: [
        {
          id: 1,
          name: "Разработка дизайна для web и мобайл версии",
          hours: null,
          employers: [
            {
              name: "designer",
              type: "designer",
              hours: 0,
              id: 1,
            },
          ],
        },
        {
          id: 2,
          name: "Проработка требований и написание постановок ТЗ",
          hours: null,
          employers: [
            {
              name: "teamLead",
              type: "teamLead",
              hours: 0,
              id: 2,
            },
            {
              name: "analyst",
              type: "analyst",
              hours: 0,
              id: 3,
            },
          ],
        },
        {
          id: 3,
          name: "Адаптивная и мобильная web верстка",
          hours: null,
          employers: [
            {
              name: "analyst",
              type: "analyst",
              hours: 0,
              id: 3,
            },
            {
              name: "frontDeveloper",
              type: "frontDeveloper",
              hours: 0,
              id: 4,
            },
          ],
        },
      ],
    };
  },
  methods: {
    deletePartition(id) {
      this.partitions = this.partitions.filter((part) => part.id !== id);
    },
    addPartition() {
      this.partitions.push({
        id: nanoid(),
        name: "new",
        hours: null,
        employers: [],
      });
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
.buttons {
  display: inline-block;
  position: absolute;
  right: 40px;
}
</style>