const vscode = require('vscode');
const { convertToCamelCase } = require('./utils');
function activate(context) {
	const disposableRemoveComment = vscode.commands.registerCommand('extension.removeComment', function () {
		const editor = vscode.window.activeTextEditor;
		if (!editor) return;
		editor.edit(editBuilder => {
			let code = editor.document.getText();
			code = code.replace(/\/\/.*|\/\*[\s\S]*?\*\//g, '');
			code = code.replace(/^\s*[\r\n]/gm, '');
			const end = new vscode.Position(editor.document.lineCount + 1, 0);
			editBuilder.replace(new vscode.Range(new vscode.Position(0, 0), end), code);
			vscode.commands.executeCommand('editor.action.formatDocument');
		});
	});
	context.subscriptions.push(disposableRemoveComment);
	const disposableReadableCode = vscode.commands.registerCommand('extension.readableCode', function () {
		const editor = vscode.window.activeTextEditor;
		if (!editor) return;
		editor.edit(editBuilder => {
			const text = editor.document.getText();
			let code = text.replace(/\/\/.*|\/\*[\s\S]*?\*\//g, '');
			code = convertToCamelCase(code);
			const { replacer } = vscode.workspace.getConfiguration('rm-js-comment');
			for (const key in replacer) {
				code = code.replaceAll(key, replacer[key]);
			}
			code = code.replace(/^\s*[\r\n]/gm, '');
			const end = new vscode.Position(editor.document.lineCount + 1, 0);
			editBuilder.replace(new vscode.Range(new vscode.Position(0, 0), end), code);
			vscode.commands.executeCommand('editor.action.formatDocument');
		});
	});
	context.subscriptions.push(disposableReadableCode);

	const disposableRemoveEmptyLine = vscode.commands.registerCommand('extension.removeEmptyLine', function () {
		const editor = vscode.window.activeTextEditor;
		if (!editor) return;

		editor.edit(editBuilder => {
			const text = editor.document.getText();
			const newText = text.replace(/^\s*[\r\n]/gm, '');
			const end = new vscode.Position(editor.document.lineCount + 1, 0);
			editBuilder.replace(new vscode.Range(new vscode.Position(0, 0), end), newText);
			vscode.commands.executeCommand('editor.action.formatDocument');
		});
	});
	context.subscriptions.push(disposableRemoveEmptyLine);
}

function deactivate() { }

module.exports = {
	activate,
	deactivate
}