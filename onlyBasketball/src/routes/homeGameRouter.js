const express = require("express");
const homeGameRouter = express.Router();

const homeGameController = require('../controllers/homeGameController');

//127.0.0.1:3000/matching 이후 경로
homeGameRouter.get("/", homeGameController.matchingHome);
homeGameRouter.get("/homeGame", homeGameController.findMyHomeGame);
homeGameRouter.post("/homeWantAway", homeGameController.createHomeGame);
homeGameRouter.get("/makeHomeGame", homeGameController.makeHomeGame);
// homeGameRouter.get("/jusoPopup", homeGameController.jusoPopup);
// homeGameRouter.post("/jusoPopup", homeGameController.jusoCallback);
homeGameRouter.get("/showHomeGame/:id", homeGameController.showHomeGame);
homeGameRouter.get("/showApprovedGame/:id", homeGameController.showApprovedGame);
homeGameRouter.get("/showHomeGame/match/:apply_id", homeGameController.HomeAwayMatch);
homeGameRouter.get("/showHomeGame/matchCancle/:apply_id", homeGameController.HomeAwayMatchCancle);

homeGameRouter.get("/awayGame", homeGameController.awayHome);
homeGameRouter.get("/awayWantHome", homeGameController.awayWantHome);
homeGameRouter.get("/awayToHome/:id", homeGameController.awayToHome);
homeGameRouter.post("/awayApply", homeGameController.awayApply);


module.exports = homeGameRouter;