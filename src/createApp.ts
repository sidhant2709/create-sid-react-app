import fs from "fs-extra";
import { fileURLToPath } from "url";
import path from "path";
import chalk from "chalk";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function createApp(projectName: string, targetDir: string) {
    console.log(chalk.cyan(`\nCreating project: ${projectName}`));

    const templateDir = path.resolve(__dirname, "../../template");
    await fs.copy(templateDir, targetDir);
    console.log(chalk.green("✔ Template copied"));

    const pkgJsonPath = path.join(targetDir, "package.json");
    const pkgJson = await fs.readJson(pkgJsonPath);
    const appName = path.basename(targetDir);
    pkgJson.name = appName;
    await fs.writeJson(pkgJsonPath, pkgJson, { spaces: 2 });

    process.chdir(targetDir);

    console.log(chalk.yellow("Installing dependencies..."));

    await execAsync("npm install");

    console.log(chalk.green("✔ Dependencies installed"));

    console.log(chalk.blue("\nAll done! Run the following:"));
    console.log(chalk.bold(`\ncd ${projectName} && npm run dev\n`));
}