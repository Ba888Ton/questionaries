<template>
  <base-layout>
    <template v-slot:header>
      <h1>Здесь мог быть заголовок страницы</h1>
    </template>

    <p>Параграф для основного контента.</p>
    <p>И ещё один.</p>

    <template v-slot:footer>
     <h3>именованный футер</h3>
      <p>Некая контактная информация</p>
    </template>
  </base-layout>
</template>

<script>
import BaseLayout from "../components/BaseLayout.vue";
export default {
  components: { BaseLayout },
};
</script>
