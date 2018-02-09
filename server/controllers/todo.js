import mongoose from "mongoose";

const Todo = mongoose.model("Todo");

export const saveTodo = async (req, res, next) => {
  const opts = req.body;

  const todo = new Todo(opts);
  const saveTodo = await todo.save();
  if (saveTodo) {
    res.send({
      success: true,
      data: saveTodo
    });
  } else {
    res.send({
      success: false
    });
  }
};

export const fetchTodo = async (req, res, next) => {
  const todos = await Todo.find({})
    .populate({
      path: "user",
      select: "id first_name gender country"
    })
    .exec();

  if (todos.length) {
    res.send({
      success: true,
      data: todos
    });
  } else {
    res.send({
      success: false
    });
  }
};
