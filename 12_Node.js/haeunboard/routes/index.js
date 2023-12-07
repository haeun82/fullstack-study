const express = require('express');

const { client } = require('../database');
const db = client.db('board');
const router = express.Router();

// GET 요청이고 '/' 라우터 
router.get('/', (req, res) => {
  res.render('main'); // .ejs 생략 가능
});

// GET /insert 라우터
// DB에 데이터 저장하기 테스트(테스트 후 데이터 삭제)
router.get('/insert', async (req, res) => {
  // JS Object 형태로 저장
  try {
    await db.collection('post').insertOne({
      title: '제발 들어가라' 
    });
    res.send('데이터 저장 완료');
  } catch (err) {
    console.error(err);
  }
});

// DB에 데이터 전체 삭제하기 테스트
router.get('/delete-all', async (req, res) => {
  await db.collection('post').deleteMany({});
  res.send('데이터 저장 완료');
});

router.get('/cors', (req,res) => {
  // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.send('데이터 응답 테스트');
});

// Quiz: /time으로 접속하면 현재 서버의 날짜/시간을 보여주는 기능 만들기
// time.ejs로 웹페이지 만들어서 그 안에 서버의 시간을 넣어 보내주면됨
router.get('/time', async (req, res) => {
  try {
    const date = new Date();
    res.render('time', { date });

  } catch (err) {
    console.error(err);
  }
});

module.exports = router;