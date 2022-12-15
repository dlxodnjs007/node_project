const mysqlConn = require("./db");
const {password} = require("../../config/mysql");

//생성자
let User = function (user) {
    this.user_id = user.user_id;
    this.password = user.password;
    this.name = user.name;
    this.email = user.email;
    this.height = user.height;
    this.elite_or_not = user.elite_or_not;
};

//user생성
// User.create = (newUser, result) => {
//     mysqlConn.query("INSERT INTO user SET ?", newUser, (err, res) => {
//         if (err) {
//             console.log("INSERT error", err);
//             result(err, null);
//             return;
//         }
//         console.log("INSERT success");
//     });
// };

//user 중복 검사 후 생성
User.create = (newUser, res) => {
    //user_id 중복 체크
    mysqlConn.query('SELECT * FROM user WHERE user_id = ?', newUser.user_id, (err, res) => {
        if (err) console.log(err);
        //중복되는 id 없는 경우 INSERT 실행
        if (res.length <= 0) {
            mysqlConn.query("INSERT INTO user SET ?", newUser, (err, res) => {
                if (err) {
                    console.log("INSERT error", err);
                    res(err, null);
                    return;
                }
                console.log("INSERT success");
            });
        }else{
            // res.write("<script>alert('이미 존재하는 아이디입니다.');history.back();</script>"); //팝업 처리 실패
            console.log("아이디 중복");
        }
    });
}

//로그인 처리를 위한 검색
User.findByIdPw = (user_id, password, res) => {
    mysqlConn.query("Select * from user where user_id = ? AND password = ?", [user_id, password], function (err, result) {
        if (err) throw err;
        if(result.length > 0) {
            //조회 된 레코드를 콜백함수를 통해서 보내기
            console.log('회원조회 성공');
            res(null, result[0]);
            return;
        } else{
            res({kind: "not_found"}, null);
        }
    });
};

// // 특정 사용자 검색
// User.findById = function (id, result) {
//     mysqlConn.query("Select * from user where user_id = ? ", id, function (err, res) {
//         if (err) {
//             console.log("error: ", err);
//             result(err, null);
//         }
//         // res.redirect('/join');
//     });
// };


// 모든 사용자 검색
// User.findAll = function (result) {
//     mysql.query("Select * from user", function (err, res) {
//         if (err) {
//             console.log("error: ", err);
//             result(null, err);
//         } else {
//             console.log("employees : ", res);
//             result(null, res);
//         }
//     });
// };

module.exports = User;