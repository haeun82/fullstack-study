// 내장 모듈: Node.js에서 이미 모듈로 만들어 놓은 것을 편하게 가져와 사용, require(); 사용
// os 모듈: 운영체제의 정보를 담고 있는 모듈
const os = require('os');  // 내장 모듈은 경로 대신 이름만 적어주면 됨(설치한 라이브러리를 가져와 쓸 때랑 동일)

console.log('운영체제 정보---------------------------------');
console.log('os.arch():', os.arch());
console.log('os.platform():', os.platform());
console.log('os.type():', os.type());
console.log('os.uptime():', os.uptime()); // 운영체제 부팅 이후 흐른 시간(초)을 보여줌
console.log('os.hostname():', os.hostname()); // 컴퓨터의 이름을 보여줌
console.log('os.release():', os.release());// 운영체제 버전 보여줌

console.log('경로------------------------------------------');
console.log('os.homedir():', os.homedir()); // 홈 디렉터리 경로를 보여줌
console.log('os.tmpdir():', os.tmpdir()) // 임시 파일 저장 경로 보여줌

console.log('cpu 정보--------------------------------------');
console.log('os.cpus():', os.cpus()); // 컴퓨터의 코어 정보
console.log('os.cpus().length:', os.cpus().length); // 코어의 갯수 / 컴퓨터의 코어 갯수만큼 서버를 띄우고 싶을때 활용

console.log('메모리 정보-----------------------------------');
console.log('os.freemem():', os.freemem()); // 사용 가능한 메모리(RAM)를 보여줌
console.log('os.totalmem()', os.totalmem()); // 전체 메모리 용량