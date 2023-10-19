import { useState } from "react";

function Toggle() {
	const [isToggleOn, setIsToggleOn] = useState(true);

	// 방법1 : 함수 선언문 사용
	// function handleClick() {
	// 	setIsToggleOn(!isToggleOn);
	// }

	// 2. 화살표 함수 사용
	const handleClick = () => {
		setIsToggleOn(!isToggleOn);

		// (참고) State Merge 테스트
		// 테스트1
		// setIsToggleOn(!isToggleOn); // false
		// setIsToggleOn(!isToggleOn); // true, 제일 마지막 set함수만 실행됨

		// 테스트2 : 함수형 업데이트
		// setIsToggleOn((isToggleOn) => !isToggleOn); // false
		// setIsToggleOn((isToggleOn) => !isToggleOn); // true, 이전 (state)를 받아와서 동기적으로 처리
	};

	return (
		// 이벤트는 카멜케이스를(camelCase) 사용
		// 함수(이벤트 핸들러)를 바로 전달하면 됨
		// 주의! handleClick() 으로 작성 시 함수가 바로 호출됨
		// (여기서는 state를 건드려서 무한 루프에 걸림)
		<button onClick={handleClick}>
			{isToggleOn ? '켜짐' : '꺼짐'}
		</button>
	);
}

export default Toggle;