const express = require('express');

const router = express.Router();

router.get('/shirts', (req, res) => {
  res.send('셔츠 판매 페이지');
  res.end();
});

router.get('/pants', (req, res) => {
  res.send('바지 판매 페이지');
  res.end();
});

// router.get('/:id', (req, res) => {
//   res.send(`${req.params.id} 판매 페이지`);
//   res.end();
// });


module.exports = router;