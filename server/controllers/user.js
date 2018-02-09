// controller/user.js

import mongoose from "mongoose";

const User = mongoose.model("User");

// 保存用户
export const saveUser = async (req, res, next) => {
  const opts = req.body;

  const user = new User(opts);
  const saveUser = await user.save();

  if (saveUser) {
    res.send({ success: true, data: saveUser });
  } else {
    res.send({ success: false });
  }
};

// 获取所有用户
export const fetchUser = async (req, res, next) => {
  const users = await User.find({});
  if (users.length) {
    res.send({ success: true, data: users });
  } else {
    res.send({
      success: false
    });
  }
};

// 获取用户信息详情
export const fetchUserDetail = async (req, res, next) => {
  const users = await User.find({});
  if (users.length) {
    res.send({ success: true, data: users });
  } else {
    res.send({ success: false });
  }
};
