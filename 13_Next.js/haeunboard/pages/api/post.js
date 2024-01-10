import { connect } from "@/database";

export default async function list(req, res) {
  const client = await connect;
  const db = await client.db('board');
  // console.log(posts);
  if (req.method === 'POST') {
    const { title, content } = req.body;

    // 데이터 유효성 검사
    if (!title) {
      return res.status(500).json({ 
        flag: false,
        message: '제목을 입력하세요'
       })
    }

    // DB 에러 예외 처리
    try {
      await db.collection('post').insertOne({ title, content });

      // json으로 응답 
      // res.json({ 
      //   flag: true,
      //   message: '처리완료',
      //  });

      // 응답과 동시에 페이지를 이동시키기
      res.redirect(302, '/list');
    } catch (err) {
      console.error(err);   
      res.status(500).json({
        flag: false,
        message: '등록 실패'
      })
    }
  } 
}