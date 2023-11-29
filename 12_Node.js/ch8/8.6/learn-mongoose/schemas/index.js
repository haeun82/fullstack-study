const mongoose = require('mongoose');

// 몽구스를 통해서 몽고디비에 연결
const connect = () => {
  if (process.env.NODE_ENV !== 'production') { // 운영(배포) 버전이 아닐 때(즉, 개발 버전일 때)
    mongoose.set('debug', true); // 디버그 모드를 true: 터미널에 쿼리(입출력 명령)가 기록 됨
  }

  mongoose.connect('mongodb+srv://admin:admin123456@cluster0.jgjmgj1.mongodb.net/', {
    dbName: 'nodejs', // 실제 데이터를 저장할 DB
  })
    .then(() => {
      console.log('몽고디비 연결 성공');
    })
    .catch((err) => {
      console.error('몽고디비 연결 에러', err);
    });
};

mongoose.connection.on('error', (error) => {
  console.error('몽고디비 연결 에러', error);
});
mongoose.connection.on('disconnection', () => {
  console.error('몽고디비 연결이 끊겼습니다. 연결을 재시도합니다.');
  connect();
});

module.exports = connect; // connect 함수 내보내기
