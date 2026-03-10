import { execSync } from "child_process"

// Step 1: Vite build (must succeed)
execSync("npx vite build", { stdio: "inherit" })

// Step 2: TypeScript declarations (non-fatal — TS still emits .d.ts files even with errors)
try {
    execSync("npx vue-tsc --emitDeclarationOnly", { stdio: "inherit" })
} catch {
    console.warn("\n⚠  TypeScript errors found. Declaration files were still generated.\n")
}
