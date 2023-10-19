function MailBox(props) {
	const unreadMessages = props.unreadMessages;

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
		</>
	);
}

export default MailBox;