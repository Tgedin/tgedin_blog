#!/usr/bin/env node

const { spawnSync } = require("child_process");
const chalk = require("chalk");

// Get staged files
const stagedFiles = spawnSync("git", [
  "diff",
  "--cached",
  "--name-only",
  "--diff-filter=ACMR",
])
  .stdout.toString()
  .trim()
  .split("\n")
  .filter((file) => file.endsWith(".js") || file.endsWith(".jsx"));

if (stagedFiles.length) {
  console.log(chalk.blue("Running ESLint on staged files..."));

  const eslintResult = spawnSync("npx", ["eslint", "--fix", ...stagedFiles], {
    stdio: "inherit",
  });

  if (eslintResult.status !== 0) {
    console.log(
      chalk.red("ESLint found errors. Please fix them before committing.")
    );
    process.exit(1);
  }

  // Add the fixed files back to the staging area
  spawnSync("git", ["add", ...stagedFiles]);
}

// Run a test build to make sure everything compiles
console.log(chalk.blue("Running test build..."));
const buildResult = spawnSync("npm", ["run", "build"], {
  stdio: "inherit",
  env: { ...process.env, CI: "true" }, // Run in CI mode to ensure it fails on errors
});

if (buildResult.status !== 0) {
  console.log(
    chalk.red("Build failed. Please fix the errors before committing.")
  );
  process.exit(1);
}

console.log(chalk.green("All checks passed!"));
