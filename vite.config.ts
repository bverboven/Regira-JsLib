import { defineConfig } from "vite"
import { resolve } from "path"
import vue from "@vitejs/plugin-vue"
import { fileURLToPath } from "url"

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
    },
    build: {
        lib: {
            entry: {
                // root
                "index": resolve(__dirname, "src/index.ts"),
                // top-level modules
                "entities/index": resolve(__dirname, "src/entities/index.ts"),
                "events/index": resolve(__dirname, "src/events/index.ts"),
                "extensions/index": resolve(__dirname, "src/extensions/index.ts"),
                "firebase/index": resolve(__dirname, "src/firebase/index.ts"),
                "identity/index": resolve(__dirname, "src/identity/index.ts"),
                "io/index": resolve(__dirname, "src/io/index.ts"),
                "treelist/index": resolve(__dirname, "src/treelist/index.ts"),
                "utilities/index": resolve(__dirname, "src/utilities/index.ts"),
                // vue modules
                "vue/index": resolve(__dirname, "src/vue/index.ts"),
                "vue/app/index": resolve(__dirname, "src/vue/app/index.ts"),
                "vue/auth/index": resolve(__dirname, "src/vue/auth/index.ts"),
                "vue/debug/index": resolve(__dirname, "src/vue/debug/index.ts"),
                "vue/directives/index": resolve(__dirname, "src/vue/directives/index.ts"),
                "vue/entities/index": resolve(__dirname, "src/vue/entities/index.ts"),
                "vue/formatters/index": resolve(__dirname, "src/vue/formatters/index.ts"),
                "vue/http/index": resolve(__dirname, "src/vue/http/index.ts"),
                "vue/ioc/index": resolve(__dirname, "src/vue/ioc/index.ts"),
                "vue/lang/index": resolve(__dirname, "src/vue/lang/index.ts"),
                "vue/online/index": resolve(__dirname, "src/vue/online/index.ts"),
                "vue/ui/index": resolve(__dirname, "src/vue/ui/index.ts"),
            },
            formats: ["es"],
        },
        rollupOptions: {
            external: ["axios", "date-fns", "lodash", "pinia", "vue", "vue-router"],
            output: {
                chunkFileNames: "_chunks/[name]-[hash].js",
            },
        },
    },
})
