회원인증 방법(크게 3가지)

1. 세션 기반 인증 - 전통적인 방식, 제일 많이 씀(범용적)
사용자가 로그인 시 서버는 세션 객체(데이터)를 만들어 저장하고 세션 ID(키값)가 적힌 쿠키를 발행함
(쿠키: 브라우저에 저장할 수 있는 문자열)

(로그인 후 활동) 마이페이지 접속 시 쿠키는 서버에 자동으로 몰래 보내짐
그러면 서버는 세션 데이터 중에 일치하는 세션 키값이 있으면 마이페이지를 내려줌

이 방식은 사용자가 로그인 했다라는 정보(로그인 상태)를 서버에 저장 <- 장점이자 단점

2. 토큰 기반 인증(JWT) - 진보된 방식
사용자가 로그인 시 서버는 Json Web Token(암호환된 긴 문자열)을 발행해줌
그러면 브라우저는 쿠키 아니면 로컬 스토리지에 저장

(로그인 후 활동) 마이페이지 접속 시 JWT를 헤더에 포함해서 서버에 요청을 보냄
그러면 서버는 토큰이 유효한지 검사를 하고 유효기간이 안 지났으면 마이페이지를 내려줌

이 방식은 서버가 사용자들의 로그인 상태를 저장할 필요가 없음 
즉, 유통기하한이 있는 열쇠 같은 개념

3. OAuth(Open Authentication)
다른 사이트의 프로필 정보를 가져오는 방식
서버에서 구글이나 페북의 문을 두드리고 이 사람 프로필 좀 갖다 쓸 수 있을까요?

예를 들어 소셜 로그인(Sign in with Google)을 하면
구글 계저 정보를 저쪽에 제공하는걸 동의하는지 묻는 창이 나옴
동의하면 구글에 가입한 정보(email, 이름, 성별 등 )가 내 서버로 전송됨
이 정보를 가지고 계정 만들기, 세선 면들기, JMT 발급 등 아무거나 가능

이 방식은 서버가 비밀번호를 다룰 일이 없음
클라이언트도 편하고 서버도 편하지만
가장 큰 단점은 소셜 사이트가 없어지는 경우가 있음
그 외에도 OAuth를 중단하거나 방법을 수정하거나 해당 소셜 사이트의 API 서버가 다운되거나 하면 로그인이 불가능함
그래서 보통 OAuth는 옵션으로 제공하는 편

4. 세션을 DB에 저장하려면?
사용자가 로그인하려면 세션을 하나 만들어주는데 DB가 아니라 서버가 실행되는 컴퓨터 메모리에 저장
즉, 서버가 재시작되면 세션이 날라감
그게 싫고 안정적으로 쓰고 싶거나 웹서버가 여러대 일때 세션을 공유하고 싶다면 세션을 DB에 저장하면됨
connect-mongo(mongoDB에 세션 저장할 때), connect-redis 같은 라이브러리 설치 후 express-session에 store 속성에 설정

5. 참고 자료
- Passport 모듈 사용법
https://inpa.tistory.com/entry/NODE-%F0%9F%93%9A-Passport-%EB%AA%A8%EB%93%88-%EA%B7%B8%EB%A6%BC%EC%9C%BC%EB%A1%9C-%EC%B2%98%EB%A6%AC%EA%B3%BC%EC%A0%95-%F0%9F%92%AF-%EC%9D%B4%ED%95%B4%ED%95%98%EC%9E%90


