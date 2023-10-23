import logo from './logo.svg';
import './App.css';
import { useState } from "react";
import PostDetail from './conponents/PostDetail';

// POST앱 CRUD 만들기
// C: Create(등록)
// R: Read(목록, 상세보기)
// U: Update(수정)
// D: Delete(삭제)
function App() {
  // 서버에서가져온 데이터라고 가정
  const [posts, setPosts] = useState(['리액트 잘 쓰려면?', '자바스크립트 핵심 문법', '스타일링 가이드']);

  const [ showPostDetail, setShowPostDetail ] = useState(false);
  const [ currentIndex, setCurrentIndex ] = useState(0);
  const [ likeCount, setLikeCount ] = useState([0, 0, 0]); // 글 수에 맞게 배열로 만들기
  
  // const handleList = () => {
  //   setShowPostDetail(!showPostDetail);
  //   setCurrentIndex(index);
  // };

  return (
    <>
      {/* 상단 헤더 만들기 */}
      <header class="header--dark">
        <h1>Gonilog</h1>
        <nav>
          <ul>
            <li>트렌딩</li>
            <li>최신</li>
          </ul>
        </nav>
      </header>

      <div class="inner">
        {/* 포스트 목록 */}
        {/* <div className='list'>
          <h4>{posts[0]}</h4>
          <p>2023년 1월 20일</p>
          <p>by. goni.kim</p>
        </div>
        <div className='list'>
          <h4>{posts[1]}</h4>
          <p>2023년 1월 2일</p>
          <p>by. alice</p>
        </div>
        <div className='list'>
          <h4>{posts[2]}</h4>
          <p>2023년 12월 20일</p>
          <p>by. hero</p>
        </div> */}

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

              <div>
                <span onClick={() => {
                  const copyLikeCount = [...likeCount];
                  copyLikeCount[index]++;
                  setLikeCount(copyLikeCount);
                }}>
                  💗{likeCount[index]}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* 포스트 상세보기 */}
      {showPostDetail && <PostDetail posts={posts} currentIndex={currentIndex} setPosts={setPosts}/>}
    </>
  );
}

export default App;
