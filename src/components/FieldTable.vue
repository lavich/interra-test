<template>
  <VueGoodTable :columns="columns" :rows="operations" />
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import moment from "moment";
import { VueGoodTable } from "vue-good-table";

import Operation, { Assessment, OperationType } from "@/models/Operation";
import TDate from "@/models/TDate";

export default Vue.extend({
  name: "FieldTable",
  components: { VueGoodTable },
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
  computed: {
    columns(): any[] {
      return [
        {
          label: "Дата",
          field: "date",
          formatFn: this.formatDate,
          sortFn: this.sortDate,
          width: "15%"
        },
        {
          label: "Операция",
          field: "type",
          formatFn: this.formatType,
          sortFn: this.sortType,
          width: "45%"
        },
        {
          label: "Культура",
          field: "culture",
          sortable: false,
          width: "20%"
        },
        {
          label: "Качество",
          field: "assessment",
          formatFn: this.formatAssessment,
          sortFn: this.sortAssessment,
          tdClass: this.assessmentClass,
          width: "20%"
        }
      ];
    }
  },
  methods: {
    sortDate(x: TDate, y: TDate) {
      return x.year - y.year || x.month - y.month || x.day - y.day;
    },
    formatDate(date: TDate): string {
      return moment()
        .year(date.year)
        .month(date.month)
        .date(date.day)
        .locale("ru")
        .format("DD MMM YYYY");
    },
    sortType(x: number, y: number) {
      return x - y;
    },
    formatType(value: number): string {
      return this.$t(OperationType[value]).toString();
    },
    sortAssessment(x: number | null, y: number | null) {
      if (x !== null) {
        if (y !== null) {
          return x - y;
        }
        return -1;
      }
      return 1;
    },
    formatAssessment(value: number | null): string {
      return value !== null
        ? this.$t(Assessment[value]).toString()
        : this.$t("WITHOUT_RATING").toString();
    },
    assessmentClass({ assessment }: { assessment: number | null }): string {
      return `assessment assessment--${assessment}`;
    }
  }
});
</script>

<style lang="scss">
.vgt-table {
  width: 100%;
  border-spacing: 0;

  tr {
    th,
    td {
      &:first-child {
        padding-left: 10px;
      }
      &:last-child {
        padding-right: 10px;
      }
    }
  }

  thead tr {
    height: 40px;
    font-weight: 500;
    background: #edeeee;
    user-select: none;
    text-align: left;
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

  .sortable {
    cursor: pointer;

    span::after {
      content: "";
      display: inline-block;
      margin-left: 5px;
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 5px 5px 0 5px;
      border-color: #a7a9ac transparent transparent transparent;
    }
  }

  .sorting span::after {
    border-color: #007bff transparent transparent transparent;
  }

  .sorting-desc span::after {
    border-width: 0 5px 5px 5px;
    border-color: transparent transparent #007bff transparent;
  }
}
</style>
