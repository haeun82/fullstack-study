import React, { useState } from 'react';

function PostListItem(props) {
	const [posts, setPosts] = useState(['리액트 잘 쓰려면?', '자바스크립트 핵심 문법', '스타일링 가이드']);

  const [ showPostDetail, setShowPostDetail ] = useState(false);
  const [ currentIndex, setCurrentIndex ] = useState(0);
  const [ likeCount, setLikeCount ] = useState([0, 0, 0]); // 글 수에 맞게 배열로 만들기
	
	return (
		<div class="inner">
			{/* Quiz: map()을 이용하여 posts 배열 반복 출력하기 */}
			{posts.map((post, index) => {
				console.log(post, index);
				return (
					<div key={index} className='list' 
					onClick={() => {
						setShowPostDetail(true);
						setCurrentIndex(index);
					}}
					>
						<h4>{post}</h4>
						<p>2023년 1월 20일</p>
						<p>by. goni.kim</p>

						<hr />

						<div className='toolbar'>
							{/* 좋아요 버튼 */}
							<span onClick={(e) => {
								// (버그 수정)
								// 현재는 좋아요 버튼을 누를 때 글 상세보기까지 같이 클릭됨!
								// 부모-자식 관계에 있을 때 이벤트 버블링이 일어남
								e.stopPropagation(); // 상위 요소로 퍼지는 이벤트 버블링을 막음

								const copyLikeCount = [...likeCount];
								copyLikeCount[index]++;
								setLikeCount(copyLikeCount);
							}}>
								💗{likeCount[index]}
							</span>

							{/* 포스트 삭제하기 */}
							<span style={{ fontSize: 27 }} onClick={(e) => {
								e.stopPropagation();
								// const copyPosts = [...posts];
								// copyPosts.splice(index, 1);
								// setPosts(copyPosts);

								// 또는 배열의 filter 사용
								const filteredPosts = posts.filter((value, idx) => {
									return index !== idx;
								});
								setPosts(filteredPosts);

								// (버그 수정) 삭제시 해당 포스트의 좋아요 카운트 같이 삭제
								const copyLikeCount = [...likeCount];
								copyLikeCount.splice(index, 1);
								setLikeCount(copyLikeCount);
							}}>
								🗑
							</span>
						</div>
					</div>
				);
			})}
		</div>
	);
}

export default PostListItem;