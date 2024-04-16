function fallbackCopyTextToClipboard(text: string) {
    const textArea = document.createElement("textarea")
    textArea.value = text

    // Avoid scrolling to bottom
    textArea.style.top = "0"
    textArea.style.left = "0"
    textArea.style.position = "fixed"

    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()

    const successful = document.execCommand("copy")
    document.body.removeChild(textArea)

    return Promise.resolve(successful)
}

export function copyTextToClipboard(text: string) {
    if (!navigator.clipboard) {
        return fallbackCopyTextToClipboard(text)
    }
    return navigator.clipboard.writeText(text)
}

export default copyTextToClipboard
