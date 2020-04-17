const express = require("express");
const router = express.Router();

const todoList = require("../models/todoList");
const todo = require("../models/todo");

// @route POST api/todos/todolist/:id
// @desc POST a new todo to todolist with (id)
// @access Public
router.post("/todolist/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { todoText } = req.body;
    const todoLists = await todoList.findOne({ id: id });
    // If there is a todolist with that id
    if (todoLists) {
      const newTodo = new todo({
        todo: todoText,
        done: false,
      });

      todoLists.todos.push(newTodo);
      await todoLists.save().then((newTodo) => res.send(newTodo));
    } else {
      return res.status(204).json({ msg: "No todolist with that ID" });
    }
  } catch (error) {
    return res.status(400).json({
      msg: error,
    });
  }
});

// @route PUT api/todos/todolist/:id
// @desc PUT update a todo in todolist with (id)
// @access Public
router.put("/todolist/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { todoText, done, todoId } = req.body;
    const todoLists = await todoList.findOne({ id: id });
    // console.log(todoLists.todos);

    todoLists.todos.map((ele) => {
      if (String(ele._id) === todoId) {
        return (ele.done = true);
      }
    });

    // If there is a todolist with that id
    if (todoLists) {
      todoLists.todos.map((ele) => {
        if (String(ele._id) === todoId) {
          return (ele.done = true);
        }
      });
      await todoLists.save().then(() => res.send({ msg: "Updated todo!" }));
    } else {
      return res.status(204).json({ msg: "No todolist with that ID" });
    }
  } catch (error) {
    return res.status(400).json({
      msg: error,
    });
  }
});

// @route DELETE api/todos/todolist/:todoListId/:todoId
// @desc DELETE a todo with a certain ID
// @access Public
router.delete("/todolist/:todoListId", async (req, res) => {
  try {
    const { todoListId } = req.params;
    const { id } = req.body;
    const todoLists = await todoList.findOne({ id: todoListId });

    // If there is a todolist with that id
    if (todoLists) {
      todoLists.todos.pull({ _id: id });
      await todoLists.save();
      return res.status(200).json({ msg: "todo deleted" });
    } else {
      return res.status(204).json({ msg: "No todolist with that ID" });
    }
  } catch (error) {
    return res.status(400).json({
      msg: error,
    });
  }
});

// @route POST api/todos/todolistID
// @desc POST a new todolist
// @access Public
router.post("/newTodoList/", async (req, res) => {
  try {
    const { id, title } = req.body;
    const todoLists = await todoList.findOne({ id: id });
    console.log(todoLists);

    // Returned an existing todoList
    if (todoLists) {
      return res.status(200).json({ msg: "List already exists" });
    } else {
      const newTodoList = new todoList({
        id: id,
        title: title,
        todos: [],
      });

      await newTodoList.save().then((TodoList) => res.json(TodoList));
    }

    return res.status(200).json(id);
  } catch (error) {
    return res.status(400).json({
      msg: error,
    });
  }
});

// @route GET api/todos/
// @desc GET all todolists
// @access Public
router.get("/", async (req, res) => {
  try {
    // Find all todolists
    const result = await todoList.find();
    res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({
      msg: error,
    });
  }
});

module.exports = router;
