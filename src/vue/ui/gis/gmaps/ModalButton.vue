<template>
    <button type="button" @click="showModal = true">
        <slot><Icon name="map" /></slot>
        <teleport to="#modals">
            <DefaultModal :is-visible="showModal" :title="address" :show-footer="false" :full-width="true" @close="showModal = false">
                <GMap id="gmap_canvas" :modelValue="modelValue" :zoom="zoom" class="w-100" />
            </DefaultModal>
        </teleport>
    </button>
</template>

<script setup lang="ts">
import { ref, computed } from "vue"
import { DefaultModal } from "../../modal"
import GMap from "./GMap.vue"

const props = defineProps<{
    modelValue: Array<string | undefined> | string
    zoom?: number
}>()

const address = computed<string>(() => (Array.isArray(props.modelValue) ? props.modelValue : [props.modelValue]).filter((x) => x).join(" "))

const showModal = ref(false)
</script>

<style scoped>
#gmap_canvas {
    overflow: hidden;
    background: none !important;
    min-height: 75vh;
}
</style>
