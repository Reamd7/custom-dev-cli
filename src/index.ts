import * as zx from 'zx';
import { program } from 'commander';
import { VERSION_INFO } from './constants';
import { config_command } from './commands/config/command';
import { log_command } from './commands/log/command';
import { mcp_command } from './commands/mcp/command';
import { run_command } from './commands/run/command';

const command = program.showHelpAfterError();
zx.usePowerShell();

async function main() {
  // Startup checks:
  // Check if git is installed and exit gracefully if not
  if (!(await zx.which('git'))) {
    zx.echo(
      zx.chalk.yellow('Git is not installed. Please install it and try again.'),
    );
    process.exit(1);
  }
  const versionInfo = await VERSION_INFO();
  command.version(versionInfo);

  command
    .command('config')
    .description('Open the Custom Dev configuration file in your editor.')
    .action(config_command);

  command
    .command('log')
    .description('Open the Custom Dev log file in your editor.')
    .action(log_command);

  command
    .command('mcp')
    .description('Open the Custom Dev MCP configuration file in your editor.')
    .action(mcp_command);

  command
    .command('run')
    .description('Run the Custom Dev server.')
    .action(run_command);

  command.parse();
}

main();
