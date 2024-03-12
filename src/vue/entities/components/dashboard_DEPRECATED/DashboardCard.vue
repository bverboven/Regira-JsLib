<template>
    <div class="card h-100">
        <div class="card-header">
            <slot name="header">
                <h5 class="card-title">
                    {{ item.title }}
                </h5>
            </slot>
        </div>
        <div class="card-body" style="min-height: 7.5rem">
            <div class="card-text">
                <div class="row">
                    <div class="col-4">
                        <slot name="icon">
                            <router-link :to="{ name: item.name, query: item.initialQuery || {} }" class="btn btn-link pt-0 mt-0">
                                <Icon :name="item.icon" size="xl" />
                            </router-link>
                        </slot>
                    </div>
                    <div class="col">
                        <slot name="desc">
                            <div class="text-muted mb-0" v-html="item.description"></div>
                        </slot>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { IDashboardItem } from "./dashboard"

defineProps<{
    item: IDashboardItem
}>()
</script>

<style scoped lang="scss">
.card {
    .card-header {
        background-color: rgba(0, 0, 255, 0.03);
    }
}
</style>
