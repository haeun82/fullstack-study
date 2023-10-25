import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function MainPage(props) {
	// 사용자가 직접 경로를 입력해서 이동하는 경우는 드물다.
	// 페이지 이동을 위한 useNavigate() 훅 제공
	// 사용법
	// navigate('/경로');
	// navigate(1); 또는  navigate(-1); => 앞으로가기 , 뒤로 가기
	const navigate = useNavigate();

	return (
		<div>
			<h1>메인 페이지</h1>
			<ul>
				{/* <li onClick={() => {navigate('/places');}}>장소</li>
				<li onClick={() => {navigate('/games');}}>게임</li> */}

				{/* a태그 역할을 하는 Link 컴포넌트 */}
				{/* 차이점?
					a태그의 기본 동작은 페이지를 이동시키면서, 페이지를 아예 새로 불러옴(새로고침 발생)
					그렇게 되면 리액트 앱이 지니고 있는 상태들도 초기화되고,
					렌더링된 컴포넌트도 모두 사라지고 새로 렌더링을 하게됨(언마운팅 -> 마운팅)

					이럴 때 Link 컴포넌트 사용 시 새로고침을 막음
					=> a태그 사용이 필요하다면 Link 컴포넌트를 사용해보자
				*/}
				<li>
					<Link to="/places">장소</Link>
				</li>
				<li>
					<Link to="/games">게임</Link>
				</li>
			</ul>
		</div>
	);
}

export default MainPage;