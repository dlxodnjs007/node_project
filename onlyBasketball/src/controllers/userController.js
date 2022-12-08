const path = require('path');
const User = require("../models/user");

exports.home = (req, res) => {
    console.log("redirect main.ejs");
    console.log(req.session);
    return res.render('main.ejs');
    // return res.sendFile(path.join(__dirname, '..', '..', 'public/main.html'));
};

//회원가입 페이지 로딩
exports.join = (req, res) => {
    console.log("redirect to join page");
    return res.sendFile(path.join(__dirname, '..', '..', 'public/join.html'));
}

//회원 가입
exports.register = (req, res) => {
    //insert할 신규 객체 정의
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

    if (newUser.user_id && newUser.password && newUser.email) {
        User.create(newUser, (err, data) => {
            if (err) console.log(err);
        });
        res.redirect('/');
    } else {
        res.write("<script>alert('Please enter User Information!');history.back();</script>");
        // res.send('Please enter User Information!');
    }
};

// if (newUser.user_id && newUser.password && newUser.email) {
//     //입력전에 중복값 조회
//     User.query('SELECT * FROM user WHERE user_id = ? AND password = ? AND name = ?', [newUser.user_id, newUser.password, newUser.name], function(error, results, fields) {
//         //조회 시 오류
//         if (error) console.log(error);
//         //미중복 시 INSERT
//         if (results.length <= 0) {
//             User.query('INSERT INTO user (user_id, password, name, email, height, elite_or_not) VALUES(?,?,?,?,?,?)', [user_id, password, name, email, height, elite_or_not],
//                 function (error, data) {
//                     if (error)
//                         console.log(error);
//                     else
//                         console.log(data);
//                 });
//         }
//         res.redirect('/');
//     });
// } else {
//     res.send('Please enter User Information!');
//     res.end();
// }

//회원 로그인
// exports.login = (req,res) => {
//     return res.send("Login ☕");
// }

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


