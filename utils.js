function convertToCamelCase(str) {
	// 匹配所有以___开头和结束的字符串
	const regex = /___(\w+)___/g;
	return str.replace(regex, (match, p1) => {
		// 将匹配到的字符串转换为驼峰命名法
		return p1
			.toLowerCase() // 第一个单词首字母小写
			.replace(/_(\w)/g, (match, p1) => p1.toUpperCase()) // 后面单词首字母大写
	});
}


exports.convertToCamelCase = convertToCamelCase;