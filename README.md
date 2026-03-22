# Regira Modules

## Updating

```bash
npx npm-check-updates
npx npm-check-updates -u

npm install

npm audit fix
```

## publish

*Increase (major/minor/patch) version*
```bash
npm version patch --no-git-tag-version
npm version minor --no-git-tag-version
npm version major --no-git-tag-version
```

```bash
npm run build
```

## git import

https://github.com/bverboven/Regira-JsLib

*package.json*
```json
  "dependencies": {
    "regira_modules": "github:bverboven/Regira-JsLib"
  }
```

*vite.config.ts*
```ts
  resolve: {
    alias: [
      // order is important!
      { find: "@/regira_modules", replacement: fileURLToPath(new URL("./node_modules/regira_modules/dist", import.meta.url)) },
      { find: "@", replacement: fileURLToPath(new URL("./src", import.meta.url)) },
    ]
  }
```

*tsconfig.app.json*
```json
  "compilerOptions": {
    "paths": {
      "@/regira_modules/*": ["./node_modules/regira_modules/dist/*"],
      "@/*": ["./src/*"]
    },
  }
```

## symlinks (legacy)

```bash
mklink /J "regira_modules" "C:\Projects\Regira\Regira-JsLib\src"
```

*vite.config.ts*
```ts
  // ...
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
    preserveSymlinks: true
  },
  // ...
  server: {
    fs: {
      allow: [
        "C:/Projects/Regira" // add to enable symlink...
      ]
    }
  }
```
