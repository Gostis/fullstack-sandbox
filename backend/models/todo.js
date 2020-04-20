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

module.exports = todo = mongoose.model("todo", todoSchema);
