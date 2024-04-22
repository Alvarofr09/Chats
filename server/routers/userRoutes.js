const express = require("express");
const {
	userRegister,
	userLogin,
	setAvatar,
} = require("../controllers/userController");

const userRouter = express.Router();

userRouter.post("/register", userRegister);
userRouter.post("/login", userLogin);
userRouter.post("/setAvatar/:id", setAvatar);

module.exports = userRouter;
