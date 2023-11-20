// const value = require('./var');
// console.log(value);

const { odd, even } = require('./var'); // 구조분해할당
// console.log(odd, even);

function checkOddOrEven(num) {
	if (num % 2) { // 홀수면
		return odd;
	}
	return even;
}

module.exports = checkOddOrEven;
