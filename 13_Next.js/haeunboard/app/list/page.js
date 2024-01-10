import { connect } from "@/database";
import ListItem from "./LIstItem";

export default async function List() {
  // (참고) DB 입출력 코드는 server 컴포넌트에서만 쓰기
  const client = await connect;
  const db = await client.db('board');
  const posts = await db.collection('post').find().toArray();
  // console.log(posts);

  return (
     <div className="list-bg">
        {/* <div className="list-item">
          <h4>글 제목</h4>
          <p>글 내용</p>
        </div>
        <div className="list-item">
          <h4>글 제목</h4>
          <p>글 내용</p>
        </div>
        <div className="list-item">
          <h4>글 제목</h4>
          <p>글 내용</p>
        </div> */}

        {/* Quiz: 반복 렌더링 + 데이터 바인딩 */}
        {/* toString(): ObjectId가 갖고있는 메소드 ObjectId 문자열 반환 */}
        {/* {posts.map((item) => {
          return (
            <div key={item._id.toString()} className="list-item"> 
              <h4>{item.title}</h4>
              <p>{item.content}</p>
            </div>
          )
        })} */}

        {/* ListItem 컴포넌트로 추출 */}
        {posts.map((item) => {
          return (
            <ListItem key={item._id.toString()} item={item}/>
          )
        })}
     </div>
  );
}

// 글 목록 기능 만들기
// 1) /list 접속 시 글 목록 페이지 보여주기
// /app/list/page.js
// 2) DB에서 글 목록 가져오기