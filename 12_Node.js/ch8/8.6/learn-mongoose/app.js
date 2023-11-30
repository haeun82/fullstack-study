const express = require('express');
const path = require('path');
const morgan = require('morgan');

const connect = require('./schemas/index'); // index 생략가능
const indexRouter = require('./routes');
const usersRouter = require('./routes/users');
const commentsRouter = require('./routes/comments');


const app = express();
app.set('port', process.env.PORT || 3002);
app.set('view engine', 'ejs'); // view engine의 확장자 지정
connect(); // 몽고디비에 연결

app.use(morgan('dev'));
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(express.json()); 
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/comments', commentsRouter);

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  console.error(err);
  // 템플릿 엔진 변수 생성
  // res.locals라는 객체는 앱이 사용하는 템플릿 엔진의 종류에 상관없이 데이터를 담으면 전달됨
  // 이 객체에 담은 값들은 템플릿 엔진에서 마음껏 갖다 쓸 수 있다.
  // 값이 전달되면 템플릿에서는 '전역'이므로 앞에 아무것도 붙일 필요가 없음
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {}; // 운영(배포) 버전에서는 에러 객체를 보여주지 않기 위해 
  res.status(err.status || 500);
  res.render('error'); // .ejs 확장자 생략 가능
});

app.listen(app.get('port'), () => {
  console.log(app.get('port') + '번에서 익스프레스 서버 실행');
});
