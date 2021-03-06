const express = require("express");
const router = express.Router();

// Schemas
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

// @route GET api/todos/todolist/:id
// @desc GET a todo from todolist with (id)
// @access Public
router.get("/todolist/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { todoId } = req.body;
    const todoLists = await todoList.findOne({ id: id });
    let todoItem = {};
    // If there is a todolist with that id
    if (todoLists) {
      todoLists.todos.map((ele) => {
        if (String(ele._id) === todoId) {
          todoItem = ele;
        }
      });
      await todoLists.save().then(() => res.send(todoItem));
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

    // If there is a todolist with that id
    if (todoLists) {
      // Changing the todo with (todoId) based on req.body data
      todoLists.todos.map((ele) => {
        if (String(ele._id) === todoId) {
          if (todoText && typeof done !== "undefined") {
            ele.done = done;
            ele.todo = todoText;
            return ele;
          } else if (typeof todoText !== "undefined") {
            return (ele.todo = todoText);
          } else if (typeof done !== "undefined") {
            return (ele.done = done);
          }
        }
      });

      // Sets todolist to done if all items are true
      const isDone = todoLists.todos.every((item) => item.done === true);
      todoLists.done = isDone;

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

// @route PUT api/todos/todolist/:id
// @desc PUT update a todolist to done with (id)
// @access Public
router.put("/todolistDone/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { done } = req.body;
    const todoLists = await todoList.findOne({ id: id });

    // If there is a todolist with that id
    if (todoLists) {
      todoLists.done = done;
      await todoLists.save().then(() => res.send({ msg: "Updated todoList!" }));
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
// @desc DELETE a todo with with id
// @access Public
router.delete("/todolist/:todoListId/:id", async (req, res) => {
  try {
    const { todoListId, id } = req.params;

    const todoLists = await todoList.findOne({ id: todoListId });

    // If there is a todolist with that id
    if (todoLists) {
      todoLists.todos.pull({ _id: id });
      await todoLists.save();

      return res
        .status(200)
        .json({ msg: "todo deleted", list: todoLists.todos });
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
