const { getInput, setFailed } = require('@actions/core').core;
const { execSync } = require('child_process');
const { existsSync } = require('fs');
const { join } = require('path');

/**
 * Logs to the console
 */

const log = (msg) => console.log(`\n${msg}`);

/**
 * Exits the current process with an error code and message
 */
const exit = (msg) => {
  console.error(`\n${msg}`);
  process.exit(1);
};

/**
 * Executes the provided shell command
 */
const run = (cmd, cwd) => execSync(cmd, { encoding: 'utf8', stdio: 'inherit', cwd });

/**
 * Installs dependencies and run bot
 */
const runAction = () => {
  const pkgRoot = getInput('package_root');
  const pkgJsonPath = join(pkgRoot, 'package.json');
  const pkgLockPath = join(pkgRoot, 'package-lock.json');

  // Chose NPM or Yarn
  const useNpm = existsSync(pkgLockPath);
  log(`Action will run ${useNpm ? 'NPM' : 'Yarn'} commands in directory "${pkgRoot}"`);

  // Check for package.json
  if (!existsSync(pkgJsonPath)) {
    exit(`\`package.json\` file not found at path "${pkgJsonPath}"`);
  }

  // Install Packages
  log(`Installing dependencies using ${useNpm ? 'NPM' : 'Yarn'}…`);
  run(useNpm ? 'npm install' : 'yarn', pkgRoot);

  // Running Bot
  log(`Running bot at ${getInput(`file_name`)}...`);
  run(`node ${getInput(`file_name`)}`, pkgRoot);
};

try {
  runAction();
} catch (error) {
  setFailed(error.message);
}
