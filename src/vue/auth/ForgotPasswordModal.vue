<template>
    <Modal title="Forgot password" :showFooter="false">
        <slot v-bind="{ username }"></slot>
    </Modal>
</template>

<script setup lang="ts">
defineProps<{
    username?: string
}>()
</script>
