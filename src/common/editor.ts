import fs from 'fs-extra';
import path from 'node:path';
import * as zx from 'zx';
import * as shlex from 'shlex';

function detect_editor(): string | undefined {
  if (
    process.env.__CFBundleIdentifier === 'com.todesktop.230313mzl4w4u92' ||
    process.env.CURSOR_TRACE_ID
  ) {
    return 'cursor';
  }
  // TODO: Check if running in Windsurf terminal
  if (process.env.TERM_PROGRAM === 'Windsurf') {
    return 'windsurf';
  }

  if (process.env.TERM_PRODUCT === 'Trae') {
    return 'trae';
  }

  // dectect vscode
  if (
    process.env.TERM_PROGRAM === 'vscode' ||
    process.env.__CFBundleIdentifier === 'com.microsoft.VSCode' ||
    process.env.VSCODE_PROFILE_INITIALIZED === '1' ||
    process.env.VSCODE_INJECTION === '1'
  ) {
    return 'code';
  }

  // detect idea
  if (
    process.env.TERM_PROGRAM === 'JetBrains-IDE' ||
    process.env.__CFBundleIdentifier === 'com.jetbrains.intellij'
  ) {
    return 'idea';
  }

  return undefined;
}

export async function open_file_in_editor(file_path_string: string) {
  const file_path = path.resolve(file_path_string);
  const file_parent_path = path.dirname(file_path);
  await fs.ensureDir(file_parent_path);
  if (!(await fs.exists(file_path))) {
    // TODO: 补充示例 config 文件
    fs.writeFile(file_path, '');
  }

  let editor = detect_editor();

  if (!editor || !(await zx.which(editor))) {
    editor = process.env.EDITOR;
  }

  if (!editor) {
    zx.echo(
      zx.chalk.yellow(
        'No editor found, please set EDITOR environment variable',
      ),
    );
    return;
  }

  const editor_args = shlex.split(editor);

  await zx.$({
    stdio: 'inherit',
  })`${editor_args} ${file_path}`;

  // const [command, ...args] = editor_args

  // const child = spawn(command, [...args, file_path], {
  //   detached: true,
  //   stdio: 'ignore'
  // })

  // child.on('error', (error) => {
  //   zx.echo(
  //     zx.chalk.yellow(`Failed to open file '${file_path}' in the editor '${editor_args.join(' ')}': ${error.message}`)
  //   )
  // })

  // child.unref() // 允许父进程退出而不等待子进程

  // zx.echo(zx.chalk.green(`Opening file '${file_path}' in ${editor}`))
}
