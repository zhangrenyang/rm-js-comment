const vscode = require('vscode');
const babel = require("@babel/core");
const env = require("@babel/preset-env");
const jsx = require("@babel/plugin-syntax-jsx");
const { convertToCamelCase } = require('./utils');
function activate(context) {
	const disposable = vscode.commands.registerCommand('extension.removeJsComment', function () {
		vscode.window.activeTextEditor.edit(editBuilder => {
			const text = vscode.window.activeTextEditor.document.getText();
			const options = {
				plugins:[jsx],
				comments: false
			};			
			try{
				let { code } = babel.transformSync(text, options);
				//转换变量
				code = convertToCamelCase(code);
				//替换变量
				const { replacer } = vscode.workspace.getConfiguration('rm-js-comment');
				for (const key in replacer) {
					code = code.replaceAll(key, replacer[key]);
				}
				//删除空行
				code = code.replace(/^\s*(?=(\r|$))\n/img, '');
				const end = new vscode.Position(vscode.window.activeTextEditor.document.lineCount + 1, 0);
				editBuilder.replace(new vscode.Range(new vscode.Position(0, 0), end), code);
				vscode.commands.executeCommand(`editor.action.formatDocument`);
			}catch(error){
				console.error(error);
			}
		});
	});
	context.subscriptions.push(disposable);
	const disposableRemoveEmptyLine = vscode.commands.registerCommand('extension.removeEmptyLine', function () {
		vscode.window.activeTextEditor.edit(editBuilder => {
			const text = vscode.window.activeTextEditor.document.getText();
			const newText = text.replace(/^\s*[\r\n]/gm, '');
			const end = new vscode.Position(vscode.window.activeTextEditor.document.lineCount + 1, 0);
			editBuilder.replace(new vscode.Range(new vscode.Position(0, 0), end), newText);
			vscode.commands.executeCommand(`editor.action.formatDocument`);
		});
	});
	
	context.subscriptions.push(disposableRemoveEmptyLine);
}

function deactivate() { }

module.exports = {
	activate,
	deactivate
}
