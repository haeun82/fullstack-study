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
  // const [posts, setPosts] = useState(['리액트 잘 쓰려면?', '자바스크립트 핵심 문법', '스타일링 가이드']);
  const [posts, setPosts] = useState([{
    id: 1,
    title: '리액트 잘하려면?',
    author:'haeun',
    date: new Date(),
    likeCount: 0
  }]);

  const { id, author, date, likeCount } = posts;
  // console.log(id, author, date, likeCount);

  const [ showPostDetail, setShowPostDetail ] = useState(false);
  const [ currentIndex, setCurrentIndex ] = useState(0);
  // const [ likeCount, setLikeCount ] = useState([0, 0, 0]); // 글 수에 맞게 배열로 만들기
  const [ inputValue, setInputValue ] = useState('');

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
        {/* Quiz: map()을 이용하여 posts 배열 반복 출력하기 */}
        {posts.map((post, index) => {
          console.log(post, index);
          return (
            <div key={posts.id} className='list' 
            onClick={() => {
              setShowPostDetail(true);
              setCurrentIndex(index);
            }}
            >
              <h4>{post.title}</h4>
              <p>{posts.date}</p>
              <p>{posts.author}</p>

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
                  setPosts(copyLikeCount);
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
                  // setLikeCount(copyLikeCount);
                }}>
                  🗑
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* 포스트 상세보기 */}
      {/* Quiz: input에 제목입력 후 등록버튼 누르면 맨 앞에 새로운 포스트 추가
        1) input을 제어 컴포넌트로 만들어서 사용자가 입력한 값을 state로 저장해서 관리
        2) 등록 버튼 클릭 시 posts 상태에 맨 앞에 새로운 데이터 추가
      */}
      <input type='text' value={inputValue} onChange={(e) => {
        setInputValue(e.target.value);
      }}
      />
      <button type='button' onClick={() => {
        // div 생성 x 
        // posts state에 요소 하나를 추가하면 자동으로 렌더링
        // const copyPosts = [...posts];
        // copyPosts.unshift(inputValue);

        // 또는
        const copyPosts = [inputValue, ...posts];
        setPosts(copyPosts);
        setInputValue('');

        // (버그 수정) 포스트하나 추가 시 좋아요 카운트도 같이 추가
        const copyLikeCount = [0,...likeCount];
        // setLikeCount(copyLikeCount);

      }}>
        포스트 등록
      </button>


      {/* 조건부 렌더링 */}
      {showPostDetail && <PostDetail posts={posts} currentIndex={currentIndex} setPosts={setPosts}/>}
    </>
  );
  
}

export default App;

// 배열이나 객체 형태의 state 변경할 때 주의!
// 1. state 변경 함수의 특징
// 기존 state가 신규 state랑 같은 경우, 변경 안함
// 2. 배열 객체의 특징
// 변수의 주소(참조)값이 저장됨

// (참고) 왜 새로고침하면 다 없어질까?
// 새로고침 시 HTML/CSS/JS 파일을 다시 읽어와서 그런 것
// 데이터를 유지하려면 서버에 보내서 DB에 영구 저장하고 
// 새로고침이 발생 시 DB에서 다시 읽어오면 됨

// <추가 개선 과제>
// 1. PostListItem 컴포넌트 추출

// 2. 날짜 및 작성자, 좋아요 수 등 데이터를 문자열이 아닌 객체 형태로 처리해보기
// state에 글 제목만 저장되어 있는게 아니라 날짜같은 것도 저장해두고 보여주는 식이면 굿
// => 글 등록 시 현재 날짜까지 같이 저장되도록 하면 나이스

// 3. input에 아무것도 입력안하고 등록 버튼 누르는거 막기
// 유저의 의도치않은 행동을 막는 코드도 많이 짜야 안전한 사이트가 됨
// 1) 미입력시 비활성화 -> 입력이 생기면 버튼 활성화
// 2) 등록 버튼 누를 시 유효성 검사

// 4. 포스트 수정할 때 input으로 입력받은 내용으로 수정해보기

// 5. 글 오름차순 정렬

// 6. 그 외 개선 및 구현할 것 많으니 자유롭게 연습해보기
