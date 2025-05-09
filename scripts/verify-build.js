#!/usr/bin/env node

const { spawnSync } = require("child_process");
const chalk = require("chalk");

console.log(chalk.blue("Starting build verification..."));

// Clean any previous builds
console.log(chalk.blue("Cleaning previous builds..."));
spawnSync("rm", ["-rf", ".next"], { stdio: "inherit" });

// Run the build
console.log(chalk.blue("Building project..."));
const buildResult = spawnSync("npm", ["run", "build"], {
  stdio: "inherit",
});

if (buildResult.status !== 0) {
  console.log(chalk.red("❌ Build failed!"));
  process.exit(1);
}

console.log(chalk.green("✅ Build successful!"));
console.log(chalk.blue("Your project should deploy correctly on Vercel."));
