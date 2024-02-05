<template>
    <div>
        <Paging v-model="so" :count="555" />
    </div>
</template>

<script setup lang="ts">
import type { IPagingInfo } from "@/vue_modules/entities/abstractions/PagingInfo"
import { ref } from "vue"
import Paging from "./Paging.vue"

const so = ref<IPagingInfo>({ page: 2, pageSize: 20 })
</script>
