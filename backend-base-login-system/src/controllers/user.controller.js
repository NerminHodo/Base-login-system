import User from "../models/user.model";
import _ from "lodash";
import errorHandler from "./helpers/dbErrorHandler";

const create = (req, res, next) => {
  const user = new User(req.body);

  User.find({ email: user.email }).exec((err, user2) => {
    if (user2.length !== 0) {
      if (err) console.log(err);
      return res.status(400).json({ error: "User exists" });
    } else {
      user.save((err, result) => {
        if (err) {
          return res
            .status(400)
            .json({ error: errorHandler.getErrorMessage(err) });
        }

        res.status(200).json({ message: "successfully created a new user." });
      });
    }
  });
};

const list = (req, res) => {
  User.find((err, users) => {
    if (err) {
      return res.status(400).json({ error: errorHandler.getErrorMessage() });
    }
    res.status(200).json(users);
  }).select("name email updated created");
};

const userByID = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(404).json({ error: "User not found!" });
    }

    req.profile = user;
    next();
  });
};

const read = (req, res) => {
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  res.status(200).json(req.profile);
};

const update = (req, res, next) => {
  let user = req.profile;
  console.log(user);
  user = _.extend(user, req.body);
  console.log(user);
  user.updated = Date.now();
  user.save((err) => {
    if (err) {
      return res.status(400).json({ error: errorHandler.getErrorMessage() });
    }
    user.hashed_password = undefined;
    user.salt = undefined;
    res.status(200).json(user);
  });
};

const remove = (req, res, next) => {
  let user = req.profile;
  user.remove((err, deletedUser) => {
    if (err) {
      return res.status(400).json({ error: errorHandler.getErrorMessage() });
    }
    deletedUser.hashed_password = undefined;
    deletedUser.salt = undefined;
    res.status(200).json(deletedUser);
  });
};

export default { create, list, userByID, read, update, remove };
