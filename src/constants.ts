import { lazyVal } from './utils/lazyValue';
import zx from 'zx';

export const ROVODEV_PATH = `${zx.os.homedir()}/.rovodev`;
export const DEFAULT_CONFIG_PATH = `${ROVODEV_PATH}/config.yml`;
export const DEFAULT_LOG_PATH = `${ROVODEV_PATH}/rovodev.log`;
export const DEFAULT_MCP_CONFIG_PATH = `${ROVODEV_PATH}/mcp.json`;
export const DEFAULT_PROMPT_HISTORY_PATH = `${ROVODEV_PATH}/prompt_history`;
export const DEFAULT_SESSIONS_PATH = `${ROVODEV_PATH}/sessions`;

export const WORKSPACE_MEMORY_FILE_NAMES = ['.agent.md', '.agent.local.md'];
export const USER_MEMORY_FILE_NAMES = ['.rovodev/.agent.md'];
const __version__ = '0.8.2';

export const VERSION_INFO = lazyVal(async () => {
  let git_version: string;
  try {
    git_version = await zx.$({
      stdio: 'inherit',
    })`git --version`.stdout
      .toString()
      .trim();
  } catch {
    git_version = 'unknown';
  }
  return `Rovo Dev CLI: ${__version__}
Operating System: ${zx.os.version()} ${zx.os.release()} ${zx.os.machine()}
Git: ${git_version}`;
});
