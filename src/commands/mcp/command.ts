import path from 'node:path';
import { open_file_in_editor } from '../../common/editor';
import { DEFAULT_MCP_CONFIG_PATH } from '../../constants';
import fs from 'fs-extra';
export async function mcp_command() {
  const mcp_config_path = path.resolve(DEFAULT_MCP_CONFIG_PATH);
  if (
    !(await fs.exists(mcp_config_path)) ||
    (await fs.readFile(mcp_config_path, { encoding: 'utf-8' })).trim() === ''
  ) {
    await fs.ensureDir(path.dirname(mcp_config_path));
    await fs.writeFile(
      mcp_config_path,
      `{
    "mcpServer": {
    }
}`,
    );
  }
  await open_file_in_editor(DEFAULT_MCP_CONFIG_PATH);
}
