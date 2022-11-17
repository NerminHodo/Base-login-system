import User from "../models/user.model";
import Jwt from "jsonwebtoken";
import { expressjwt } from "express-jwt";
import config from "../config/config";

const signIn = (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err || !user) {
      return res.status(401).json({ error: "User not found!" });
    }

    if (!user.authenticate(req.body.password)) {
      return res
        .status(400)
        .json({ error: "Email and password do not match!" });
    }

    const token = Jwt.sign(
      { _id: user._id, name: user.name, email: user.email },
      config.secret
    );
    res.cookie("token", token, { expire: new Date() + 999 });
    res.status(200).json({
      token,
      user: { _id: user._id, name: user.name, email: user.email },
    });
  });
};

const signOut = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "User signed out." });
};

const requireSignIn = expressjwt({
  secret: config.secret,
  algorithms: ["HS256"],
  userProperty: "auth",
});

const hasAuthorization = (req, res, next) => {
  const authorized = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!authorized) return res.status(403).json("User is not authorized!");
  next();
};

export default { signIn, signOut, requireSignIn, hasAuthorization };
