import mongoose from 'mongoose';

const Todo = mongoose.model('Todo');

// 保存todo
export const saveTodo = async (req, res) => {
  const opts = req.body;

  const todo = new Todo(opts);
  const saveRes = await todo.save();
  if (saveRes) {
    res.send({
      success: true,
      data: saveRes,
    });
  } else {
    res.send({
      success: false,
    });
  }
};

// 更新todo
export const updateTodo = async (req, res) => {
  const { id, ...otherOpts } = req.body;
  if (!id) {
    res.send({
      success: false,
      msg: '缺少id',
    });
  }
  // delete otherOpts.user;
  try {
    const updateRes = await Todo.findByIdAndUpdate(id, {
      $set: otherOpts,
    });
    res.send({
      success: true,
      data: updateRes,
    });
  } catch (error) {
    res.send({
      success: false,
    });
  }
};

// 删除todo
export const delTodo = async (req, res) => {
  const { id } = req.body;
  if (!id) {
    res.send({
      success: false,
    });
  }
  try {
    const delRes = await Todo.findByIdAndRemove(id);
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

// 获取todo
export const fetchTodo = async (req, res) => {
  const todos = await Todo.find({})
    .populate({
      path: 'user',
      select: 'id first_name gender country',
    })
    .exec();

  if (todos.length) {
    res.send({
      success: true,
      data: todos,
    });
  } else {
    res.send({
      success: false,
    });
  }
};
