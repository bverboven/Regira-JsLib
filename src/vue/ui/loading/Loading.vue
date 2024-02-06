<template>
  <img :src="img" />
</template>

<script setup lang="ts">
import { inject } from "vue";

const img = inject<string>("loadingImg");
</script>
