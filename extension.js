const vscode = require('vscode');
function activate(context) {
	const disposable = vscode.commands.registerCommand('rm-js-comment.removeJsComment', function () {
		vscode.window.activeTextEditor.edit(editBuilder => {
			const text = vscode.window.activeTextEditor.document.getText();
			const end = new vscode.Position(vscode.window.activeTextEditor.document.lineCount + 1, 0);
			editBuilder.replace(new vscode.Range(new vscode.Position(0, 0), end), text);
			vscode.commands.executeCommand(`editor.action.formatDocument`);
		});
	});
	context.subscriptions.push(disposable);
}

function deactivate() { }

module.exports = {
	activate,
	deactivate
}
