const User = require("../models/user");
const Game = require("../models/homeGame");
const awayGame = require("../models/awayGame");
const {all} = require("express/lib/application");
const {request} = require("express");
const {home} = require("./userController");

exports.matchingHome = (req,res) => {
    let sess = req.session;
    console.log("GET '/matching'");
    if(sess.loginFlag) {
        res.render('matching', {
            user_id: sess.user.user_id,
            password: sess.user.password,
            name: sess.user.name,
            email: sess.user.email,
            height: sess.user.height,
            elite_or_not: sess.user.elite_or_not,
            loginFlag: sess.loginFlag
        });
    } else {
        // res.write("<script>alert('로그인 후 게임');history.back();</script>");
        res.render('matching', {loginFlag : false}); //session 에 user_id, loginFlg가 없는 경우
    }
}

//GET makeHomeGame 게임생성페이지 호출
exports.makeHomeGame = (req,res) => {
    let sess = req.session;

    res.render('makeHomeGame', {
        user_id: sess.user.user_id,
        password: sess.user.password,
        name: sess.user.name,
        email: sess.user.email,
        height: sess.user.height,
        elite_or_not: sess.user.elite_or_not,
        loginFlag: sess.loginFlag
    });
}

//POST homeWantAway 홈게임 생성
exports.createHomeGame = (req,res) => {
    let sess = req.session;

    const newGame = new Game(
        {
            home_id: req.body.home_id,
            h_team_name: req.body.h_team_name,
            juso: req.body.juso,
            game_date: req.body.game_date,
            home_people: req.body.home_people,
            home_age: req.body.home_age,
            home_uniform: req.body.home_uniform,
            away_people: req.body.away_people,
            away_level: req.body.away_level,
            away_age: req.body.away_age,
            shower: req.body.shower,
            parking: req.body.parking,
            warning: req.body.warning,
            accept_status: 0,
        }
    )
    console.log("POST '/matching/create'");
    console.log(sess);
    Game.createHomeGame(newGame, (err, data) => {
        if (err) console.log(err);
        console.log('create 완료');
    });
    res.redirect('/matching/homeGame');
}

//GET homeGame 홈게임 조회 및 홈게임 페이지 띄우기
exports.findMyHomeGame = (req,res) => {
    let sess = req.session;
    let user_id = sess.user.user_id;
    console.log("getGame 호출");
    // console.log(sess.user_id);

    Game.findMyHomeGame(user_id, (err, data) => {
        if (err) console.log(err);
        // console.log(data);
        res.render('homeGame', {
            user_id: sess.user.user_id,
            password: sess.user.password,
            name: sess.user.name,
            email: sess.user.email,
            height: sess.user.height,
            elite_or_not: sess.user.elite_or_not,
            loginFlag: sess.loginFlag,
            gameList: data
        });
    });
}

exports.showHomeGame = (req, res) => {
    // console.log(req.params.id);
    let sess = req.session;
    applyList = [];
    Game.findHomeGameById(req.params.id, (err, data) => {
        if (err) console.log(err);
        awayGame.getAwayGameByGameId(req.params.id, (err, away) => {
            if (err) console.log(err);
            console.log(away);
            res.render('showHomeGame', {
                user_id: sess.user.user_id,
                password: sess.user.password,
                name: sess.user.name,
                email: sess.user.email,
                height: sess.user.height,
                elite_or_not: sess.user.elite_or_not,
                loginFlag: sess.loginFlag,
                game: data[0],
                list: away,
            });
        });
    });
}

// GET awayGame 승인대기중인 게임과 아닌 게임 구별 필요
// exports.awayHome = (req,res) => {
//     console.log("GET awayGame");
//     let sess = req.session;
//     let obj = {
//         user_id: sess.user.user_id,
//         password: sess.user.password,
//         name: sess.user.name,
//         email: sess.user.email,
//         height: sess.user.height,
//         elite_or_not: sess.user.elite_or_not,
//         loginFlag: sess.loginFlag,
//         // aList: data,
//         hList: [],
//     }
//     // awayGmae.getAwayGameByGameId()
//     //select * from apply_away_info where away_id = ? and accept_status = 0
//     awayGame.getNotAcceptedGamesByUserId(sess.user.user_id,  (err, data) => {
//         if (err) console.log(err);
//         console.log("away home에 전달하는 값");
//         // console.log(data);
//         for (var i=0; i<data.length; i++) {
//             console.log(data[i].game_id_no);
//             //Select * from home_want_away where (accept_status = 0) and (id_no = ?)
//             Game.getNotMatchHomeGameById(data[i].game_id_no, (err, homeGame) => {
//                 if (err) console.log(err);
//                 obj.hList.push(homeGame[0]);
//             });
//         };
//     });
//     console.log(obj.hList);
//     res.render('awayGame', obj);
// }

// exports.awayHome = (req,res) => {
//     console.log("GET awayGame");
//     let sess = req.session;
//     // awayGmae.getAwayGameByGameId()
//     // awayGame.getNotAcceptedGamesByUserId(sess.user.user_id, (err, data) => {
//     Game.getNotMatchHomeGame(req, (err, data) => {
//         if (err) console.log(err);
//         // console.log(data);
//         res.render('awayGame', {
//             user_id: sess.user.user_id,
//             password: sess.user.password,
//             name: sess.user.name,
//             email: sess.user.email,
//             height: sess.user.height,
//             elite_or_not: sess.user.elite_or_not,
//             loginFlag: sess.loginFlag,
//             hList: data,
//         });
//     })
// }
exports.showApprovedGame = (req, res) => {
    let sess = req.session;

    Game.findHomeGameById(req.params.id, (err, result) => {
        if (err) console.log(err);
        console.log(result);
        res.render('showGameApproved', {
            user_id: sess.user.user_id,
            password: sess.user.password,
            name: sess.user.name,
            email: sess.user.email,
            height: sess.user.height,
            elite_or_not: sess.user.elite_or_not,
            loginFlag: sess.loginFlag,
            game: result[0]
        });

    })
}

exports.awayHome = (req,res) => {
    console.log("GET awayGame");
    let sess = req.session;
    // awayGmae.getAwayGameByGameId()
    // awayGame.getNotAcceptedGamesByUserId(sess.user.user_id, (err, data) => {
    Game.getMatchHomeGame(req, (err, data) => {
        if (err) console.log(err);
        console.log(data);
        res.render('awayGame', {
            user_id: sess.user.user_id,
            password: sess.user.password,
            name: sess.user.name,
            email: sess.user.email,
            height: sess.user.height,
            elite_or_not: sess.user.elite_or_not,
            loginFlag: sess.loginFlag,
            hList: data,
        });
    })
}

exports.awayWantHome = (req, res) => {
    console.log("GET awayWantHome");
    let sess = req.session;
    Game.findAllHomeGame(req, (err, data) => {
        if (err) console.log(err);
        console.log("get all home game");
        // console.log(data.length);
        res.render('awayWantHome', {
            user_id: sess.user.user_id,
            password: sess.user.password,
            name: sess.user.name,
            email: sess.user.email,
            height: sess.user.height,
            elite_or_not: sess.user.elite_or_not,
            loginFlag: sess.loginFlag,
            listHWA: data
        });
    })
}

exports.awayToHome = (req, res) => {
    let sess = req.session;
    Game.findHomeGameById(req.params.id, (err, data) => {
        if (err) console.log(err);
        // console.log(data);
        res.render('awayToHome', {
            user_id: sess.user.user_id,
            password: sess.user.password,
            name: sess.user.name,
            email: sess.user.email,
            height: sess.user.height,
            elite_or_not: sess.user.elite_or_not,
            loginFlag: sess.loginFlag,
            game: data[0]
        });
    });
}

//POST awayApply
exports.awayApply = (req, res) => {
    let sess = req.session;

    const newApply = new awayGame(
        {
            // apply_id: req.body.user_id,
            game_id_no: req.body.game_id_no,
            away_id: req.body.away_id,
            a_team_name: req.body.a_team_name,
            away_people: req.body.away_people,
            away_level: req.body.away_level,
            away_age: req.body.away_age,
            accept_status: 0,
        }
    )

    console.log("POST awayApply");

    awayGame.setApplyAway(newApply, (err, data) => {
        if (err) console.log(err);
        console.log('create 완료');
    });

    // res.redirect('/matching/awayWantHome');
    res.send("<script>window.close();</script > ")
}

exports.HomeAwayMatch = (req, res) => {
    console.log("match start");
    awayGame.setAcceptStatus(req.params.apply_id, 1, (err, data) => {
        if (err) console.log(err);
        console.log('away status update 완료');
    })
    awayGame.getAwayGameById(req.params.apply_id, (err, data) => {
        if (err) console.log(err);
        console.log("getAwayGameById의 response");
        console.log(data);
        let id = data[0].game_id_no;
        Game.setAcceptStatus(id, 1, (err, data) => {
            if (err) console.log(err);
            console.log('home status update 완료');
        });
        res.send("<script>window.close();</script > ")
    });
}

exports.HomeAwayMatchCancle = (req, res) => {
    console.log("match cancle start");
    awayGame.setAcceptStatus(req.params.apply_id, 0, (err, data) => {
        if (err) console.log(err);
        console.log('away status update 완료');
    })
    awayGame.getAwayGameById(req.params.apply_id, (err, data) => {
        if (err) console.log(err);
        // console.log("getAwayGameById의 response");
        // console.log(data);
        let id = data[0].game_id_no;
        Game.setAcceptStatus(id, 0, (err, data) => {
            if (err) console.log(err);
            console.log('home status update 완료');
        });
        res.send("<script>window.close();</script > ")
    });
}


exports.jusoPopup = (req,res) => {
    console.log("GET jusoPopup");

    res.render('jusoPopup', {});
}

exports.jusoCallback = (req,res) => {
    console.log('POST jusoPopup');
    res.locals = req.body;
    res.render('jusoPopup');
}

//홈게임 수정
exports.edit = (req,res) => {
    return res.send("Edit Game ☕");
}

//홈게임 삭제
exports.remove = (req,res) => {
    return res.send("Delete Game ☕");
}