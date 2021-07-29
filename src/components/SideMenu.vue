<template>
  <div class="side-menu">
    <ul class="list-root">
      <drag v-for="link in section" :key="link.name" class="drag" :data="link">
        <li class="side-menu_link">{{link.name}}</li>
      </drag>
    </ul>
    <drop class="copy" @drop="onCopyDrop">
      <span v-for="(n, index) in copied" :key="index"> Copied {{n}};&nbsp; </span>
    </drop>
  </div>
</template>

<script>
import { Drag, Drop, DropMask } from "vue-easy-dnd";

export default {
  props: {
    section: {
      type: Object,
      default: {}
    },
  },
  components: {
    Drag,
    Drop,
    DropMask
  },
  name: 'SideMenu',
  data: () => {
    return {
      numbers: [1, 2, 3, 4, 5],
      copied: [],
      cut: []
    };
  },
  methods: {
    onCopyDrop(e) {
      this.copied.push(e.data);
    },
  }
};
</script>

<style lang="scss" scoped>
.side-menu {
  position: fixed;
  right: 50px;
  top: 100px;
  background: palegoldenrod;
  border-radius: 2px;
  border: 1px solid rgb(168, 164, 123);
}
.side-menu_link {
  list-style: none;
  padding: 10px 30px;
  cursor: pointer;
  &:hover {
    background: #fff;
    color: saddlebrown;
  }
}
.list-root {
  margin: 0;
  padding: 0;
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