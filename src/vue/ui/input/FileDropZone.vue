<template>
    <div @drop.prevent="handleDrop" @dragover.prevent="isDropping = true" @dragleave.prevent="isDropping = false">
        <slot :isDropping="isDropping"></slot>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue"

const emit = defineEmits<{
    (e: "drop-files", files: Array<Blob>): void
}>()

const isDropping = ref<boolean>()

async function handleDrop(e: any) {
    emit("drop-files", [...e.dataTransfer.files])
}

defineExpose({
    isDropping,
})
</script>
