<template>
  <div class="bg-light text-info">
    <slot name="message">{{ msg }}</slot>
  </div>
</template>

<script setup lang="ts">
  withDefaults(
    defineProps<{
      msg: string;
    }>(),
    { msg: "Loading..." }
  );
</script>
