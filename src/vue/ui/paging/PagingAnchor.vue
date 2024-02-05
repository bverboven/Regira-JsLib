<template>
  <router-link class="page-link" :to="to" :title="to" :title1="'page ' + page" activeClass="active-page">
    <slot>{{ page }}</slot>
  </router-link>
</template>

<script setup lang="ts">
  import type { RouteLocationRaw } from "vue-router";

  defineProps<{ to: RouteLocationRaw; page: number }>();
</script>
