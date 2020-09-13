<template>
  <div class="field">
    <MainCard class="field__card">
      <h1>Операции на поле {{ fieldName }}</h1>
      <div class="field__actions">
        <RadioSelector v-model="selectedOption" :options="filteredOptions" />
        <button class="round-button">
          <span class="icon-plus" style="margin-right: 5px;"></span>
          Добавить операцию
        </button>
      </div>
      <FieldTable :operations="filteredFieldOperations" />
    </MainCard>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import moment from "moment";

import FieldTable from "@/components/FieldTable.vue";
import MainCard from "@/components/MainCard.vue";
import RadioSelector from "@/components/RadioSelector.vue";
import { fetchFieldOperations } from "@/api";
import Operation from "src/models/Operation";

export default Vue.extend({
  name: "Field",
  components: {
    FieldTable,
    MainCard,
    RadioSelector
  },
  props: {
    fieldName: {
      type: String,
      required: true
    }
  },
  data: () => ({
    fieldOperations: [] as Operation[],
    filteredOptions: ["запланированные операции", "выполненные операции"],
    selectedOption: 0,
    loading: false
  }),
  computed: {
    // фильтрация запланированных и выполненных операций
    filteredFieldOperations(): Operation[] {
      return this.fieldOperations.filter(operation => {
        const { year, month, day } = operation.date;
        const opDate = moment()
          .year(year)
          .month(month)
          .date(day);
        return this.selectedOption ? opDate < moment() : opDate >= moment();
      });
    }
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

  &__actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;

    > :last-child {
      justify-self: end;
    }
  }
}
</style>
