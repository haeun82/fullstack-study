// Book 이라는 이름의 리액트 함수 컴포넌트 만들기
// JSX로 코딩
function Book(props) { // 컴포넌트 = 틀 // 관례적으로 props 사용 
	console.log(props);

	return (
		<div>
			<h1>이 책의 이름은 {props.name}입니다.</h1>
			<h2>이 책은 총 {props.numOfPage}페이지로 이뤄져 있습니다.</h2>
		</div>
	); // 리액트 엘리먼트를 반환
}

export default Book; // Book 컴포넌트 내보내기