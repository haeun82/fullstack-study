import React from 'react';
import { useNavigate } from 'react-router-dom';

function NewGamePage(props) {
	const navigater = useNavigate();

	return (
		<div>
			<h1>신규 게임 리스트</h1>
			<ul>
				<li>신규1</li>
				<li>신규2</li>
				<li>신규3</li>
				<li>신규4</li>
			</ul>
		</div>
	);
}

export default NewGamePage;