import Link from "next/link";
import DetailButton from "./DetailButton";

export default function ListItem({ item }) {
  return (
    <div className="list-item"> 
    {/* 페이지를 이동하는 방법(1) - Link 컴포넌트 */}
    {/* Link 컴포넌트르 사용하여 '/detail/글id'로 이동 */}
      <h4>
        <Link href={`/detail/${item._id}`}>{item.title}</Link>
      </h4>

      {/* 페이지를 이동하는 방법(2) - useRouter 사용 */}
      <DetailButton postId={item._id.toString()}/>

      <p>{item.content}</p>
    </div>
  );
}

// 상세페이지 만들기
// 1) 글 제목을 누르면 상세페이지로 이동함
// 2) DB에서 해당 게시글 가져와서 보여주기
// => 이때 상세페이지 URL은? /detail/글의 id (기존)
// => app router로 하면? /app/detail 폴더 안에 여러 폴더 만들면 비효율적
// => React: URL 파라미터 사용함, Express: 라우트 파라미터 ':id'
// => Next.js: Dynamic routes 사용 -> 파일 또는 폴더 이름을 대괄호로 묶어서 생성 []
// 그 외
// \[변수명1]\[변수명2]\[변수명3]
// [...변수명]: Catch-all
// [[...변수명]]: Optional Catch-all