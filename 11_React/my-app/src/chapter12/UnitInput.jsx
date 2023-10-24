import React from 'react';

// 렌더링과 상관없는 고정값들은 전역변수로 선언(주로 상수)
const unitConvert = {
	mm: {
		name:'밀리미터',
		ratio: 1000
	},
	cm: {
		name:'밀리미터',
		ratio: 100
	},
	m: {
		name:'밀리미터',
		ratio: 1
	},
	km: {
		name:'밀리미터',
		ratio: 0.001
	},
	inch: {
		name:'밀리미터',
		ratio: 39.370079
	}
};

function UnitInput(props) {
	const { unit, length } = props;

	return (
		<>
			<input type="text" value={length * unitConvert[unit].ratio} disabled />
			{unitConvert[unit].name}
		</>
	);
}

export default UnitInput;