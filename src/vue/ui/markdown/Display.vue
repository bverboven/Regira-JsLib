<template>
    <div class="position-relative h-100">
        <div v-if="modelValue" v-html="parsedMd" class="h-100"></div>

        <button v-if="enablePopup" type="button" class="btn btn-outline-secondary btn-sm bg-light position-absolute end-0 top-0" @click="showPopup = true">
            <Icon name="popOut" />
        </button>
        <Teleport to="#modals">
            <MyModal v-if="showPopup" :title="title" :showFooter="false" :fullWidth="true" @close="showPopup = false" @cancel="showPopup = false">
                <div style="position: relative; height: 75vh">{{ modelValue }}</div>
            </MyModal>
        </Teleport>
    </div>
</template>

<script setup lang="ts">
import { marked } from "marked"
import { ref, watchEffect } from "vue"

const props = withDefaults(
    defineProps<{
        modelValue?: string
        enablePopup?: boolean
        title?: string
    }>(),
    {
        modelValue: "",
        enablePopup: true,
        title: "MarkDown parser",
    }
)

marked.use({
    mangle: false,
    headerIds: false,
})

const parsedMd = ref(marked(props.modelValue))
const showPopup = ref(false)

watchEffect(() => (parsedMd.value = marked(props.modelValue)))
</script>
