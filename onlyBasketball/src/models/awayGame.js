const mysqlConn = require("./db");
const {password} = require("../../config/mysql");
const {awayHome} = require("../controllers/homeGameController");

//생성자
let awayGame = function (game) {
    this.apply_id = game.apply_id;
    this.game_id_no = game.game_id_no;
    this.away_id = game.away_id;
    this.a_team_name = game.a_team_name;
    this.away_people = game.away_people;
    this.away_level = game.away_level;
    this.away_age = game.away_age;
    this.accept_status = game.accept_status

};

awayGame.getNotAcceptedGamesByUserId = (user_id, result) => {
    mysqlConn.query("select * from apply_away_info where away_id = ? and accept_status = 0", [user_id], (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }
        // console.log("getNotAcceptedGamesByUserId");
        // console.log(res);
        result(null, res);
    });
}

awayGame.getAwayGameByGameId = (id, result) => {
    mysqlConn.query("select * from apply_away_info where game_id_no = ?", [id], (err, res) => {
        if (err) {
            console.log("get away game error", err);
            result(err, null);
            return;
        }
        result(null, res);
        console.log("get away game success");
    });
}

awayGame.getAwayGameById = (id, result) => {
    mysqlConn.query("select * from apply_away_info where apply_id = ?", [id], (err, res) => {
        if (err) {
            console.log("get away game error", err);
            result(err, null);
            return;
        }
        result(null, res);
        console.log("get away game success");
    });
}

//away apply 생성
awayGame.setApplyAway = (newApply, result) => {
    mysqlConn.query("INSERT INTO apply_away_info SET ?", newApply, (err, res) => {
        if (err) {
            console.log("INSERT error", err);
            result(err, null);
            return;
        }
        console.log("INSERT success");
    });
};

awayGame.setAcceptStatus = (applyId, flag, result) => {
    mysqlConn.query("update apply_away_info set accept_status = ? where apply_id = ? ", [flag, applyId], (err, res) => {
        if (err) {
            console.log("update error", err);
            result(err, null);
            return;
        }
    });
}

//내가 생성한 HomeGame 조회
// awayGame.findMyHomeGame = (user_id, res) => {
//     mysqlConn.query("Select * from home_want_away where home_id = ?", [user_id], function (err, result) {
//         if (err) throw err;
//         console.log('내가 생성한 Home Game 조회');
//         // console.log(result);
//         res(null, result);
//     });
// };

awayGame.findHomeGameById = (id_no, res) => {
    mysqlConn.query("Select * from home_want_away where id_no = ?", [id_no], function (err, result) {
        if (err) throw err;
        console.log('내가 생성한 Home Game 조회');
        // console.log(result);
        res(null, result);
    });
}
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

module.exports = awayGame;