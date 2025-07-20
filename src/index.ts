import * as zx from 'zx';
import { program } from 'commander';
import { VERSION_INFO } from './constants';
import { config_command } from './commands/config/command';

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

  command.parse();
}

main();
