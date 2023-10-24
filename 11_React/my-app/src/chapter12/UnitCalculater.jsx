import React, { useState } from 'react';
import UnitCounter from './UnitCounter';
import UnitInput from './UnitInput';

function UnitCalculater(props) {
	// 2. Shared State 실습
	const [length, setlength] = useState(1);

	const handleChange = (e) => {
		setlength(Number(e.target.value)); // number input이여도 문자로 입력되기 때문에 숫자로 바꿔줘야 함
	};
	return (
		<>
			<p>단위 변환 계산기</p>
			<label>
				<input type="number" value={length} onChange={handleChange} min={0}/>
				미터(m)
			</label>
			<hr />
			<UnitCounter length={length} onLengthChange={setlength}/>
			<br />
			<UnitInput unit={'mm'} length={length}/>
			<br />
			<UnitInput unit={'cm'} length={length}/>
			<br />
			<UnitInput unit={'m'} length={length}/>
			<br />
			<UnitInput unit={'km'} length={length}/>
			<br />
			<UnitInput unit={'inch'} length={length}/>
			<br />
			<UnitCounter length={length} onLengthChange={setlength}/>

		</>
	);
}

export default UnitCalculater;