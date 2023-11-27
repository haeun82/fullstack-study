const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');


// dotenv: 환경변수(시스템에 따른 설정값이나 비밀키 등) 관리
// 별도의 파일로 관리하는 이유는 보안과 설정의 편의성
// 1차 보안: 소스코드가 털리면 코드 안에 적어둔 비밀키나 서명 들이 같이 유출됨(하트코딩 지양)
// 2차 보안: .env는 github이나 드라이브(클라우드)에 올리지 않는다!
dotenv.config(); // 주로 맨 위에 작성(그래야 밑에서 쓸 수 있으니까)

const app = express();
app.set('port', process.env.PORT || 3000);

// morgan: 요청과 응답을 기록하는 미들웨어
// 클라이언트에서 어떤 요청이 왔는지 서버에서 어떻게 응답했는지 정보가 서버에 기록됨
// GET / 200 9.903 ms -272
// GET요청 / 주소(경로) 응답코드 응답에 걸린 시간 - 응답의 길이(바이트)
app.use(morgan('dev')); // 개발 시 사용
// app.use(morgan('combined')); // 배포 시 사용 - ip주소, 날짜/시간, 브라우저 정보 등 더 자세히 기록됨

// Express 제공 static 미들웨어: static 파일들을 제공하는 미들웨어
// static: 동적인 변동 사항이 없는 정적 파일들(예: css, js, image 등)
// 폴더를 서버를 등록해두면 폴더 안의 정적 파일들을 사용 가능
// app.use('요청경로,' express.static())
app.use('/', express.static(path.join(__dirname, 'public')))
// 예: localhost:3000/hello.css로 요청이 들어오면 -> 실제 위치는 learn-express/public/hello.css 

// (참고) 미들웨어끼리 순서 중요(성능적인 문제)
// => 단순히 정적 리소스만 제공하면 되는데 뒤에 위치하면 불필요한 미들웨어들이 실행됨
// 예: 요청에 따라 static 미들웨어의 실행이 달라짐
// localhost:3000/about.png -> /public 폴더 안에 해당 파일이 있으면 제공하고 여기서 끝
// localhost:3000/about ->next()가 호출되어 미들웨어 또는 /about 라우터까지 내려감

// cookie-parser: 쿠키 관련 조작들이 편해짐
// app.use(cookieParser([비밀키])); / [인자값]은 옵셔널
// 서명(암호화)된 쿠키
// 브라우저에 저장된 크키를 해커들이 못쓰게끔 서명을 붙임(근데 모든 쿠키를 서명하지는 않음)
app.use(cookieParser(process.env.COOKIE_SECRET));

// body-parser: 옛날에는 body-parser를 많이 썼는데 요새는 express에 내장돼서 안씀
// 요청 본문(body)에 담겨오는 데이터가 알아서 파싱됨
// 아래 2개는 거의 필수로 들어가는 설정!!
app.use(express.json()); // 클라이언트에서 json 데이터를 보냈을 때 파싱해서 결과를 req.body에 넣어줌
app.use(express.urlencoded({ extended: true }));
// 클라이언트에서 formData를 보냈을 때(form을 submit 할 때) 파싱해서 결과를 req.body에 객체 형태로 넣어줌
// extended: 쿼리스트링을 어떻게 처리할지(ture면 qs 패키지를 이용, false면 querystring 내장 모듈을 사용)
// true를 추천, qs > quertstring보다 편의 및 강력한 기능 지원
// 다만 FormData로 파일을 보내는 경우 urlencoded()로 처리 못 함 => 이 떈 multer 사용

// express-session: 요청마다 개인의 저장 공간을 만들어주는 세션 관리용 미들웨어
// 직접 만들어 복잡하게 사용하던 세션을 편하게 관리
app.use(session({
  resave: false, // 요청이 왔을 때 세션에 수정 사항이 생기지 않아도 다시 저장할지 여부
  saveUninitialized: false, // 세션에 저장할 내역이 없더라도 처음부터 세션을 생성할지 여부
  secret: process.env.COOKIE_SECRET, // 비밀키: 세션 하나 만들 때 세션 문자열(=세션 ID)을 암호화해서 보냄
  cookie: { // 세션 쿠키에 대한 설정
    httpOnly: true, // JS에서 쿠키에 접근하지 못하게 설정
  },
  name: 'session-cookie' // 세션 쿠키 이름에 대한 설정, 기본값은 'connect.sid'/ sid: sessionid
}));

app.get('/', (req, res) => {
  // 쿠키 사용하기
  // 이전 방식: 임의로 만든 parseCookies() 함수를 사용해서 객체로 변환
  console.log(req.cookies); // 쿠키 문자열이 {mycookie: 'test'} 와 같이 객체 형태로 알아서 파싱이 되어있음
  console.log(req.signedCookies); // 서명(암호화)된 쿠키 

  // 쿠키 설정하기
  // 이전 방식: 'set-cookie': `name=${encodeURIComponent(name)}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`
  // Expires: 만료 기한, 브라우저가 자동으로 서버에 쿠키를 보내주는데 만료된 쿠키는 제거되서 안보내짐, 안적으면 세션 쿠키가 됨
  // HttpOnly: JS에서 쿠키에 접근하지 못하게 설정, 보안상 설정하는 것이 좋음
  // Path: /, 즉, 루트 아래에 있는 주소에서 이 쿠키를 다 쓸 수 있음
  // 위 문자열로 쓴 것을 메서드로 쉽게 사용 가능
  // res.cookie(키, 값, [옵션]);
  res.cookie('name', 'haeun', {
    expires: new Date(Date.now() + 5 * 60 * 1000), // 5분 뒤
    httpOnly: true,
    path: '/',
    signed: true, // 서명(암호화) 옵션: 쿠키 뒤에 서명이 붙음
    // secure: true // HTTPS일 경우에만 쿠키가 전송됨
  }); 

  // 쿠키 지우기
  // res.clearCookie(키, [옵션]); / 옵션을 줄거면 옵션이 일치해야함!
  // res.clearCookie('name');
  // res.clearCookie('name', {
  //   httpOnly: true,
  //   path: '/',
  //   signed: true,
  // });

  // req.body: 요청 본문에 담겨오는 데이터를 바로 쓸 수 있음
  // console.log(req.body.name); // 나중에 직접 테스트 해볼것!

  // req.session: 요청을 보낸 사용자에 대한 고유한 세션
  req.session.name = 'haeun'; // 세션 등록하면 세션 쿠키는 알아서 내려줌
  // 세션 ID 확인
  // 해당 세션 ID로 세션에 등록된 정보가 없으면 세션 ID는 요청마다 새롭게 생성됨
  console.log(req.session.id);
  console.log(req.sessionID);
  console.log(req.session);

  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/user', (req, res, next) => {
  console.log(req.body.username);
  // res.send('등록 완료');
  // res.redirect('/'); // 동기식일때 
}); 

app.listen(app.get('port'), () => {
  console.log(app.get('port') + '번에서 익스프레스 서버 실행');
});





