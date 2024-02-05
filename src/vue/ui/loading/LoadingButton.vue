<template>
    <button type="button" class="btn" :disabled="disabled || isLoading">
        <LoadingImg v-if="isLoading" style="width: 1rem" />
        <template v-else>
            <slot></slot>
        </template>
    </button>
</template>

<script setup lang="ts">
import LoadingImg from "./Loading.vue"
defineProps<{ isLoading: boolean; disabled?: boolean }>()
</script>
