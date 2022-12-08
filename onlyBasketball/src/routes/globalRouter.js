const express = require('express');
const globalRouter = express.Router();

const homeGameController = require("../controllers/homeGameController");
const userController = require( "../controllers/userController");

globalRouter.get("/join",userController.join);
globalRouter.get("/login",userController.login);
//globalRouter.get("/search",search);

export default globalRouter;