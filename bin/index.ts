#!/usr/bin/env node

import { Command } from "commander";
import  { createApp } from "../src/createApp.js";
import chalk from "chalk";
import path from "path";

const program = new Command();

program
    .name("create-sid-react-app")
    .description("Scaffold a new React + Vite project with optional tools")
    .argument("<project-name>", "Name of the project")
    .action(async (projectName: string) => {
        const targetDir = path.resolve(process.cwd(), projectName);
        await createApp(targetDir, projectName);
    });

program.parse();