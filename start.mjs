import { spawn } from 'node:child_process';
import process from 'node:process';

const isWindows = process.platform === 'win32';
const npm = isWindows ? 'npm.cmd' : 'npm';
const children = [];

function run(label, args) {
  const child = spawn(npm, args, {
    stdio: 'inherit',
    shell: isWindows,
    env: process.env,
  });
  children.push(child);
  child.on('exit', (code, signal) => {
    if (signal) console.log(`${label} stopped (${signal})`);
    else if (code !== 0) console.error(`${label} stopped with exit code ${code}`);
  });
  child.on('error', (err) => console.error(`${label} could not start: ${err.message}`));
}

console.log('Starting Smart Education frontend and backend...');
run('Backend', ['run', 'server']);
run('Frontend', ['run', 'dev']);

function shutdown() {
  for (const child of children) {
    if (!child.killed) child.kill('SIGTERM');
  }
}
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
process.on('exit', shutdown);
