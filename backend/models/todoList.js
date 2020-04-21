const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Todo Schema for db needs to be written twice to be used in parent schema
const todoSchema = new Schema({
  todo: String,
  done: { type: Boolean, default: false },
  date: {
    type: Date,
    default: Date.now(),
  },
});
// Todolist Schema
const todoListSchema = new Schema({
  id: String,
  title: String,
  done: { type: Boolean, default: false },
  todos: [todoSchema],
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = todoList = mongoose.model("todoList", todoListSchema);
