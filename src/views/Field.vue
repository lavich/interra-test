<template>
  <div class="field">
    <MainCard class="field__card">
      <h1>Операции на поле {{ fieldName }}</h1>
      {{ loading }}
    </MainCard>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import MainCard from "@/components/MainCard.vue";
import { fetchFieldOperations } from "@/api";
import Operation from "src/models/Operation";

export default Vue.extend({
  name: "Field",
  props: {
    fieldName: {
      type: String,
      required: true
    }
  },
  data: () => ({
    fieldOperations: [] as Operation[],
    loading: false
  }),
  components: {
    MainCard
  },
  methods: {
    async fetchOperations() {
      try {
        this.loading = true;
        this.fieldOperations = await fetchFieldOperations(this.fieldName);
      } catch (e) {
        console.log(e);
      } finally {
        this.loading = false;
      }
    }
  },
  async created() {
    this.fetchOperations();
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
