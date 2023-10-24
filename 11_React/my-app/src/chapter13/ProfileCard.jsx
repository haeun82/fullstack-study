import React from 'react';
import Card from './Card';

function ProfileCard(props) {
	return (
		<Card
			title="Haeun"
			backgroundColor="#dee7ff"
		>
			<p>안녕하세요 하은입니다.</p>
			<p>리액트를 사용해 개발중입니다.</p>

		</Card>
	);
}

export default ProfileCard;