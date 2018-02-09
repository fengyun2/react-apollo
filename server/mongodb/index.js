// 连接数据库
import mongoose from "mongoose";
import config from "../config";

// 同步加载schema
require("./schema/user");
require("./schema/todo");

const database = () => {
  mongoose.set("debug", true);

  mongoose.connect(config.dbPath);

  // 数据库短线重连
  mongoose.connection.on("disconnected", () => {
    mongoose.connect(config.dbPath);
  });

  mongoose.connection.on("error", err => {
    console.error(err);
  });

  mongoose.connection.on("open", () => {
    console.log("Connected to MongoDB ", config.dbPath);
  });
};

database();
