
const { User } = require("../models/Auth");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { sentizeuser } = require("../Commen");
const { serializeUser } = require("passport");
require("dotenv").config();
const SECRET_KEY = process.env.SECRET_KEY;
//API for Create New User
exports.CreateUser = async (req, res) => {
  console.log("Create User API Called");
  try {
    const salt = crypto.randomBytes(16);
    crypto.pbkdf2(
      req.body.password,
      salt,
      31000,
      512,
      "sha256",
      async function (err, hashpassword) {
        const newuser = new User({
          username: req.body.username,
          Phone_Number: req.body.Phone_Number,
          salt: salt,
          hash: hashpassword,
        });
        const doc = await newuser.save();
        const token = jwt.sign(sentizeuser(doc), SECRET_KEY);
        res
          .cookie("jwt", token, {
            expires: new Date(Date.now() + 36000000),
            httpOnly: true,
          })
          .status(200)
          .json(sentizeuser(doc));
      }
    );
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
//API to LOGIN user
exports.LoginUser = async (req, res) => {
  console.log("Login User API Called");

  res
    .cookie('jwt', req.user.token, {
      expires: new Date(Date.now() + 36000000),
      httpOnly: true,
    })
    
    .status(200)
    .json({ username:req.user.username,id:req.user.id});
};

//API to check User or Not
exports.CheckUser = async (req, res) => {
  console.log("check user called");
  if (req.user) {
    res.status(200).json(req.user);
  } else {
    res.status(401);
  }
};

// API to Update Password of User
exports.UpdatePassword = async (req, res) => {
  // try {
  //   const salt = crypto.randomBytes(16).toString("hex");
  //   const hash = crypto
  //     .pbkdf2Sync(req.body.password, salt, 10000, 512, "sha512")
  //     .toString("hex");
  //   const user = await User.findOneAndUpdate(
  //     { Phone_Number: req.body.Phone_Number },
  //     { hash: hash, salt: salt },
  //     { new: true }
  //   );

  //   if (!user) res.status(401).json({ message: "User Not Found" });
  //   res
  //     .status(200)
  //     .json({
  //       Name: user.Name,
  //       Phone_Number: user.Phone_Number,
  //       message: "Password is Updated",
  //     });
  // } catch (err) {
  //   json.status(400).json({ error: err.message });
  // }
  res.cookie("Cookie","Working",{
    expires:new Date(Date.now() + 360000),
    httpOnly:true,
  }).json({message:"Working"})
};
