import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete'
import AddIcon from '@material-ui/icons/Add'
import Typography from '@material-ui/core/Typography'
import { RegularTextField } from '../../shared/FormFields'

const useStyles = makeStyles((theme) => ({
  card: {
    margin: '1rem'
  },
  todoLine: {
    display: 'flex',
    alignItems: 'center'
  },
  textField: {
    flexGrow: 1
  },
  standardSpace: {
    margin: theme.spacing.unit
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1
  }
}))

export const ToDoListForm = ({ toDoList, saveToDoList }) => {
  if (!toDoList) return null

  const classes = useStyles()
  const [todos, setTodos] = useState(toDoList.todos)

  useEffect(() => {
    return () => setTodos(toDoList.todos)
  }, [toDoList.id])

  const handleSubmit = (event) => {
    event.preventDefault()
  }

  return <Card className={classes.card}>
    <CardContent>
      <Typography
        variant='headline'
        component='h2'
      >
        {toDoList.title}
      </Typography>
      <form onSubmit={handleSubmit}
        className={classes.form}
      >
        {
          todos.map((name, index) => <div
            key={index}
            className={classes.todoLine}
          >
            <Typography
              className={classes.standardSpace}
              variant='title'
            >
              {index + 1}
            </Typography>
            <RegularTextField
              name={`${name}`}
              label='What to do?'
              className={classes.textField}
            />
            <Button
              size='small'
              color='secondary'
              className={classes.standardSpace}
              onClick={() => console.log('TODO: remove field!')}
            >
              <DeleteIcon />
            </Button>
          </div>
          )}
        <CardActions>
          <Button
            type='button'
            color='primary'
            onClick={() => {
              setTodos([...todos, ''])
            }}>
            Add Todo <AddIcon />
          </Button>
          <Button
            type='submit'
            variant='contained'
            color='primary'
          >
                Save
          </Button>
        </CardActions>
      </form>
    </CardContent>
  </Card>
}
