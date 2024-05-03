<template>
    <button :type="type" class="btn">
        <Icon :name="icon" :size="size" />
        <slot></slot>
    </button>
</template>

<script setup lang="ts">
import type { IconSize } from "."

withDefaults(
    defineProps<{
        icon: string
        size?: IconSize
        type?: "button" | "submit" | "reset"
    }>(),
    {
        type: "button",
    }
)
</script>
