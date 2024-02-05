<template>
    <select v-model="value">
        <slot v-if="showEmptyOption">
            <option :value="emptyValue">{{ emptyText }}</option>
        </slot>
        <option v-for="item in items" :value="idProp ? item[idProp] : item">{{ titleFunc(item) }}</option>
    </select>
</template>

<script setup lang="ts">
import { ref, computed, unref, toRefs } from "vue"
import type { IEntity } from "../../abstractions/IEntity"

type Props = {
    modelValue: number | string | [] | object
    data: []
    dataUrl: string
    dataFunc(): Promise<[]>
    idProp: string
    titleFunc(o: IEntity | string): string
    showEmptyOption: boolean
    emptyValue: object
    emptyText: string
}

const emit = defineEmits<{ (e: "update:modelValue", args: any): void }>()
const props = withDefaults(defineProps<Props>(), {
    titleFunc: (x: IEntity | string) => (typeof x == "string" ? x : x.$title) || "",
    showEmptyOption: true,
})

if (!props.data && !props.dataFunc && !props.dataUrl) {
    console.error("props data OR dataUrl is required")
}

const items = computed(() => props.data || resultData.value)

const resultData = ref([])
if (props.data == null) {
    resultData.value = unref(await Promise.resolve(props.dataFunc()))
}

const { modelValue: value } = toRefs(props)
</script>
