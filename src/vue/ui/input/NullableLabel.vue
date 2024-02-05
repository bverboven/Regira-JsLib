<template>
    <span :class="{ 'italic-muted': !label }">
        <template v-if="label">{{ label }}</template>
        <template v-else><slot></slot></template>
    </span>
</template>

<script setup lang="ts">
defineProps<{
    label?: string
}>()
</script>
