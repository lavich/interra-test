<template>
  <div class="field">
    <MainCard class="field__card">
      <h1>Операции на поле {{ fieldName }}</h1>
    </MainCard>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import MainCard from "@/components/MainCard.vue";

export default Vue.extend({
  name: "Field",
  props: {
    fieldName: {
      type: String,
      required: true
    }
  },
  components: {
    MainCard
  }
});
</script>

<style scoped lang="scss">
.field {
  background: #f9f9f9;
  min-height: calc(100% - 80px);
  height: calc(100% - 80px);

  &__card {
    max-width: 870px;
    height: 100%;
    margin: auto;
  }
}
</style>
