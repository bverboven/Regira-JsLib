<template>
    <Modal title="Sign in" :showFooter="false">
        <slot v-bind="{ username }">
            <LoginForm @success="$emit('success', $event)" @forgot-password="$emit('forgotPassword', $event)" @signing-in="$emit('signingIn', $event)" @fail="$emit('fail', $event)" />
        </slot>
    </Modal>
</template>

<script setup lang="ts">
import { type IEmits, type IProps } from "./useLoginForm"
import LoginForm from "./LoginForm.vue"

interface ILoginEmits extends IEmits {}
const emit = defineEmits<ILoginEmits>()

const props: IProps = defineProps<{
    username?: string
}>()
</script>
