import { useState } from "react";

function Reservation() {
	// 여러개의 입력 제어하기 => 여러개의 state 선언
	const [breakfast, setBreakfast] = useState(false);
	const [numberOfGuests, setNumberOfGuests] = useState(2);
	const [roomType, setRoomType] = useState("SINGLE");

	const handleBreakFastChange = (e) => {
		setBreakfast(e.target.checked);
	};

	const handleGuestsChange = (e) => {
		setNumberOfGuests(e.target.value);
	};

	const handleRoomChange = (e) => {
		setRoomType(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		alert(`조식여부: ${breakfast}, 투숙객 수: ${numberOfGuests}, 룸 타입: ${roomType}`);
	};

	return (
		<form onSubmit={handleSubmit}>
			<label>
				조식 여부:
				<input 
					type="checkbox"
					// checked 속성은 checkbox랑 radio 타입에 존재하고 boolean 타입의 값
					checked={breakfast} // true 값일 경우 미리 체크됨
					onChange={handleBreakFastChange}
					/>
			</label>
			<br />
			<label>
				투숙객 수:
				<input 
					type="number" 
					value={numberOfGuests}
					onChange={handleGuestsChange}
					/>
			</label>
			<br />
			<label>
				룸 타입:
				<input
					type="radio" 
					name="roomType"
					value="SINGLE"
					checked={roomType === "SINGLE"}
					onChange={handleRoomChange}
					/>
			</label>	
				싱글
			<label>	
				<input 
					type="radio" 
					name="roomType"
					value="DOUBLE"
					checked={roomType === "DOUBLE"}
					onChange={handleRoomChange}
					/>
				더블
			</label>	
			<label>
				<input 
					type="radio" 
					name="roomType"
					value="TWIN"
					checked={roomType === "TWIN"}
					onChange={handleRoomChange}
					/>
				트윈
			</label>
			<button type="submit">제출</button>
		</form>
	);
}

export default Reservation;