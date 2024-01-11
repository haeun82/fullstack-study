import { connect } from "@/database";
import { ObjectId } from "mongodb";

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
  } else if (req.method === 'DELETE') { 
    try {
      const result = await db.collection('post').deleteOne({ _id: new ObjectId(req.query.postId) });
      console.log(result);

      if (result.deletedCount === 0) {
        throw new Error('삭제 실패');
      }

      res.json({
        flag: true,
        message: '삭제 성공'
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        flag: true,
        message: err.message
      });
    }
  } 
}