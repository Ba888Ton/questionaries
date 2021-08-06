<template>
  <el-button v-if="!isEditing" @click="isEditing = !isEditing">
    <span>{{ value }}</span>
  </el-button>
  <form v-else class="flex-grow-1" @submit.prevent="changeValue">
    <input type="text" class="form-control" :value="value" />
  </form>
</template>

<script>
export default {
  name: "EditableCell",
  props: {
    scope: {
      type: Object,
    },
    prop: {
      type: String,
    },
  },
  data() {
    return {
      isEditing: false,
    };
  },
  computed: {
    value() {
      return this.scope.row[this.scope.column.label]
    }
  },
  methods: {
    changeValue(e) {
      this.$emit("new-value", this.scope.column.label, this.scope.row, e.target[0].value);
      this.isEditing = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.form-control {
  padding: 8px 12px;
  border: #cccbcb 1px solid;
  border-radius: 4px;
  outline-color: #a8a8a880;
}
</style>