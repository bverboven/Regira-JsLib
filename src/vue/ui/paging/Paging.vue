<template>
    <nav aria-label="Pagination">
        <ul class="pagination">
            <li class="page-item">
                <slot name="firstPage" :page="1">
                    <component :is="PagingElement" :page="1" :to="pagedRoute(1)" @click.prevent="handleChangePage(1)" aria-label="Previous">&laquo;</component>
                </slot>
            </li>
            <li class="page-item" v-for="p in pages" :key="p" :class="{ active: p == page }">
                <slot name="default" :page="p" :route="pagedRoute(p)" :handleChange="handleChangePage">
                    <component :is="PagingElement" :page="p" :to="pagedRoute(p)" @click.prevent="handleChangePage(p)">{{ p }}</component>
                </slot>
            </li>
            <li class="page-item">
                <slot name="lastPage" :page="totalPages">
                    <component :is="PagingElement" :page="totalPages" :to="pagedRoute(totalPages)" @click.prevent="handleChangePage(totalPages)" aria-label="Next"> &raquo; </component>
                </slot>
            </li>
        </ul>
    </nav>
</template>

<script setup lang="ts">
import type { IPagingInfo } from "@/vue_modules/entities/abstractions/PagingInfo"
import { toRefs } from "vue"
import { useVModelField } from "@/vue_modules/vue-helper"
import usePaging, { ButtonType, type PagingEmits, pagingDefaults } from "./paging"
import PagingAnchor from "./PagingAnchor.vue"
import PagingButton from "./PagingButton.vue"

interface Emits extends PagingEmits {}

const emit = defineEmits<Emits>()
const props = withDefaults(
    defineProps<{
        modelValue: IPagingInfo
        count: number
        maxPages?: number
        buttonType?: ButtonType
    }>(),
    { ...pagingDefaults }
)

const pagingInfo = useVModelField<IPagingInfo>(props, emit)
const { count } = toRefs(props)

const PagingElement = props.buttonType == ButtonType.button ? PagingButton : PagingAnchor

const { pagedRoute, page, totalPages, pages, handleChangePage } = usePaging({
    pagingInfo,
    count,
    maxPages: props.maxPages,
    emit,
})
</script>
