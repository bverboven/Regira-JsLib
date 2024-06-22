<template>
    <input
        autocomplete="__away"
        type="text"
        v-bind="$attrs"
        v-model="q"
        v-click-outside="closeGently"
        @input="handleInput"
        @focus="handleFocus"
        @dblclick="handleDblClick"
        @blur="handleBlur"
        @change="handleChange"
        @keydown.down="moveSelection(1)"
        @keydown.up="moveSelection(-1)"
        @keydown.enter.prevent="handleSelect(selectedItem, selectedIndex)"
        ref="inputEl"
    />
    <div class="autocomplete-items bg-white border" :class="resultClass" :style="resultStyle">
        <div class="list-group" :class="itemsClass">
            <div class="loading list-group-item" v-show="isLoading">Loading...</div>
            <div
                v-for="(item, i) in items"
                :key="i"
                @click="handleSelect(item, i)"
                class="autocomplete-item list-group-item list-group-item-action"
                :class="[itemClass, { 'bg-light': i == selectedIndex }]"
            >
                <slot :item="item" :q="q">
                    <div v-html="resultItemFormatter(item, q)"></div>
                </slot>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
// use normal <script> to declare options
export default {
    inheritAttrs: false,
}
</script>

<script setup lang="ts">
import { useAutocomplete, autocompleteEmits, propsDefaults } from "./autocomplete"

const emit = defineEmits(autocompleteEmits)
const props = withDefaults(
    defineProps<{
        idValue?: number | string
        modelValue?: object | string
        data?: Array<any>
        maxResults?: number
        debounceTime?: number
        enableDblClick?: boolean
        autoSelect?: boolean
        allowFreeInput?: boolean

        resultClass?: string
        itemsClass?: string
        itemClass?: string

        search?(term?: string): Promise<Array<any>>
        idSelector?(item?: object): number | string | undefined
        displayItemFormatter?(item?: object): string
        resultItemFormatter?(item?: object, q?: string): string
    }>(),
    {
        ...propsDefaults,
    }
)

const {
    q,
    selectedItem,
    selectedIndex,
    items,
    //isOpen,
    isFocus,
    inputEl,
    resultStyle,
    isLoading,
    resultItemFormatter,
    closeGently,
    moveSelection,
    handleInput,
    handleChange,
    handleSelect,
    handleSearch,
    reset,
} = useAutocomplete(props, { emit })

function handleFocus() {
    isFocus.value = true
    const id = (props.idSelector && props.idSelector(selectedItem.value)) || "new"
    if (id == "new" || selectedItem.value == null) {
        handleSearch()
    }
}
function handleBlur() {
    isFocus.value = false
    closeGently()
}
function handleDblClick() {
    if (props.enableDblClick) {
        handleSearch("")
    }
}

defineExpose({
    inputEl,
    q,
    selectedItem,
    search: handleSearch,
    reset,
    resetQ() {
        if (!isFocus.value) {
            q.value = ""
        }
        //inputEl.value!.value = ""
    },
})
</script>
