import assert from 'node:assert';
import * as shlex from 'shlex';

class CommandRegistry {
  private static _instance: CommandRegistry | null = null;
  private constructor() {}

  public static get new() {
    if (!CommandRegistry._instance) {
      CommandRegistry._instance = new CommandRegistry();
    }
    return CommandRegistry._instance;
  }

  private _commands: Record<string, Record<string, any>> = {};

  public register({
    command,
    sub_command,
    help = undefined,
    extended_help = undefined,
    disable_for_external = false,
    user_email = process.env.USER_EMAIL,
  }: {
    command: string;
    sub_command?: string;
    help?: string;
    extended_help?: string;
    disable_for_external?: boolean;
    user_email?: string;
  }) {
    const decorator = <T>(func: T) => {
      assert(command !== '/help', 'Command `/help` is reserved.');
      assert(sub_command !== 'help', 'Subcommand `help` is reserved.');
      if (!disable_for_external) {
        if (sub_command) {
          assert(
            !!this._commands[command]?.[sub_command] === true,
            `Registry for ${command}, ${sub_command} already exists.`,
          );
        } else {
          assert(
            !!this._commands[command] === true,
            `Registry for ${command} already exists.`,
          );
        }
      }

      return func;
    };
    return decorator;
  }

  get commands() {
    return [...Object.keys(this._commands), '/help'];
  }

  public dispatch(message: string, ..._args: unknown[]) {
    if (!message) return undefined;

    let parts: string[];
    try {
      parts = shlex
        .split(message)
        .map((item) => item.trim())
        .filter((item) => item !== '');
    } catch (_error) {
      parts = message
        .split(' ')
        .map((item) => item.trim())
        .filter((item) => item !== '');
    }
    const command = parts[0];
    const command_args = parts.slice(1);
    if (!(command in this._commands)) {
      return undefined;
    }
    let _sub_command: string = '';
    if (command_args[0] === 'help') {
      _sub_command = 'help';
    } else {
      // Check if this command has any registered subcommands
      const commandsMapping = this._commands[command];
      const has_subcommands =
        Object.keys(commandsMapping).length > 1 ||
        (Object.keys(commandsMapping).length === 1 && !('' in commandsMapping));
      // Only treat first arg as subcommand if command supports subcommands and it's a valid one
      if (
        has_subcommands &&
        command_args &&
        command_args[0] in commandsMapping
      ) {
        _sub_command = command_args[0];
      } else {
        _sub_command = '';
      }
    }
  }
}
