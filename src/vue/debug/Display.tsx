import { getCurrentInstance } from "vue"

export function DebugDisplay({ modelValue }: { modelValue: object }) {
    const app = getCurrentInstance()
    return app?.appContext.config.globalProperties.$isDebug.value && <div class="debug pre text-muted">{JSON.stringify(modelValue, null, 2)}</div>
}

export default DebugDisplay
