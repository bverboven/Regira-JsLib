<template>
    <a :href="url"><slot></slot></a>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { isEmail, isPhone } from "@/regira_modules/utilities/string-utility"

const props = defineProps<{
    href: string
}>()

const url = computed(() => {
    let url = props.href
    if (isEmail(url)) {
        if (!url.startsWith("mailto:")) {
            url = "mailto:" + url
        }
    } else if (isPhone(url)) {
        if (!url.startsWith("tel:")) {
            url = "tel:" + url
        }
    } else if (!url.startsWith("http") && !["mailto:", "tel:", "ftp:"].some((prefix) => url.startsWith(prefix))) {
        url = "http://" + url
    }
    return url
})
</script>
