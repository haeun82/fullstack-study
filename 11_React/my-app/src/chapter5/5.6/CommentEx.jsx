import Avatar from "./Avatar";
import UserInfo from "./UserInfo";

// 댓글 컴포넌트
// 실제 렌더링은 안하고 단순 연습용 예제 
function CommentEx(props) {
	return (
		<>
			<div className="comment">
				{/* 2) 사용자 정보를 컴포넌트로 추출 */}
				<UserInfo user= {props.author} />

				<div className="comment-text">
					{props.text}
				</div>

				<div className="comment-date">
					{props.date}
				</div>
			</div>
		</>	
	);
}

// export default CommentEx;