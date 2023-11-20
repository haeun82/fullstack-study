import { odd, even } from "./var.mjs";
// const { odd, even } = require('./var.mjs'); // 구조분해할당 시에는 속성명이랑 변수명이랑 동일해야 함
import checkNumber from "./func.mjs";
// const checkNumber = require('./func'); // 변수명은 내 마음대로 지을 수 있음

function checkStringOrEven(str) {
	if (str.length % 2) { // 홀수면
		return odd;
	}
	return even;
}

console.log(checkNumber(10));
console.log(checkStringOrEven('hello'));