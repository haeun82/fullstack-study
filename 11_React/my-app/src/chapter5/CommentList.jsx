import Comment from "./Comment";

const comments = [
	{
		name: '하은쓰',
		content: '안녕하세요. 반갑습니다!'
	},
	{
		name: '유재석',
		content: '리액트 재밌어요^~^'
	},
	{
		name: '이이경',
		content: '저도 배워보고 싶네용'
	},
	{
		name: '이미주',
		content: '리액트 어려워..'
	}
];

// 댓글들을 포함하는 컴포넌트
function CommentList(props) {
	return (
		<div>
			{/* Quiz: props를 추가하여 name과 content 전달 */}
			{/* <Comment name="하은" content="첫 방문입니다."/>
			<Comment name="재석" content="props 재밌어요" />
			<Comment name="종국" content="배우길 잘했따." /> */}

			{/* 배열을 동적으로 렌더링 해야할 때에는 배열의 map() 함수를 사용 
				(map(): 배열 안에 있는 각 요소를 이용하여 새로운 배열을 만듦)
				일반 데이터 배열을 일반 리액트 엘리먼트로 이루어진 배열로 만들면 됨 */}
			{comments.map((comment, index) => {
				return (
					<Comment key={index} name={comment.name} content={comment.content} />	
				);
			})}

			{/* map() 함수의 결과 나열 (위와 동일) */}
			{[
				<Comment key={0} name='하은쓰' content='안녕하세요. 반갑습니다!' />	,
				<Comment key={1} name='유재석' content='리액트 재밌어요^~^' />	,
				<Comment key={2} name='이이경' content='저도 배워보고 싶네용' />	,
				<Comment key={3} name='이미주' content='리액트 어려워..' />
			]}

			{/* 코드 단축 */}
			{comments.map((comment, index) => <Comment key={index} name={comment.name} content={comment.content} />	)}
		</div>
	);
}

export default CommentList;