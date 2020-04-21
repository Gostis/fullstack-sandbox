import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import {
  TextField,
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Checkbox,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";

import axios from "axios";

const useStyles = makeStyles({
  card: {
    margin: "1rem",
  },
  todoLine: {
    display: "flex",
    alignItems: "center",
  },
  textField: {
    flexGrow: 1,
  },
  standardSpace: {
    margin: "8px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
  },
});

export const ToDoListForm = ({ toDoList, saveToDoList }) => {
  const classes = useStyles();
  const [todos, setTodos] = useState(toDoList.todos);

  const handleSubmit = (event) => {
    event.preventDefault();
    saveToDoList(toDoList.id, { todos });
  };

  const updateTodoText = async (todo, newText) => {
    try {
      const res = await axios.put(
        `http://localhost:3001/api/todos/todolist/${toDoList.id}`,
        {
          todoId: todo._id,
          todoText: newText,
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const updateTodoStatus = async (todo) => {
    try {
      const res = await axios.put(
        `http://localhost:3001/api/todos/todolist/${toDoList.id}`,
        {
          done: todo.done,
          todoId: todo._id,
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const removeTodo = async (todo) => {
    try {
      const res = await axios.delete(
        `http://localhost:3001/api/todos/todolist/${toDoList.id}/${todo._id}`
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const addTodo = async (newTodoText) => {
    try {
      const res = await axios.post(
        `http://localhost:3001/api/todos/todolist/${toDoList.id}`,
        {
          todoText: newTodoText,
        }
      );

      return res.data.todos[res.data.todos.length - 1];
    } catch (error) {
      console.log(error);
    }
  };

  const getTodo = async (todoId) => {
    try {
      const res = await axios.get(
        `http://localhost:3001/api/todos/todolist/${toDoList.id}`,
        {
          todoId: todoId,
        }
      );
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    saveToDoList(toDoList.id, { todos });
  }, [todos]);

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography component="h2">{toDoList.title}</Typography>
        <form onSubmit={handleSubmit} className={classes.form}>
          {todos.map((todo, index) => (
            <div key={index} className={classes.todoLine}>
              <Typography className={classes.standardSpace} variant="h6">
                {index + 1}
              </Typography>
              <Checkbox
                checked={todo.done}
                onChange={async () => {
                  let tempTodo = todo;
                  tempTodo.done = !todo.done;

                  setTodos([
                    ...todos.slice(0, index),
                    tempTodo,
                    ...todos.slice(index + 1),
                  ]);
                  await updateTodoStatus(todo);
                }}
                inputProps={{ "aria-label": "primary checkbox" }}
              />
              <TextField
                label="What to do?"
                value={todo.todo}
                onBlur={async (e) => {
                  await updateTodoText(todo, e.target.value);
                }}
                onChange={(event) => {
                  let tempTodo = todo;
                  tempTodo.todo = event.target.value;
                  setTodos([
                    // immutable update
                    ...todos.slice(0, index),
                    tempTodo,
                    ...todos.slice(index + 1),
                  ]);
                }}
                className={classes.textField}
              />
              <Button
                size="small"
                color="secondary"
                className={classes.standardSpace}
                onClick={async () => {
                  setTodos([
                    // immutable delete
                    ...todos.slice(0, index),
                    ...todos.slice(index + 1),
                  ]);

                  await removeTodo(todo);
                }}
              >
                <DeleteIcon />
              </Button>
            </div>
          ))}
          <CardActions>
            <Button
              type="button"
              color="primary"
              onClick={async () => {
                const temp = await addTodo("");
                setTodos([...todos, temp]);
              }}
            >
              Add Todo <AddIcon />
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Save
            </Button>
          </CardActions>
        </form>
      </CardContent>
    </Card>
  );
};
