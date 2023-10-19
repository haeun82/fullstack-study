function Profile(props) {
	console.log(props); // props는 객채이다.
	// props.name = '하니'; // props는 읽기 전용으로 변경 불가!! 값 바꿀 수 없당!
	return (
		<>
			<h1>사용자 프로필(조회수: {props.viewCount})</h1>
			<h2>이름: {props.name}</h2>
			<h2>자기소개: {props.introduction}</h2>
		</>
	);
}

export default Profile;