const http = require('http');

http.createServer((req, res) => {
  console.log(req.url, req.headers.cookie); // 쿠키의 데이터 타입은 일반 문자열
  // 쿠키를 설정하려면 응답 헤더(res.writeHead)에 작성함
  // res.writeHead(200, { 'set-cookie': 'mycookie=test' }); // 'set-cookie': 브라우저에 쿠키를 설정하라고 명령함
  res.writeHead(200, { 'set-cookie': ['mycookie=test', 'name=haeun'] }); // 여러개는 배열로 저장
  res.end('Hello Cookie');
})
  .listen(8083, () => {
    console.log('8083번 포트에서 서버 대기 중입니다!');
  });

// 처음 접속 시와 쿠키를 한 번 받고 난 뒤 요청 헤더 비교
// 브라우저가 자동으로 쿠키를 서버로 전달하는 것도 확인! 

// (참고)
// /favicon.ico는 크롬 브라우저가 알아서 보내는 요청
// Session cookie는 브라우저를 닫으면 사라짐(크롬 기준 탭이 아닌 브라우저 전체를 닫아야 함!)