<template>
    <a :href="url"><slot></slot></a>
</template>

<script setup lang="ts">
import { computed } from "vue"

const props = defineProps<{
    href: string
}>()

const url = computed(() => {
    let url = props.href
    if (!url.startsWith("http") && !["mailto:", "tel:", "ftp:"].some((prefix) => url.startsWith(prefix))) {
        url = "http://" + url
    }
    return url
})
</script>
