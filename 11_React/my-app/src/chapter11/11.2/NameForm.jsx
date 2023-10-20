import { useState } from "react";

function NameForm() {
	const [value, setValue] = useState('');

	const handleChange = (e) => {
		// e.target.value: 이벤트가 발생한 타겟(해당 예제에서는 input 객체)에 입력된 값
		// setValue(e.target.value);
		// 입력값이 state를 통해 관리되는 이런 방식을 제어 컴포넌트라고 부름

		// 실습1
		// 만약에 사용자가 입력한 모든 알파벳을 대문자로 변경 시켜서 관리하고 싶다면?
		setValue(e.target.value.toUpperCase());
	};

	const handleSubmit = (e) => {
		alert('입력한 이름: ' + value);
		e.preventDefault(); // 해당 이벤트의 기본 동작을 막음
		// 여기서 submit 이벤트의 기본 동작은 새로 고침

		

	};

	return (
		<>
			<form onSubmit={handleSubmit}>
				<label>
					이름:
					<input type="text" onChange={handleChange} value={value}/>
					{/* state에서 값을 가져다 넣어줌으로 항상 state에 들어있는 input에 표시되게 해야함 (value= 값 넣어줘야함)
						(주의:이렇게 안하면 state에 들어가 있는 값이 아닌 내가 타이핑한 값이 보임) */}
				</label>
				<button type="submit">제출</button>
			</form>
		</>	
	);
}

export default NameForm;