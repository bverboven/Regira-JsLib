<template>
    <div v-if="$isDebug.value" class="debug pre text-muted">{{ value }}</div>
</template>

<script setup lang="ts">
import { computed } from "vue"

const props = defineProps<{
    modelValue?: any
}>()

const value = computed(() => JSON.stringify(props.modelValue || {}, null, 2))
</script>
