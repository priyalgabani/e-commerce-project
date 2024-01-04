const user = require("../models/user.schema");
const bcrypt = require("bcrypt");
const cookies = require("cookie-parser");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const otpgenerator = require("otp-generator");

const displayreg = (req, res) => {
  res.render("signup");
};

const register = async (req, res) => {
  let { username, email, password } = req.body;
  const User = await user.findOne({ email });

  if (User) {
    return res.redirect("/user/login");
  }

  bcrypt.hash(password, 10, async (err, hash) => {
    let obj = {
      username: username,
      email: email,
      password: hash,
      img: req.file.originalname,
    };
    let val = await user.create(obj);
    let token = jwt.sign({ id: val.id }, "token");
    res.cookie("token", token);
    res.redirect("/user/login");
  });
};

const displaylogin = (req, res) => {
  res.render("login");
};

const login = async (req, res) => {
  const { email, password } = req.body;
  let data = await user.findOne({ email });
  if (data) {
    bcrypt.compare(password, data.password, (err, result) => {
      if (result) {
        let token = jwt.sign({ id: data._id }, "token");
        res.cookie("token", token);
        res.redirect("/product/pro");
      } else {
        res.send({ msg: "Password incorrect" });
      }
    });
  } else {
    res.send({ msg: "User not found" });
  }
};

const usera = async (req, res) => {
  let data = await user.find();
  res.send(data);
};

const profile = (req, res) => {
  res.render("profile");
};

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "priyalgabani2004@gmail.com",
    pass: "ezdb rkqi cygq hryt",
  },
});

let otp = otpgenerator.generate(6, {
  upperCaseAlphabets: false,
  specialChars: false,
  lowerCaseAlphabets: false,
});

const resetpass = async (req, res) => {
  let { email } = req.body;
  let User = await user.findOne({ email });

  if (User) {
    const mailoption = {
      from: "priyalgabani2004@gmail.com",
      to: email,
      subject: "password reset",
      html: `<a href=http://localhost:8080/user/verify/${otp}>click here to verify otp ${otp}</a>`,
    };
    transporter.sendMail(mailoption, (err, info) => {
      if (err) {
        console.log(err);
      } else {
        res.send("check your password");
      }
    });
    res.cookie("userId", User.id).send("sending otp");
  } else {
    res.send("user not found");
  }
};

const verify = (req, res) => {
  let verifyotp = req.params.otp;
  if (verifyotp === otp) {
    res.redirect("/user/newpass");
  } else {
    res.send("Invalid otp");
  }
};

const forgetpass = (req, res) => {
  res.render("forgetpass");
};

const newpassword = (req, res) => {
  res.render("newpassword");
};

const updatepassword = async (req, res) => {
  let id = req.cookies.userId;
  let { password } = req.body;
  console.log(id, password);
  bcrypt.hash(password, 5, async (err, hash) => {
    let data = await user.findByIdAndUpdate(id, { password: hash });

    console.log("data", data);
    data = await user.findById(id);
    console.log(data);
    res.send("data");
  });
};

module.exports = {
  displayreg,
  register,
  displaylogin,
  login,
  usera,
  profile,
  resetpass,
  verify,
  forgetpass,
  newpassword,
  updatepassword,
};
