import React from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from "styled-components";

const NoMatchPageWrapper = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	font-size: 64px;
`;

function NoMatchPage(props) {
	const navigater = useNavigate();

	return (
		<NoMatchPageWrapper>
			<h1>404 Not Found</h1>
			<button onClick={() => { navigater('/');}}>메인으로 돌아가기</button>
		</NoMatchPageWrapper>
	);
}

export default NoMatchPage;