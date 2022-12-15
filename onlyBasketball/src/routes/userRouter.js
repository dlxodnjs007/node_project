const express = require('express');
const userRouter = express.Router();

const userController = require("../controllers/userController");

//메인페이지
userRouter.get("/", userController.home);

//DB에 신규 유저 등록
userRouter.post("/join", userController.register);

//회원가입 페이지
userRouter.get("/join",userController.join);

userRouter.post("/login",userController.login);

userRouter.get("/logout",userController.logout);

//
// userRouter.get("/delete",userController.remove);
//
// userRouter.get("/:id",userController.findById);


module.exports = userRouter;