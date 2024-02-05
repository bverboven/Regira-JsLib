<template>
  <div class="details-summary">
    <div class="row" v-for="(value, key, i) in item" :class="{ 'bg-light': i % 2 == 0 }">
      <!-- Collection -->
      <template v-if="Array.isArray(value)">
        <div class="col">
          <span class="fw-bold">{{ key }}</span>
          <template v-for="(subItem, i2) in item[key]">
            <div>({{ i2 + 1 }}.)</div>
            <DetailsSummary :modelValue="subItem" class="ms-5" />
          </template>
        </div>
      </template>
      <!-- Object -->
      <template v-else-if="typeof value == 'object'">
        <div class="col fw-bold">{{ key }}</div>
        <div class="col-12"><DetailsSummary :modelValue="value" class="ms-5" /></div>
      </template>
      <!-- Simple property -->
      <template v-else>
        <div class="col fw-bold">{{ key }}</div>
        <div class="col">{{ value }}</div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({}),
  },
});

const item = computed({
  get() {
    return props.modelValue;
  },
});
</script>
