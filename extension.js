const vscode = require('vscode');
const {
	removeComment,
	removeAllComment,
	setPromptsTitle,
	copyAsPrompts,
	readableCode,
	removeEmptyLine
} = require('./utils');

function activate(context) {
	context.subscriptions.push(vscode.commands.registerCommand('extension.removeComment', removeComment));
	context.subscriptions.push(vscode.commands.registerCommand('extension.removeAllComment', removeAllComment));
	context.subscriptions.push(vscode.commands.registerCommand('extension.setPromptsTitle', setPromptsTitle));
	context.subscriptions.push(vscode.commands.registerCommand('extension.copyAsPrompts', copyAsPrompts));
	context.subscriptions.push(vscode.commands.registerCommand('extension.readableCode', readableCode));
	context.subscriptions.push(vscode.commands.registerCommand('extension.removeEmptyLine', removeEmptyLine));
}

function deactivate() { }

module.exports = {
	activate,
	deactivate
}