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
exports.convertToCamelCase = convertToCamelCase;
exports.removeCommentAndEmptyLines = removeCommentAndEmptyLines;
