const express = require('express');
const path = require('path');
const bodyParser = require("body-parser");
//로그인 기능 구현 등을 위한 세션 모듈 사용
const session = require('express-session');
const nunjucks = require('nunjucks');
//세션을 메모리에 저장
const MemoryStore = require('memorystore')(session);

const userRouter = require('./src/routes/userRouter');
// const homeGameRouter = require('./src/routes/homeGameRouter');
// const globalRouter = require('./src/routes/globalRouter');

const app = express();
const port = 3000;

const maxAge = 1000*60*5;

//session obj 정의 및 사용
const sessionObj = {
    secret : 'secret',
    resave : false,
    saveUninitialized : true,
    store : new MemoryStore({checkPeriod: maxAge}),
    cookie : {
        maxAge,
    }
};
app.use(session(sessionObj));

// /static 아래 경로로 public 폴더 접근 가능
app.use('/static', express.static(__dirname + '/public'));

//ejs 사용을 위한 설정
app.set('views', __dirname + '/public/views');
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended : true}));

//메인페이지 호출
app.use("/", userRouter);

// app.use("/homeGame", homeGameRouter);

app.listen(3000, () => {
    console.log(`Server at 127.0.0.1:${port}`);
});




//router 사용 하기 전 기본 페이지 호출
// app.get('/', (req, res) => {
//     console.log("app.js get /");
//     res.sendFile(path.join(__dirname + '/public/main_old.html'));
// });
