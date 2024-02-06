<template>
  <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-3">
    <div class="col mb-3" v-for="item in items">
      <DashboardCard :item="item" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { DashboardItem } from "../../../entities";
import DashboardCard from "./DashboardCard.vue";

defineProps<{
  items: Array<DashboardItem>;
}>();
</script>
