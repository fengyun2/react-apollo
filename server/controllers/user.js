// controller/user.js

import mongoose from 'mongoose';

const User = mongoose.model('User');

// 保存用户
export const saveUser = async (req, res) => {
  const opts = req.body;

  const user = new User(opts);
  const saveRes = await user.save();

  if (saveRes) {
    res.send({ success: true, data: saveRes });
  } else {
    res.send({ success: false });
  }
};

// 更新用户信息
export const updateUser = async (req, res) => {
  const { id, ...otherOpts } = req.body;
  if (!id) {
    res.send({
      success: false,
      msg: '用户id不能为空',
    });
  }
  try {
    const updateRes = await User.findByIdAndUpdate(id, {
      $set: otherOpts,
    });
    res.send({ success: true, data: updateRes });
  } catch (error) {
    res.send({
      success: false,
    });
  }
};

// 删除用户
export const delUser = async (req, res) => {
  const { id } = req.body;
  if (!id) {
    res.send({
      success: false,
      msg: '用户id不能为空',
    });
  }
  try {
    const delRes = await User.findByIdAndRemove(id);
    res.send({
      success: true,
      data: delRes,
    });
  } catch (error) {
    res.send({
      success: false,
    });
  }
};

// 获取所有用户
export const fetchUser = async (req, res) => {
  const users = await User.find({});
  if (users.length) {
    res.send({ success: true, data: users });
  } else {
    res.send({
      success: false,
    });
  }
};

// 获取用户信息详情
export const fetchUserDetail = async (req, res) => {
  const users = await User.find({});
  if (users.length) {
    res.send({ success: true, data: users });
  } else {
    res.send({ success: false });
  }
};
