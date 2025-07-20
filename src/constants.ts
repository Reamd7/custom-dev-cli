import { lazyVal } from './utils/lazyValue';
import * as zx from 'zx';
import os from 'node:os';
import fs from 'fs-extra';

export const CUSTOMDEV_PATH = `${os.homedir()}/.customdev`;
export const DEFAULT_CONFIG_PATH = `${CUSTOMDEV_PATH}/config.yml`;
export const DEFAULT_LOG_PATH = `${CUSTOMDEV_PATH}/customdev.log`;
export const DEFAULT_MCP_CONFIG_PATH = `${CUSTOMDEV_PATH}/mcp.json`;
export const DEFAULT_PROMPT_HISTORY_PATH = `${CUSTOMDEV_PATH}/prompt_history`;
export const DEFAULT_SESSIONS_PATH = `${CUSTOMDEV_PATH}/sessions`;

export const WORKSPACE_MEMORY_FILE_NAMES = ['.agent.md', '.agent.local.md'];
export const USER_MEMORY_FILE_NAMES = ['.customdev/.agent.md'];
const __version__ = '0.8.2';

if (!fs.existsSync(CUSTOMDEV_PATH)) {
  fs.mkdirSync(CUSTOMDEV_PATH);
}

export const VERSION_INFO = lazyVal(async () => {
  let git_version: string;
  try {
    git_version = (await zx.$`git --version`).stdout.toString().trim();
  } catch {
    git_version = 'unknown';
  }
  return `Custom Dev CLI: ${__version__}
Operating System: ${os.version()} ${os.release()} ${os.machine()}
Git: ${git_version}`;
});
