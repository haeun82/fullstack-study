import { connect } from "@/database";
import { ObjectId } from "mongodb";

export default async function list(req, res) {
  const client = await connect;
  const db = await client.db('board');

  if (req.method === 'DELETE') { 
    try {
      console.log(req.query);
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