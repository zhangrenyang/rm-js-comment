const assert = require('assert');

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
// const myExtension = require('../extension');

suite('Extension Test Suite', () => {

	test('Sample test', () => {
		assert.equal(-1, [1, 2, 3].indexOf(5));
		assert.equal(-1, [1, 2, 3].indexOf(0));
	});
});
