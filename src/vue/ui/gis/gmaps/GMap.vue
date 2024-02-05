<template>
    <iframe :src="gmapsUrl" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" allowfullscreen></iframe>
</template>

<script setup lang="ts">
import { computed } from "vue"

const props = defineProps<{
    modelValue: Array<string | undefined> | string
    zoom?: number
}>()

const address = computed<string>(() => (Array.isArray(props.modelValue) ? props.modelValue : [props.modelValue]).filter((x) => x).join(" "))
const gmapsUrl = computed<string>(() => `https://maps.google.com/maps?q=${encodeURIComponent(address.value)}&t=&z=${props.zoom || 10}&ie=UTF8&iwloc=&output=embed`)
</script>
