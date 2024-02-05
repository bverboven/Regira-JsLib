<template>
    <i :class="className" :style="style" />
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

const className = computed(() => iconMap.get(props.name))
const fontSizes = { sm: 0.75, md: 1, lg: 2, xl: 3 }
const style = computed(() => ({ "font-size": `${fontSizes[props.size]}rem` }))
</script>
