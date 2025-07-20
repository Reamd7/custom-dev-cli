import { open_file_in_editor } from '../../common/editor';
import { DEFAULT_LOG_PATH } from '../../constants';
export async function log_command() {
  await open_file_in_editor(DEFAULT_LOG_PATH);
}
