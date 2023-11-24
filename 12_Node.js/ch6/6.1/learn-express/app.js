const express = require('express'); // express 내부적으로 http 모듈을 쓰고 있음
const path = require('path');

const app = express(); // express로 부터 app을 하나 가져옴
// app.set(key, value): 서버에다가 전역 속성 설정
app.set('port', process.env.PORT || 3000); // 서버가 실행될 포트 지정(환경변수 없으면 기본값 3000으로)

// 미들웨어
// app.use()로 미들웨어 장착 가능, 안에 들어가는 콜백 함수가 미들웨어임
// 보통은 직접 만들기보다는 필요한 미들웨어 라이브러리를 받아서 사용
app.use((req, res, next) => {
  // 서버로 요청을 보낼 때 마다 실행됨
  console.log('모든 요청에 실행하고 싶어요.');
  next(); // 다음 실행 흐름(미들웨어 또는 라우터)으로 넘어감/ 안해주면 pending 상태
});

// 특정 요청에서만 실행되는 미들웨어
app.use('/about', (req, res, next) => {
  console.log('/about 요청에서만 실행');
  next(); // 다음 미들웨어 또는 app.get('/about') 라우터로 넘어감
});

// 미들웨어 여러개 사용하기
app.use((req, res, next) => {
  console.log('1 요청에 실행하고 싶어요');
  next();
},(req, res, next) => {
  console.log('2 요청에 실행하고 싶어요');
  next();
},(req, res, next) => {
  console.log('3 요청에 실행하고 싶어요');
  next();
});

// 에러 처리 테스트
// app.use((req, res, next) => {
//   // 보통은 에러가 발생 가능한 코드를 try~catch문으로 감싸줌
//   try {
//     console.log(asdf); // 에러 테스트용 테스트 끝나면 주석 처리 필요!
//     next(); // 다음 미들웨어로 넘어감
//   } catch (err) {
//     next(err); // 인자값을 넣으면 에러처리 미들웨어로 바로 넘어감
//   }
// });
// 에러가 발생하면 Express가 알아서 기본적인 처리를 해줌
// 1) 서버에 에러 로그를 찍고
// 2) 응답코드 500과 함께 에러 로그가 찍힌 페이지를 내려줌
// 근데 에러가 찍힌 페이지는 사용자가 보기에 좋지 않음 = 따라서 에러 처리 미들웨어 작성

// 라우팅 하기(라우터 만들기)
// app.get('요청주소', 콜백): '요청주소'로 GET 요청이 올 때 콜백 함수에 어떤 동작을 할지 지정
app.get('/', (req, res) => { // GET 요청이고 url이 '/' 일 때
  // 만약 공통 로직 존재 시 중복 코드 발생 => 미들웨어
  // console.log('모든 요청에 실행하고 싶어요.');

  // 응답 내려주기
  // res.send('<h1>hello express</h1>'); // res.writeHead(200m {}) + res.end()를 합친 것!

  // html 파일 서빙하기
  res.sendFile(path.join(__dirname, '/index.html')); // express에서 알아서 fs 모듈로 html 파일을 읽어서 부름

  // 코린이들이 자주 하는 실수(ㅠㅠ)
  // 한 라우터에서 여러 개의 응답을 보내면?
  // Cannot set headers after they are sent to the client
  // 해석: 클라이언트에 헤더를 보낸 후에는 헤더를 설정할 수 없습니다.
  // 요청 한 번에 응답은 한 번만 해야됨

  // Express 서버에서 응답을 보내는 다양한 방법
  // res.send('hello express'); 
  // res.sendFile(path.join(__dirname, '/index.html'));
  // res.json({ name: 'goni', age: 20 }); // res.writeHead(200, { .. }) + res.end(JSON.stringify(..))를 합친 것!
  // res.render();
  // 그 외 end(), redirect()도 있음 / 한번만 사용해야함 같이 쓸 수 없음

  // 여기서 참고로
  // sendFile(), render()는 SSR 방식의 웹 서버 만들 때 많이 사용
  // json()은 CSR(예: react) 방식의 API 서버 만들 때 많이 사용

  // 헷갈려하는 것들
  // 응답 보내고 끝내고 싶으면 return을 써야 함수가 종료됨 express는 요청마다 분리되어있어서 굳이 안써도됨
  console.log('응답을 보낸 다음 코드들도 실행됨');
});

// Quiz: 라우팅
// 누가 /about으로 GET 요청을 하면 'about 페이지입니다.' 라고 보여주기
app.get('/about', (req, res) => {
  // console.log('모든 요청에 실행하고 싶어요.');

  res.send('about 페이지입니다.');
});

// 누가 /login으로 POST 요청을 하면 'login 성공' 이라고 응답 내려주기
app.post('/login', (req, res) => {
  // console.log('모든 요청에 실행하고 싶어요.');

  // 이 위치에 로그인 코드 처리 넣고 응답 내려주면 됨
  res.send('login 성공');
});

// 라우트 매개변수(route parameter, req.params)
app.get('/category/:name', (req, res, next) => {
  res.send(`hello ${req.params.name}`);
});

// 와일드카드(*) 라우터
// 그 외 모든 GET 요청 주소에 대한 처리
// 순서에 주의! 앞쪽에 작성하면 다른 라우터가 동작 안함
// app.get('*', (req, res) => {
//   res.send('모든 GET 요청에 대해 처리');
// });

// 404 처리 미들웨어
// 따로 404 처리 안만들면 Express에서 알아서 처리를 해줌
app.use((req, res, next) => {
  res.status(404).send('404 못 찾겠어요.');
});

// 에러 처리 미들웨어
// (중요!) 반드시 매개변수 4가지를 다 작성해야 함! 에러가 첫번째로 들어가야 함
app.use((err, req, res, next) => {
  console.log(err);
  // res.send('에러가 나서 보여주는 내용'); // 응답 코드를 따로 작성하지 않으면 기본값 200
  res.status(500).send('에러가 나서 보여주는 내용'); // 
});


// 서버 연결
// app.listen(포트번호, 콜백): 몇 번 포트에서 서버를 실행할지 지정
// app.listen(3000, () => { // 하드코딩 방식 지양
app.listen(app.get('port'), () => {
  console.log('익스프레스 서버 실행');
});
// 서버 실행법 3가지
// 1) node app
// 2) nodemon app
// 3) npm start
