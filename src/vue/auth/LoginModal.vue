<template>
    <MyModal :title="title" :showFooter="false">
        <slot v-bind="{ username }">
            <LoginForm @success="$emit('success', $event)" @forgot-password="$emit('forgotPassword', $event)" @signing-in="$emit('signingIn', $event)" @fail="$emit('fail', $event)" />
        </slot>
    </MyModal>
</template>

<script setup lang="ts">
import { type IEmits, type IProps } from "./useLoginForm"
import LoginForm from "./LoginForm.vue"

interface ILoginEmits extends IEmits {}
const emit = defineEmits<ILoginEmits>()

const props: IProps = withDefaults(
    defineProps<{
        username?: string
        title?: string
    }>(),
    {
        title: "Sign in",
    }
)
</script>
