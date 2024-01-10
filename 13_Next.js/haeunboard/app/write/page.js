export default function Write(params) {
  return (
    <div className="p-20">
      <h4>글쓰기</h4>
      <form id="write-form" action="" method="">
        <label htmlFor="title">제목</label>
        <input type="text" id="title" name="title"/>
        <label htmlFor="content">내용</label>
        <input type="text" id="content" name="title"/>
        <button type="submit">등록</button>
      </form>
    </div>
  );
}