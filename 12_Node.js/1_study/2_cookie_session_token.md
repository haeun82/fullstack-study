Auth(인증)을 통해 서비스는 유저를 검증할 수 있음

- 쿠키(Cookie)
- 세션(Session)
- 토큰(Token)
- JWT(Json Web Token)

1. 쿠키
쿠키를 이용해서 서버는 브라우저에 데이터를 저장할 수 있음
쉽게 브라우저에 저장할 수 있는 문자열!(key=value)
(유저에 관한 것을 기억하기 위해 - 예: 로그인 시 아이디 기억하기/아이디 저장) 

사이트에 방문(예: 네이버 메인) -> 브라우저는 서버에 요청 -> 서버는 이에 응답
이 때 응답에는 여러 데이터와 요청한 페이지 정보가 있는데 
여기에 브라우저에 저장하고자 하는 쿠키가 있을 수 있음

브라우저에 쿠키를 저장한 후에 해당 웹사이트 방문할 때마다 
해당 쿠키도 요청과 함께 보냄
참고로 쿠키는 도메인(예: naver.com)에 따라 제한됨
네이버 서버가 준 쿠키는 네이버 서버에만 보내짐

쿠키는 유효기간이 존재
1시간, 하루, 혹은 한달 등 서버가 정한 기간에 따라 유효함

쿠키는 인증 뿐만 아니라 여러가지 정보를 저장할 수 있음
예를 들어 웹사이트 언어 설정을 바꾸면 서버는 유저가 선택한 언어를 기억하려고 쿠키로 저장
이후에 유저가 해당 웹사이트에 방문하면 쿠키가 요청과 함께 보내지고
덕분에 서버는 쿠키에 저장해둔 언어설정의 페이지를 제공

2. 왜 세션과 토큰이 필요할까?
웹사이트 이용할 때 쓰는 HTTP 프로토콜은 'Stateless'임
Stateless란? 서버로 가는 모든 요청이 이전 요청과 독립적으로 다뤄진다는 뜻
요청끼리는 서로 연결이 없음(어딘가 저장되지도 않음)
그래서 요청이 끝나면 서버는 우리가 누군지 잊어버림
그렇기 때문에 요청할 때마다 우리가 누군지 알려줘야하는데
이를 구현하는 방법 중 하나가 세션임

3. 세션
'goni'라는 유저가 로그인을 하고싶다면
1) 아이디, 비밀번호를 서버로 보냄
2) 아이디가 존재하고 비번이 맞다면 서버는 세션 DB에 'goni'라는 유저를 생성
해당 세션에는 별도의 ID가 있음(=세션 ID)
3) 세션 ID는 쿠키를 통해서 브라우저에 저장됨
4) 따라서 같은 웹사이트의 다른 페이지로 이동하면
브라우저는 세션 ID를 갖고있는 쿠키를 서버에 보낼거임
5) 그러면 서버는 세션 ID와 함께 오는 쿠키를 확인
해당 세션 ID를 갖고 세션 DB를 확인하고 'goni' 라는 것을 알게됨!
해당 요청이 끝나고 또 다른 페이지로 이동하면 4~5번 프로세스가 반복됨

중요한 유저 정보는 모두 서버에 있음
클라이언트(브라우저)가 갖고 있는 것은 세션 ID뿐 
(여기서 쿠키는 세션ID를 전달하기 위한 매개체 역할)

근데 네이티브 앱(iOS, Android)는 쿠키를 못씀(브라우저에만 존재)
이 때는 토큰을 사용

4. 토큰
토큰은 그냥 이상하게 생긴 문자열임
해당 토큰을 서버에 보내고 서버는 세션 DB에서 해당 토큰과 일치하는 유저를 찾음

=======================================================================

세션에 대해 기억해야할 것은
현재 로그인한 유저들의 모든 세션 ID를 DB에 저장해야한다는 것!
즉, 요청이 들어올 때마다 서버는 쿠키를 받아서 세션 ID를 보고 
일치하는 유저를 찾아야하고 그제서야 다음 작업을 수행할 수 있음
(요청이 있을때마다 DB를 찾고 해야한다는 것!)
즉, 유저가 늘어남에 따라 DB 리소스(용량, 입출력 시간)가 더 필요함
참고로 세션 DB로 많이 쓰는 빠르고 저렴한 redis

이 때 JWT가 등장함

5. JWT
JWT는 이름에서 알 수 있듯이 토큰 형식임
JWT로 유저 인증을 처리하면 세션 DB를 가질 필요가 없고
서버는 유저 인증한다고 많은 일을 하지 않아도 됨!

토큰은 서버에서 발급받아서 요청할 때마다 보내야 하는 것

로그인 예시를 통해 JWT와 세션의 차이 비교
'goni' 라는 유저가 로그인을 하고 싶다면 
1) 아이디, 비밀번호를 서버에 보냄
2) 아이디가 존재하고 비번이 맞다면 서버는 DB에 뭔가를 생성하지 않고
그 대신 유저의 아이디를 가져다가 서명(sign) 알고리즘을 이용해서 서명을 할것임
그리고 해당 '사인된 정보(토큰)'를 긴 문자열 형태로 브라우저로 보냄
(세션과의 차이: DB를 건드리는 대신 정보를 사인하고 전달하는 것이 끝)
3) 서버에 요청을 보내려면 세션 ID와 비슷하게 해당 '사인된 정보(토큰)'을 서버에 보내야함
4) 그러면 서버는 토큰을 받아 해당 사인이 유효한지 체크하고 유효하다면 우리를 유저로 인증!

차이점 정리: 
세션에선 그냥 세션 ID만 주면 됨
세션에 대한 모든 정보는 세션 DB에 저장되어있음
페이지를 요청하면 서버는 세션 ID를 DB에서 찾으면 됨

JWT에선 서버는 유저를 인증하는데 필요한 정보를 사인해서 토큰에 저장
해당 토큰을 브라우저에게 응답으로 보냄
페이지를 요청하면 서버는 해당 토큰이 유효한지만 검증하면 됨(DB를 거칠 필요 없음)

(참고) JWT는 암호화되지 않음
즉, 누구나 열어서 내용을 볼 수 있음
그래서 비밀정보를 JWT 안에 넣어서는 안됨

6. 세션 vs JWT
세션을 사용하면 서버는 로그인 된 유저의 모든 정보를 저장
해당 정보를 이용하면 추가 기능들을 구현할 수 있음
예를 들면 특정 유저를 쫓아내고 싶을 때(강제 로그아웃) 그냥 세션 DB에서 해당 세션을 삭제해버리면 됨
인스타그램, 넷플릭스에 로그인된 모든 디바이스를 보여주는데 원하지 않는 디바이스에서 강제 로그아웃 가능
또는 넷플릭스처럼 계정 공유 숫자를 제한 할 수 있음, 현재 로그인을 몇명이 했고 시청하는지 알 수 있음

JWT를 사용하면 서버는 생성된 토큰을 추적하지 않음
서버가 아는 것은 토큰이 유효한가 여부임
세션이나 DB를 따로 쓸 필요 없이 유저 인증 가능
하지만 세션에서 말한 추가 기능들(강제 로그아웃)을 구현할 수 없음
해당 토큰이 만료되기 전까지는 로그인 상태가 유효함
(클라이언트에서 로그아웃 요청이 오기전까지 서버에서 임의로 만료시킬 수 없음)

두 방식이 장단점이 있기에 뭐가 더 좋고 나쁘고가 없음
JWT로 많이 옮긴 추세이지만
서비스가 더 커지고 유저 계정을 좀 더 파워풀하게 관리하고 싶다면 세션으로 구현