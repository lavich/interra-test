<template>
  <table cellspacing="0" class="field-table">
    <thead class="field-table__head">
      <tr>
        <td v-for="header in headers" :key="header.title">
          <label class="field-table__filter">
            <input
              v-if="header.filter"
              v-model="selectedFilter"
              :value="header.type"
              :checked="selectedFilter === header.type"
              type="radio"
              class="visually-hidden"
            />
            <span>{{ header.title }}</span>
          </label>
        </td>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(operation, idx) in operations" :key="idx">
        <td width="10%">{{ operation.date | formatDate }}</td>
        <td width="50%">{{ formatType(operation.type) }}</td>
        <td width="20%">Пшеница озимая</td>
        <td width="20%" :class="assessmentClass(operation.assessment)">
          {{ formatAssessment(operation.assessment) }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import moment from "moment";

import Operation, { Assessment, OperationType } from "@/models/Operation";
import TDate from "@/models/TDate";

export default Vue.extend({
  name: "FieldTable",
  props: {
    operations: {
      type: Array as PropType<Operation[]>,
      default: () => []
    },
    loading: Boolean
  },
  filters: {
    formatDate(date: TDate): string {
      return moment()
        .year(date.year)
        .month(date.month)
        .date(date.day)
        .locale("ru")
        .format("DD MMM YYYY");
    }
  },
  data: () => ({
    headers: [
      { type: "date", title: "Дата", filter: true },
      { type: "type", title: "Операция", filter: true },
      { title: "Культура" },
      { type: "assessment", title: "Качество", filter: true }
    ],
    selectedFilter: "date"
  }),
  methods: {
    formatType(value: number): string {
      return this.$t(OperationType[value]).toString();
    },
    formatAssessment(value: number | null): string {
      return value !== null
        ? this.$t(Assessment[value]).toString()
        : this.$t("WITHOUT_RATING").toString();
    },
    assessmentClass(value: number | null): string[] {
      return ["assessment", `assessment--${value}`];
    }
  }
});
</script>

<style scoped lang="scss">
.field-table {
  width: 100%;

  tr {
    td:first-child {
      padding-left: 10px;
    }
    td:last-child {
      padding-right: 10px;
    }
  }

  thead tr {
    height: 40px;
    font-weight: 500;
    background: #edeeee;
    user-select: none;
  }

  tbody tr {
    height: 50px;
    td {
      border-bottom: 1px solid #edeeee;
    }
    td:first-child {
      text-transform: uppercase;
    }
    td:nth-child(2) {
      font-weight: 500;
      font-size: 13px;
      line-height: 13px;
      letter-spacing: -0.47px;
    }

    .assessment::before {
      content: "";
      display: inline-block;
      width: 20px;
      height: 10px;
      margin-right: 5px;
      border-radius: 5px;
    }
    .assessment {
      &--0::before {
        background: #66cc66;
      }
      &--1::before {
        background: #ffe06d;
      }
      &--2::before {
        background: #ff7360;
      }
      &--null {
        mix-blend-mode: normal;
        opacity: 0.3;
        &::before {
          opacity: 0.3;
          background: #333333;
        }
      }
    }
  }

  &__filter {
    height: 40px;
    border: none;
    cursor: pointer;

    span::after {
      content: "";
      display: inline-block;
      margin-left: 5px;
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 5px 5px 0 5px;
      border-color: #a7a9ac transparent transparent transparent; //
    }

    input:checked + span::after {
      border-color: #007bff transparent transparent transparent;
    }
  }
}
</style>
