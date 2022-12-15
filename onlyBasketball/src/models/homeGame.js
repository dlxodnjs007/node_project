const mysqlConn = require("./db");
const {password} = require("../../config/mysql");

//생성자
let Game = function (game) {
    this.home_id = game.home_id;
    this.h_team_name = game.h_team_name;
    this.juso = game.juso;
    this.game_date = game.game_date;
    this.home_people = game.home_people;
    this.home_age = game.home_age;
    this.home_uniform = game.home_uniform;
    this.away_people = game.away_people;
    this.away_level = game.away_level;
    this.away_age = game.away_age;
    this.shower = game.shower;
    this.parking = game.parking;
    this.warning = game.warning;

};

//game 생성
Game.createHomeGame = (newGame, result) => {
    mysqlConn.query("INSERT INTO home_want_away SET ?", newGame, (err, res) => {
        if (err) {
            console.log("INSERT error", err);
            result(err, null);
            return;
        }
        console.log("INSERT success");
    });
};

//내가 생성한 HomeGame 조회
Game.findMyHomeGame = (user_id, res) => {
    mysqlConn.query("Select * from home_want_away where home_id = ?", [user_id], function (err, result) {
        if (err) throw err;
        console.log('내가 생성한 Home Game 조회');
        // console.log(result);
        res(null, result);
    });
};

Game.findHomeGameById = (id_no, res) => {
    mysqlConn.query("Select * from home_want_away where id_no = ?", [id_no], function (err, result) {
        if (err) throw err;
        console.log('Home Game ID로 조회');
        // console.log(result);
        res(null, result);
    });
}

Game.findAllHomeGame = (user_id, res) => {
    mysqlConn.query("Select * from home_want_away", function (err, result) {
        if (err) throw err;
        console.log('내가 생성한 Home Game 조회');
        res(null, result);
    });
};

Game.getNotMatchHomeGameById = (gameId, res) => {
    mysqlConn.query("Select * from home_want_away where (accept_status = 0) and (id_no = ?)", [gameId], function (err, result) {
        if (err) throw err;
        console.log('매칭안된 Home Game 조회');
        res(null, result);
    });
};

Game.getNotMatchHomeGame = (gameId, res) => {
    mysqlConn.query("Select * from home_want_away where accept_status = 0", function (err, result) {
        if (err) throw err;
        console.log('매칭안된 Home Game 조회');
        res(null, result);
    });
};

Game.getMatchHomeGame = (gameId, res) => {
    mysqlConn.query("Select * from home_want_away where accept_status = 1", function (err, result) {
        if (err) throw err;
        console.log('매칭 된 Home Game 조회');
        res(null, result);
    });
};

Game.setAcceptStatus = (gameId, flag, result) => {
    mysqlConn.query("update home_want_away set accept_status = ? where id_no = ? ", [flag, gameId], (err, res) => {
        if (err) {
            console.log("update error", err);
            result(err, null);
            return;
        }
        console.log("update success");
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

module.exports = Game;