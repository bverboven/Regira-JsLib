export function createQueryString(o: object): URLSearchParams {
    const p = new URLSearchParams()
    Object.entries(o || {}).forEach(([key, value]) => {
        if (Array.isArray(value)) {
            ;(value as []).forEach((v) => p.append(key, v))
        } else {
            p.append(key, value)
        }
    })
    return p
}
