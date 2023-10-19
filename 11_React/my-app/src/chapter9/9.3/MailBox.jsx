function MailBox(props) {
	const unreadMessages = props.unreadMessages;

	const count = 0;


	return (
		<>
			<h1>안읽은 메일 보관함</h1>
			{/* && 연산 뒤에 엘리먼트는 앞의 조건식이 true일 때 출력, 조건식이 false면 무시하고 건너뜀 */}
			{/* 조건에 따라 특정 엘리먼트를 나타내거나 숨기고 싶을 때 사용 ( 단축 평가 ) */}
			{unreadMessages.length > 0 && (
				<>
					<h2>{unreadMessages.length}개의 읽지 않은 메일이 있습니다.</h2>
					{unreadMessages.map((unreadMessage, index) => {
						return <p key={index}>제목: {unreadMessage}</p>;
					})}
				</>
			)}

			{/* 주의!
				falsy이면 && 뒤에 있는 표현식은 무시하고 건너 뛰지만 
				falsy 표현식이 반환 된다는 것에 주의(falsy 표현식에 따라서 화면에 출력될 수도 있음)
			*/}
			{false}
			{/* {false && <h1>Messages: {count}</h1>} 실행 안됨 */}
			{/* {count && <h1>Messages: {count}</h1>} false가 아닌 0이기 때문에 화면에 출력됨 */}
		</>
	);
}

export default MailBox;