<template>
    <small class="form-text text-muted" :class="autoHide ? 'd-none d-md-inline' : 'd-inline'">{{ label }}</small>
</template>

<script setup lang="ts">
withDefaults(
    defineProps<{
        label: string
        autoHide?: boolean
    }>(),
    {
        autoHide: false,
    }
)
</script>
