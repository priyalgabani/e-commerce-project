const { Router } = require("express");
const { displayreg, register, displaylogin, login, profile, resetpass, verify, forgetpass, newpassword, updatepassword } = require("../controllers/user.controller");
const Auth = require("../middleware/auth");


const userRouter = Router();

userRouter.get("/reg",displayreg);

userRouter.post("/reg",register);

userRouter.get("/login",displaylogin);

userRouter.post("/login",login);

userRouter.get("/profile",profile);

userRouter.post("/sendmail",resetpass);

userRouter.get("/sendmail",forgetpass);

userRouter.get("/verify/:otp",verify);

userRouter.get("/newpass",newpassword);

userRouter.post("/newpass",updatepassword);

module.exports = userRouter;



