<template>
    <div class="position-relative">
        <textarea class="form-control" v-model="value" :readonly="readonly" v-bind="$attrs" @input="handleChange" />

        <button v-if="!readonly || value" type="button" class="btn btn-outline-info bg-light btn-sm position-absolute end-0 top-0" @click="showPopup = true">
            <Icon name="popOut" />
        </button>

        <Teleport to="#modals">
            <Modal v-if="showPopup" title="MarkDown input" :fullWidth="true" @submit="showPopup = false" @close="showPopup = false" @cancel="showPopup = false">
                <div style="position: relative; height: 75vh">
                    <textarea v-if="!readonly && !showDisplay" v-model="value" v-bind="$attrs" class="form-control" :style="{ width: '100%', height: '100%' }" @input="handleChange" />
                    <MarkDownDisplay v-if="readonly || showDisplay" :modelValue="value" :enablePopup="false" class="form-control" :style="{ width: '100%', height: '100%', overflow: 'auto' }" />

                    <button v-if="!readonly" type="button" class="btn btn-outline-secondary btn-sm bg-light position-absolute end-0 top-0" @click="showDisplay = !showDisplay">
                        <Icon :name="showDisplay ? 'markdown' : 'look'" />
                    </button>
                </div>
                <a href="https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet" target="_blank" class="float-end">
                    <Icon name="popOut" class="me-1" />
                    Markdown cheatsheet
                </a>
            </Modal>
        </Teleport>
    </div>
</template>
<script lang="ts">
export default {
    inheritAttrs: false,
}
</script>

<script setup lang="ts">
import { ref, watchEffect } from "vue"
import MarkDownDisplay from "./Display.vue"

const emit = defineEmits<{
    (e: "update:modelValue", args: string): void
}>()
const props = withDefaults(
    defineProps<{
        modelValue: string
        readonly?: boolean
    }>(),
    {
        modelValue: "",
        readonly: false,
    }
)

const value = ref()
const showPopup = ref(false)
const showDisplay = ref(false)

watchEffect(() => (value.value = props.modelValue))
function handleChange() {
    emit("update:modelValue", value.value)
}
</script>
