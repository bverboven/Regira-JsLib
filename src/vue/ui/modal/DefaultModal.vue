<template>
    <transition name="modal">
        <div v-if="isVisible" class="modal-mask" @keydown.esc="handleClose">
            <div class="modal-wrapper">
                <div class="modal show d-block" tabindex="-1">
                    <div class="modal-dialog modal-dialog-scrollable" :class="{ 'full-width': fullWidth }">
                        <div class="modal-content" :style="{ 'min-height': fullWidth ? '60vh' : 'inherit' }">
                            <div v-if="showHeader" class="modal-header py-2" :class="titleClass">
                                <div class="d-flex justify-content-between w-100">
                                    <slot name="title">
                                        <h3 class="modal-title">
                                            <template v-if="isDanger">
                                                <Icon name="alert" class="me-2" />
                                            </template>
                                            <template v-if="isWarning">
                                                <Icon name="warning" class="me-2" />
                                            </template>
                                            {{ title }}
                                        </h3>
                                    </slot>
                                    <slot name="header-close-button" :handleClose="handleClose">
                                        <IconButton icon="close" :class="[isDanger ? 'btn-danger' : 'btn-outline-danger']" title="close" @click="handleClose" data-dismiss="modal" />
                                    </slot>
                                </div>
                            </div>
                            <div class="modal-body" :class="contentClass">
                                <slot></slot>
                            </div>

                            <div v-if="showFooter" class="modal-footer py-1" :class="footerClass">
                                <slot name="buttons">
                                    <div class="d-flex justify-content-between w-100">
                                        <slot name="footer-close-button" :handleCancel="handleCancel">
                                            <div><IconButton icon="cancel" class="btn-outline-secondary" @click="handleCancel">Cancel</IconButton></div>
                                        </slot>
                                        <slot name="footer-submit-button" :handleClose="handleSubmit">
                                            <div><IconButton icon="submit" :class="isDanger ? 'btn-danger' : 'btn-success'" @click="handleSubmit">Submit</IconButton></div>
                                        </slot>
                                    </div>
                                </slot>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script setup lang="ts">
import "./style.scss"
import { computed } from "vue"
import { ModalType } from "./modal"

const emit = defineEmits<{
    (e: "submit"): void
    (e: "cancel"): void
    (e: "close"): void
}>()
const props = withDefaults(
    defineProps<{
        title?: string
        isVisible: boolean
        showHeader?: boolean
        showFooter?: boolean
        fullWidth?: boolean
        type?: ModalType
    }>(),
    {
        showHeader: true,
        showFooter: true,
        type: ModalType.normal,
    }
)

const isNormal = computed(() => props.type === ModalType.normal)
const isSuccess = computed(() => props.type === ModalType.success)
const isWarning = computed(() => props.type === ModalType.warning)
const isDanger = computed(() => props.type === ModalType.danger)

const titleClass = computed(() => ({
    "bg-normal": isNormal.value,
    "bg-success": isSuccess.value,
    "bg-danger": isDanger.value,
    "text-white": isDanger.value,
    "bg-warning": isWarning.value,
}))
const contentClass = computed(() => ({
    "text-danger": isDanger.value,
}))
const footerClass = computed(() => ({}))

const handleClose = () => emit("close")
const handleCancel = () => emit("cancel")
const handleSubmit = () => emit("submit")
</script>
