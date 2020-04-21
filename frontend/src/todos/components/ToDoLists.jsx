import React, { Fragment, useState, useEffect } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ReceiptIcon from "@material-ui/icons/Receipt";
import Typography from "@material-ui/core/Typography";
import Checkbox from "@material-ui/core/Checkbox";
import { ToDoListForm } from "./ToDoListForm";

import axios from "axios";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const getPersonalTodos = async () => {
  try {
    const res = await axios.get("http://localhost:3001/api/todos");

    return sleep(1000).then(() => Promise.resolve(res.data));
  } catch (error) {
    console.log(error);
  }
};

export const ToDoLists = ({ style }) => {
  const [toDoLists, setToDoLists] = useState([]);
  const [activeList, setActiveList] = useState();

  useEffect(() => {
    getPersonalTodos().then(setToDoLists);
  }, []);

  if (!Object.keys(toDoLists).length) return null;
  return (
    <Fragment>
      <Card style={style}>
        <CardContent>
          <Typography component="h2">My ToDo Lists</Typography>
          <List>
            {Object.keys(toDoLists).map((key) => (
              <ListItem
                key={key}
                button
                onBlur={() => {
                  getPersonalTodos().then(setToDoLists);
                }}
                onClick={() => setActiveList(key)}
              >
                <ListItemIcon>
                  <ReceiptIcon />
                </ListItemIcon>
                <ListItemText primary={toDoLists[key].title} />
                <Checkbox
                  disabled
                  checked={toDoLists[key].done}
                  inputProps={{ "aria-label": "disabled checked checkbox" }}
                />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
      {toDoLists[activeList] && (
        <ToDoListForm
          key={activeList} // use key to make React recreate component to reset internal state
          toDoList={toDoLists[activeList]}
          saveToDoList={(id, { todos }) => {
            let tempArr = [...toDoLists];
            tempArr[activeList].todos = todos;
            setToDoLists(tempArr);
          }}
        />
      )}
    </Fragment>
  );
};
