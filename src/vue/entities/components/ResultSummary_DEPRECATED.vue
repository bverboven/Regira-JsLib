<template>
    <div class="text-info">
        <span>
            {{ visibleCount }} <template v-if="totalCount != null">/ {{ totalCount }}</template> results
        </span>
    </div>
</template>

<script setup lang="ts">
defineProps<{ visibleCount: number; totalCount?: number | null }>()
</script>
