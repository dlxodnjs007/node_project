const express = require("express");
const homeGameRouter = express.Router();

const homeGameController = require('../controllers/homeGameController');

// homeGameRouter.get("/newGame", homeGameController.newGame);
// homeGameRouter.get("/:id", homeGameController.getGame);
// homeGameRouter.get("/:id/edit", homeGameController.edit);
// homeGameRouter.get("/:id/delete", homeGameController.remove);

module.exports = homeGameRouter;