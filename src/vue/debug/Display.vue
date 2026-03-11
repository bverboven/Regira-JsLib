<template>
    <div v-if="isDebug" class="debug pre text-muted">{{ value }}</div>
</template>

<script setup lang="ts">
import { computed, getCurrentInstance } from "vue"

const props = defineProps<{
    modelValue?: unknown
}>()

const instance = getCurrentInstance()
const isDebug = computed(() => !!(instance?.proxy as { $isDebug?: boolean } | null)?.$isDebug)
const value = computed(() => JSON.stringify(props.modelValue || {}, null, 2))
</script>
