# 📦 `create-sid-react-app`

A custom CLI tool to scaffold a new React project using your own templates, inspired by tools like `create-react-app` or `vite`. This CLI is built with Node.js and TypeScript and offers a clean foundation for bundling your own frontend setups.

---

## 🧠 Concepts Used (with Explanations)

### 1. **Node.js CLI Development**
> **Definition**: Command-Line Interfaces (CLIs) created using Node.js can automate repetitive tasks via terminal commands.

- We use the `bin` property in `package.json` to register a command (`create-sid-react-app`).
- Example:
  ```json
  "bin": {
    "create-sid-react-app": "./dist/bin/index.js"
  }
  ```
- `npm link` is used to symlink this CLI globally so it can be run like any shell command.

### 2. **ES Modules & `__dirname` Workaround**
> **Problem**: ES Modules (`type: module`) don’t support `__dirname` directly.
> **Solution**:
```ts
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
```

This gives us the current file path so we can work with relative file system paths.

### 3. **File System Utilities (fs-extra)**
> `fs-extra` is a drop-in replacement for Node’s `fs` module with extra features like recursive copy.

- Example:
```ts
import fs from 'fs-extra';
await fs.copy(templateDir, targetDir);
```

### 4. **Dynamic Project Creation with Templates**
> You can create reusable project templates like Vite or CRA do.

Your CLI copies a `template/` folder and installs dependencies:
```ts
await execAsync("npm install");
```

### 5. **Child Processes**
> Run terminal commands from Node.js code using `child_process`.

We used `exec` (promisified) to install npm dependencies.
```ts
import { exec } from 'child_process';
const execAsync = promisify(exec);
await execAsync("npm install");
```

### 6. **Commander for CLI Parsing**
> Used to create readable command structure and parse CLI arguments easily.

```ts
import { Command } from 'commander';
const program = new Command();
program.arguments('<project-name>')
       .action((projectName) => createApp(projectName, ...))
       .parse();
```

### 7. **Path Handling with `path` module**
> Works cross-platform for resolving directories and filenames.

```ts
const targetDir = path.resolve(projectName);
const appName = path.basename(targetDir);
```

---

## ✅ Flow of CLI Execution

### Step 1: Setup CLI entry point
- File: `src/bin/index.ts`
```ts
import { Command } from 'commander';
program.command('create-sid-react-app <project-name>')
```

### Step 2: Accept project name and compute target path
- Example:
```bash
create-sid-react-app my-app
```

### Step 3: Copy template files
```ts
await fs.copy(templateDir, targetDir);
```

### Step 4: Modify `package.json`
```ts
const appName = path.basename(targetDir);
pkgJson.name = appName;
```

### Step 5: Run `npm install`
```ts
await execAsync("npm install");
```

---

## 📁 Recommended Folder Structure

```
create-sid-react-app/
├── bin/
│   └── index.ts           # CLI entry point
├── src/
│   └── createApp.ts       # Core logic
├── template/              # Your React boilerplate
│   ├── package.json
│   └── index.html
├── tsconfig.json
├── package.json
└── README.md
```

---

## ⚙️ Prerequisites to Understand

| Concept             | Required? | Notes |
|--------------------|-----------|-------|
| Node.js (v18+)     | ✅        | Needed for ES modules support |
| TypeScript basics  | ✅        | For authoring CLI code |
| NPM / CLI usage    | ✅        | Running scripts and linking packages |
| File System (fs)   | ✅        | To manipulate directories |
| Child Process      | ✅        | Running shell commands from Node |

---

## 📄 Example `template/package.json`
```json
{
  "name": "template",
  "version": "1.0.0",
  "scripts": {
    "dev": "vite"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "vite": "^5.0.0"
  }
}
```

---

## 🚀 Next Ideas
- Add template variants (React + Tailwind, React + TS, etc.)
- Add interactive prompts using `inquirer`
- Add Git initialization
- Add prettier + eslint auto-setup
- Add plugin system like Vite

Let me know if you'd like to continue building these features!

