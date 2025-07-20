import zx from 'zx';
import { ROVODEV_PATH } from './constants';
if (!zx.fs.existsSync(ROVODEV_PATH)) {
  zx.fs.mkdirSync(ROVODEV_PATH);
}

async function main() {
  // Startup checks:
  // Check if git is installed and exit gracefully if not
  if (!(await zx.which('git'))) {
    zx.echo(
      zx.chalk.yellow('Git is not installed. Please install it and try again.'),
    );
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}
