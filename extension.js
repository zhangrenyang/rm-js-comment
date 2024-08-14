const vscode = require('vscode');
const {
	removeComment,
	removeAllComment,
	setPromptsTitle,
	copyAsPrompts,
	readableCode,
	removeEmptyLine,
	removePlusAtLineStart
} = require('./utils');

function activate(context) {
	context.subscriptions.push(vscode.commands.registerCommand('extension.removeComment', removeComment));
	context.subscriptions.push(vscode.commands.registerCommand('extension.removeAllComment', removeAllComment));
	context.subscriptions.push(vscode.commands.registerCommand('extension.setPromptsTitle', setPromptsTitle));
	context.subscriptions.push(vscode.commands.registerCommand('extension.copyAsPrompts', copyAsPrompts));
	context.subscriptions.push(vscode.commands.registerCommand('extension.readableCode', readableCode));
	context.subscriptions.push(vscode.commands.registerCommand('extension.removeEmptyLine', removeEmptyLine));
	context.subscriptions.push(vscode.commands.registerCommand('extension.removePlusAtLineStart', removePlusAtLineStart));
}

function deactivate() { }

module.exports = {
	activate,
	deactivate
}