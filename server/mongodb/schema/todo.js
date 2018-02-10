// mongodb/todo.js

import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const TodoSchema = new Schema({
  title: String,
  completed: Boolean,
  user: {
    type: ObjectId,
    ref: 'User',
  },
  meta: {
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    updatedAt: {
      type: Date,
      default: Date.now(),
    },
  },
});

TodoSchema.pre('save', function() {
  if (this.isNew) {
    this.meta.createdAt = this.meta.updatedAt = Date.now();
  } else {
    this.meta.updatedAt = Date.now();
  }
});

mongoose.model('Todo', TodoSchema, 'Todo');
