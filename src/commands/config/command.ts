import { open_file_in_editor } from '../../common/editor';
import { DEFAULT_CONFIG_PATH } from '../../constants';
export async function config_command() {
  await open_file_in_editor(DEFAULT_CONFIG_PATH);
}
