const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const todoSchema = new Schema({
  todo: String,
  done: { type: Boolean, default: false },
  date: {
    type: Date,
    default: Date.now(),
  },
});

const todoListSchema = new Schema({
  id: String,
  title: String,
  todos: [todoSchema],
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = todoList = mongoose.model("todoList", todoListSchema);
