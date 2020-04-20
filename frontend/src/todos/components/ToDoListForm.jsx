import React, { useState } from "react";
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
  console.log(todos);

  const handleSubmit = (event) => {
    event.preventDefault();
    saveToDoList(toDoList.id, { todos });
  };

  const updateTodoText = async (todo) => {
    try {
      const res = await axios.put(
        `http://localhost:3001/api/todos/todolist/${toDoList.id}`,
        {
          todoId: todo._id,
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
          done: !todo.done,
        }
      );

      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const removeTodo = async (todo) => {
    try {
      const res = await axios.delete(
        `http://localhost:3001/api/todos/todolist/${toDoList.id}`,
        {
          id: todo.id,
        }
      );
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
          done: false,
        }
      );
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
    } catch (error) {
      console.log(error);
    }
  };

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
                onChange={() => updateTodoStatus(todo)}
                inputProps={{ "aria-label": "primary checkbox" }}
              />
              <TextField
                label="What to do?"
                value={todo.todo}
                onChange={(event) => {
                  console.log(event.target.value);

                  setTodos([
                    // immutable update
                    ...todos.slice(0, index),
                    event.target.value,
                    ...todos.slice(index + 1),
                  ]);
                }}
                className={classes.textField}
              />
              <Button
                size="small"
                color="secondary"
                className={classes.standardSpace}
                onClick={() => {
                  setTodos([
                    // immutable delete
                    ...todos.slice(0, index),
                    ...todos.slice(index + 1),
                  ]);
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
              onClick={() => {
                setTodos([...todos, ""]);
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
