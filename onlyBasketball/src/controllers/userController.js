const path = require('path');
const User = require("../models/user");

//GET '/home'
exports.home = (req, res) => {
    console.log("GET home");
    let sess = req.session; //join 페이지에서 넘어온 session
    console.log(sess);

    if(sess.loginFlag) {
        res.render('main', {
            user_id: sess.user.user_id,
            password: sess.user.password,
            name: sess.user.name,
            email: sess.user.email,
            height: sess.user.height,
            elite_or_not: sess.user.elite_or_not,
            loginFlag: sess.loginFlag
        });
    } else res.render('main', {loginFlag : false}); //session 에 user_id, loginFlg가 없는 경우
};

//GET '/join' 회원가입 페이지 로딩
exports.join = (req, res) => {
    console.log("redirect to join page");
    return res.render('join');
}

//POST '/join' 회원 가입
exports.register = (req, res) => {
    const newUser = new User(
        {
            user_id: req.body.user_id,
            password: req.body.password,
            name: req.body.name,
            email: req.body.email,
            height: req.body.height,
            elite_or_not: req.body.elite_or_not,
        }
    )

    //공백값 체크 후 진행
    if (newUser.user_id && newUser.password && newUser.email) {
        //계정 생성
        User.create(newUser, (err, data) => {
            if (err) console.log(err);
        });
        //id 전달을 위한 session 설정 후 메인화면 이동
        // req.session.user_id = newUser.user_id;
        req.session.loginFlag = true;
        req.session.user = newUser;
        res.redirect('/');
    } else {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
        res.write("<script>alert('Please enter User Information!');history.back();</script>");
    }
};

//POST login
exports.login = (req,res) => {
    console.log("POST login");
    let user_id = req.body.user_id;
    let password = req.body.password;

    //id, pw 공백 체크 후 유저 찾기
    if(user_id && password){
        User.findByIdPw(user_id, password, (err, result) => {
            if (err) {
                if (err.kind == "not_found") {
                    // res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
                    res.write("<script>alert('ID와 PW를 다시 확인해주세요');history.back();</script>");
                } else console.log(err);
            } else if(result){//.length > 0
                console.log("login 처리 해야함");
                // console.log(result);
                req.session.loginFlag = true;
                // req.session.user_id = user_id;
                req.session.user = result;
                // res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' }) //함께 쓰면 오류남
                res.redirect('/');
            }
        });
    }else {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
        res.write("<script>alert('ID와 PW 모두 입력해주세요.');history.back();</script>");
    }
}

//GET logout
exports.logout = (req,res) => {
    req.session.loginFlag = false;
    res.redirect('/');
}

//회원 검색, 정보 조회
// exports.findById = (req,res) => {
//     console.log("Find user by id");
//     User.findById(req.params.id, function (err, user) {
//         if (err) res.send(err);
//         res.json(user);
//     });
// }

//회원정보 수정
// exports.edit = (req,res) => {
//     return res.send("Edit Users ☕")
// }

//회원탈퇴
// exports.remove = (req,res) => {
//     return res.send("Delete Users ☕")
// }


