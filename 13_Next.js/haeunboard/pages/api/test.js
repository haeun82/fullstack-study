export default function Handlers(req, res) {
  console.log('/api/test.js');
  
  // query string 확인
  console.log(req.query);

  res.status(200).json({ message: '안녕!' });
}