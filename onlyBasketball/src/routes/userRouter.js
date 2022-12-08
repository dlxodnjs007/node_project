const express = require('express');
const userRouter = express.Router();

const userController = require("../controllers/userController");

//메인페이지
userRouter.get("/", userController.home);

//회원가입
userRouter.post("/join", userController.register);

userRouter.get("/join",userController.join);

//로그인
// userRouter.get("/login",userController.login);
//
// userRouter.get("/edit",userController.edit);
//
// userRouter.get("/delete",userController.remove);
//
// userRouter.get("/:id",userController.findById);


module.exports = userRouter;