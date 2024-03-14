<template>
    <MyModal title="Forgot password" :showFooter="false">
        <slot v-bind="{ username }"></slot>
    </MyModal>
</template>

<script setup lang="ts">
defineProps<{
    username?: string
}>()
</script>
