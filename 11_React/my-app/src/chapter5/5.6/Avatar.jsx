function Avatar(props) {
	return (
		// 컴포넌트로 추출했으므로 comment에서만 쓰이는게 아니기에 author에서
		// user로 바꿔줌
		<img className="avatar" 
				src={props.user.avatarUrl} 
				alt={props.user.name} 
			/>
	);
}

export default Avatar;