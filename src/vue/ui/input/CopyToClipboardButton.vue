<template>
    <IconButton :icon="success ? 'check' : 'copy'" :disabled="success" @click="handleCopy" />
</template>

<script setup lang="ts">
import { ref } from "vue"
import { copyTextToClipboard } from "../../../utilities/clipboard-utility"

const props = withDefaults(
    defineProps<{
        value?: string
        timeout?: number
    }>(),
    {
        timeout: 2500,
    }
)

const success = ref<boolean>()

function handleCopy() {
    copyTextToClipboard(props.value ?? "")
    success.value = true
    setTimeout(() => (success.value = undefined), props.timeout)
}

defineExpose({
    success,
})
</script>
