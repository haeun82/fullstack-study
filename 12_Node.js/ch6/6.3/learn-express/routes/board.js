const express = require('express');

const router = express.Router();

router.get('/sub/notice', (req, res) => {
  res.send('공지사항 게시판');
  res.end();
});

router.get('/sub/qna', (req, res) => {
  res.send('문의 게시판');
  res.end();
});

// router.get('/sub/:id', (req, res) => {
//   res.send(`${req.params.id} 판매 페이지`);
//   res.end();
// });

module.exports = router;