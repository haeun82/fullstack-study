import { connect } from "@/database";
import { ObjectId } from "mongodb";

export default async function Handlers(req, res) {
  const client = await connect;
  const db = await client.db('board');
  
  if (req.method === 'POST') {
    const { id, title, content } = req.body;

    const result = await db.collection('post').updateOne({
      _id: new ObjectId(id),
    }, {
      $set: { title, content }
    });
    res.redirect(302, `/list`);
  }
}