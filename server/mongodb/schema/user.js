// mongodb/user.js
import mongoose from "mongoose";

const Schema = mongoose.Schema;

// 实例化UserSchema
const UserSchema = new Schema({
  first_name: String,
  last_name: String,
  email: String,
  gender: String,
  department: String,
  country: String,
  meta: {
    createdAt: {
      type: Date,
      default: Date.now()
    },
    updatedAt: {
      type: Date,
      default: Date.now()
    }
  }
});

// 在保存数据之前更新日期
UserSchema.pre("save", function() {
  if (this.isNew) {
    this.meta.createdAt = this.meta.updatedAt = Date.now();
  } else {
    this.meta.updatedAt = Date.now();
  }
});

// 建立User数据类型
mongoose.model("User", UserSchema);
