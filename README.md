# rm-js-comment

This VSCode extension provides a set of utilities for managing and formatting code. It includes commands to remove comments, set prompt titles, copy formatted code to the clipboard, convert code to camel case, and remove empty lines.

## Features

- **Remove Comments**: Removes all comments and empty lines from the current file.
- **Remove All Comments**: Removes all comments and empty lines from selected files and folders.
- **Set Prompts Title**: Sets a title for prompts, which will be added to the beginning of copied content.
- **Copy As Prompts**: Copies selected files and folders as formatted prompts to the clipboard.
- **Readable Code**: Converts code to camel case and replaces configured strings.
- **Remove Empty Lines**: Removes all empty lines from the current file.

## Commands

### 1. Remove Comments
Removes all comments and empty lines from the currently active file.

- **Command ID**: `extension.removeComment`

### 2. Remove All Comments
Removes all comments and empty lines from the selected files and folders.

- **Command ID**: `extension.removeAllComment`

### 3. Set Prompts Title
Sets a title for prompts. The title is saved to a file and used by the `Copy As Prompts` command.

- **Command ID**: `extension.setPromptsTitle`

### 4. Copy As Prompts
Copies selected files and folders as formatted prompts to the clipboard, including the previously set prompt title.

- **Command ID**: `extension.copyAsPrompts`

### 5. Readable Code
Converts the code in the currently active file to camel case and replaces configured strings.

- **Command ID**: `extension.readableCode`

### 6. Remove Empty Lines
Removes all empty lines from the currently active file.

- **Command ID**: `extension.removeEmptyLine`


## Usage

1. Open a file or select files and folders in the VSCode Explorer.
2. Open the Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P` on macOS).
3. Type the command ID (e.g., `extension.removeComment`) and press `Enter`.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
```
