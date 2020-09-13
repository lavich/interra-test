<template>
  <div class="radio-selector">
    <label
      v-for="(option, idx) in options"
      :key="idx"
      class="radio-selector__label"
    >
      <input
        type="radio"
        @change="$emit('input', idx)"
        :checked="option === options[value]"
        class="visually-hidden"
      />
      <span>{{ option }}</span>
    </label>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";

export default Vue.extend({
  name: "RadioSelector",
  props: {
    value: {
      type: Number,
      required: true
    },
    options: {
      type: Array as PropType<string[]>,
      required: true
    }
  }
});
</script>

<style scoped lang="scss">
.radio-selector {
  &__label {
    display: inline-block;
    padding: 12px 0;

    span {
      user-select: none;
      cursor: pointer;
      font-weight: 500;
      font-size: 11px;
      line-height: 13px;
      letter-spacing: -0.517647px;
      text-transform: uppercase;
      color: #3399ff;
    }

    input:checked + span {
      color: #333333;
      cursor: default;
    }
  }

  &__label + &__label {
    margin-left: 18px;
  }
}
</style>
