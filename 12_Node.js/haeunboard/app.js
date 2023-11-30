const express = require('express');
const path = require('path');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const session = require('express-session');

dotenv.config();

// 라우터 가져오기
const indexRouter = require('./routes');
const postRouter = require('./routes/post');
// DB 연결 함수 가져오기
const { connect } = require('./database');

const app = express();
app.set('port', process.env.PORT || 8080);
app.set('view engine', 'ejs'); // view engine의 확장자 지정
connect(); //몽고디비에 연결

app.use(morgan('dev'));
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
  },
  name: 'session-cookie'
}));

// 라우터를 미들웨어로 등록
app.use('/', indexRouter);
app.use('/post', postRouter);

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

app.use((err ,req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

app.listen(app.get('port'), () =>{
  console.log(app.get('port') + '번에서 익스프레스 서버 실행');
});