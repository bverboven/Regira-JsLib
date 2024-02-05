<template>
    <div class="position-relative">
        <slot name="loading">
            <Loading v-if="isLoading" class="position-absolute top-0 start-50 translate-middle-x" style="width: 20rem; max-width: 100%;" />
        </slot>
        <div :style="{ opacity: isLoading ? '0.4' : '' }">
            <slot></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
import Loading from "./Loading.vue"
defineProps<{ isLoading: boolean }>()
</script>
