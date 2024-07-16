const vscode = require('vscode');
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
async function processFileOrFolder(filePath, rootPath, callback) {
	const stats = fs.lstatSync(filePath);
	if (stats.isDirectory()) {
		const files = fs.readdirSync(filePath);
		for (const file of files) {
			await processFileOrFolder(path.join(filePath, file), rootPath, callback);
		}
	} else {
		const relativePath = path.relative(rootPath, filePath).replaceAll('\\', '/');
		const content = fs.readFileSync(filePath, 'utf-8');
		callback(relativePath, content);
	}
}

function getPromptsTitlePath() {
	let folderPath;
	if (vscode.workspace.workspaceFolders !== undefined) {
		folderPath = vscode.workspace.workspaceFolders[0].uri.fsPath;
	} else {
		vscode.window.showInformationMessage('Unable to determine location');
		return null;
	}
	const vscodeDir = path.join(folderPath, '.vscode');
	if (!fs.existsSync(vscodeDir)) {
		fs.mkdirSync(vscodeDir);
	}
	const promptsTitlePath = path.join(vscodeDir, 'promptsTitle.json');
	return promptsTitlePath;
}

async function setPromptsTitle() {
	const promptsTitlePath = getPromptsTitlePath();
	if (!fs.existsSync(promptsTitlePath)) {
		const data = ["修改下面的代码，实现 \n要求如下\n1.回答用中文\n2.输出修改的代码，没有修改的代码不用输出"]
		fs.writeFileSync(promptsTitlePath, JSON.stringify(data, null, 2), 'utf-8');
	}
	vscode.window.showTextDocument(vscode.Uri.file(promptsTitlePath))
}

function getPromptsTitleFromFile() {
	const promptsTitlePath = getPromptsTitlePath();
	if (promptsTitlePath && fs.existsSync(promptsTitlePath)) {
		const data = fs.readFileSync(promptsTitlePath, 'utf-8');
		const parsedData = JSON.parse(data);
		return parsedData.length > 0 ? parsedData[0] : '';
	}
	return '';
}
function removeComment() {
	const editor = vscode.window.activeTextEditor;
	if (!editor) return;
	editor.edit(editBuilder => {
		let code = editor.document.getText();
		const end = new vscode.Position(editor.document.lineCount + 1, 0);
		editBuilder.replace(new vscode.Range(new vscode.Position(0, 0), end), removeCommentAndEmptyLines(code));
		vscode.commands.executeCommand('editor.action.formatDocument');
	});
}
async function removeAllComment(uri, selectedUris) {
	let uriList = selectedUris.length > 0 ? selectedUris : [uri];
	for (const uri of uriList) {
		await processUri(uri);
	}
	vscode.window.showInformationMessage('Comments and empty lines removed from selected files and folders.');
}
async function copyAsPrompts(uri, selectedUris) {
	const workspaceFolders = vscode.workspace.workspaceFolders;
	if (!workspaceFolders || workspaceFolders.length === 0) {
		vscode.window.showErrorMessage('No workspace folder is open');
		return;
	}
	const rootPath = workspaceFolders[0].uri.fsPath;
	let uriList = selectedUris.length > 0 ? selectedUris : [uri];
	let output = '';
	const promptsTitle = getPromptsTitleFromFile();
	if (promptsTitle) {
		output += `${promptsTitle}\n\n`;
	}
	for (const fileUri of uriList) {
		const filePath = fileUri.fsPath;
		await processFileOrFolder(filePath, rootPath, (relativePath, content) => {
			output += `${relativePath}\n\`\`\`js\n${content}\n\`\`\`\n\n`;
		});
	}
	await vscode.env.clipboard.writeText(output);
	vscode.window.showInformationMessage('Copied to clipboard');
}
function readableCode() {
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
}
function removeEmptyLine() {
	const editor = vscode.window.activeTextEditor;
	if (!editor) return;
	editor.edit(editBuilder => {
		const text = editor.document.getText();
		const newText = text.replace(/^\s*[\r\n]/gm, '');
		const end = new vscode.Position(editor.document.lineCount + 1, 0);
		editBuilder.replace(new vscode.Range(new vscode.Position(0, 0), end), newText);
		vscode.commands.executeCommand('editor.action.formatDocument');
	});
}
function convertToCamelCase(str) {
	// 匹配所有以___开头和结束的字符串
	const regex = /(_{2,3})(\w+)\1/g;
	return str.replace(regex, (_, __, p2) => {
		// 将匹配到的字符串转换为驼峰命名法
		return p2
			.replace(/^_+|_+$/g, '')
			.toLowerCase() // 第一个单词首字母小写
			.replace(/_(\w)/g, (match, p1) => p1.toUpperCase()) // 后面单词首字母大写
	});
}
function removeCommentAndEmptyLines(code) {
	code = code.replace(/\/\/.*|\/\*[\s\S]*?\*\//g, '');
	code = code.replace(/^\s*[\r\n]/gm, '');
	return code;
}
module.exports = {
	removeComment,
	removeAllComment,
	setPromptsTitle,
	copyAsPrompts,
	readableCode,
	removeEmptyLine
}
