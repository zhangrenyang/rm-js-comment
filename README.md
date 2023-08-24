# JS Code Refactor for VS Code

This VS Code extension provides functionalities to refactor your JavaScript and JSX code, including removing comments, converting variable naming to camel case, replacing specified patterns, and removing empty lines.

## Features

1. **Remove JS Comments and Convert Variables**: This feature helps in removing all comments from your JS and JSX files, converting variable names to camel case, and replacing patterns specified in the configuration.

2. **Remove Empty Lines**: As the name suggests, this feature will remove all the empty lines from your file, giving it a clean look.

## Usage

### Commands

- `extension.removeJsComment`: To remove comments, convert variable names, and replace patterns.
  
- `extension.removeEmptyLine`: To remove all empty lines from your JS or JSX file.

## Configuration

You can customize the patterns that need to be replaced after removing comments and converting variable names:

```json
"rm-js-comment": {
    "replacer": {
        "oldPattern1": "newPattern1",
        "oldPattern2": "newPattern2"
        // ... add more patterns as needed
    }
}

# JS 代码重构 VS Code 扩展

此 VS Code 扩展提供了重构 JavaScript 和 JSX 代码的功能，包括删除注释、将变量命名转换为驼峰式、替换指定的模式，并删除空行。

## 功能

1. **删除 JS 注释并转换变量**：此功能可以从您的 JS 和 JSX 文件中删除所有注释，将变量名称转换为驼峰式，并替换配置中指定的模式。

2. **删除空行**：顾名思义，此功能将从文件中删除所有空行，使其看起来更加整洁。

## 使用方法

### 命令

- `extension.removeJsComment`：用于删除注释、转换变量名称并替换模式。
  
- `extension.removeEmptyLine`：用于从 JS 或 JSX 文件中删除所有空行。

## 配置

您可以自定义删除注释和转换变量名称后需要替换的模式：

```json
"rm-js-comment": {
    "replacer": {
        "旧模式1": "新模式1",
        "旧模式2": "新模式2"
        // ... 根据需要添加更多模式
    }
}
