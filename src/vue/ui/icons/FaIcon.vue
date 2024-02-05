<template>
    <i :class="className" />
</template>

<script setup lang="ts">
import { computed } from "vue"
import { type IconSize, iconMap } from "./icons"

const props = withDefaults(
    defineProps<{
        name: string
        size?: IconSize
    }>(),
    {
        size: "md",
    }
)

if (!iconMap.has(props.name)) {
    console.warn(`Icon ${props.name} not found`, { icons: iconMap.values() })
}

const fontSizes = { sm: "fa-sm", md: "fa-md", lg: "fa-lg", xl: "fa-3x" }
const className = computed(() => [iconMap.get(props.name), fontSizes[props.size]])
</script>
