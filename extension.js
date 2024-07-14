const vscode = require('vscode');
const { convertToCamelCase, removeCommentAndEmptyLines } = require('./utils');
const { promisify } = require('util');
const fs = require('fs');
const path = require('path');
const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
async function processFile(filePath) {
	try {
		let code = await readFile(filePath, 'utf8');
		await writeFile(filePath, removeCommentAndEmptyLines(code), 'utf8');
	} catch (error) {
		console.error(error);
	}
}

async function processDirectory(dirPath) {
	const entries = await readdir(dirPath, { withFileTypes: true });
	for (const entry of entries) {
		const entryPath = path.join(dirPath, entry.name);
		if (entry.isDirectory()) {
			await processDirectory(entryPath);
		} else {
			await processFile(entryPath);
		}
	}
}

async function processUri(uri) {
	const uriStat = await stat(uri.fsPath);
	if (uriStat.isDirectory()) {
		await processDirectory(uri.fsPath);
	} else {
		await processFile(uri.fsPath);
	}
}
function activate(context) {
	const disposableRemoveComment = vscode.commands.registerCommand('extension.removeComment', function () {
		const editor = vscode.window.activeTextEditor;
		if (!editor) return;
		editor.edit(editBuilder => {
			let code = editor.document.getText();
			const end = new vscode.Position(editor.document.lineCount + 1, 0);
			editBuilder.replace(new vscode.Range(new vscode.Position(0, 0), end), removeCommentAndEmptyLines(code));
			vscode.commands.executeCommand('editor.action.formatDocument');
		});
	});
	context.subscriptions.push(disposableRemoveComment);
	const disposableRemoveAllComment = vscode.commands.registerCommand('extension.removeAllComment', async function (uri, selectedUris) {
		let uriList = selectedUris.length > 0 ? selectedUris : [uri];
		for (const uri of uriList) {
			await processUri(uri);
		}
		vscode.window.showInformationMessage('Comments and empty lines removed from selected files and folders.');
	});

	context.subscriptions.push(disposableRemoveAllComment);
	const disposableReadableCode = vscode.commands.registerCommand('extension.readableCode', function () {
		const editor = vscode.window.activeTextEditor;
		if (!editor) return;
		editor.edit(editBuilder => {
			let code = editor.document.getText();
			code = convertToCamelCase(code);
			const { replacer } = vscode.workspace.getConfiguration('rm-js-comment');
			for (const key in replacer) {
				code = code.replaceAll(key, replacer[key]);
			}
			const end = new vscode.Position(editor.document.lineCount + 1, 0);
			editBuilder.replace(new vscode.Range(new vscode.Position(0, 0), end), removeCommentAndEmptyLines(code));
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