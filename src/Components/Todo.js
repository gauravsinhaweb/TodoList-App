import React, { useEffect, useState } from "react";
import db from "../firebase";
import {
  ListItemText,
  ButtonGroup,
  Button,
  TextField,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import "./Hero.css";
import { makeStyles } from "@material-ui/core/styles";

function Todo(props) {
  const [state, setState] = useState(false);
  const [edit, setEdit] = useState("");
  const [save, setSave] = useState();
  const [toggle, setToggle] = useState(false);
  const [todos, setTodos] = useState();
  const checkedHandler = () => {
    setToggle(!toggle);
    db.collection("todos").doc(props.todo.id).set(
      {
        toggleButton: !toggle,
      },
      { merge: true }
    );
    
  };
  const editHandler = () => {
    db.collection("todos").doc(props.todo.id).set(
      {
        todo: edit,
      },
      { merge: true }
    );
    setEdit("");
    setState(save);
  };
  useEffect(() => {
    db.collection("todos")
      .orderBy("timestamp")
      .onSnapshot((snapshot) =>
        setTodos(snapshot.docs.map((doc) => doc.data()))
      );
  }, []);
  const useStyles = makeStyles({
    root: {
      fontSize: " 20px",
      fontFamily: "lato",
      marginTop: "1rem",
      color: "#000",
      textTransform: "capitalize",
    },
    checked: {
      fontSize: " 20px",
      fontFamily: "lato",
      marginTop: "1rem",
      color: "#BC8F8F",
      textTransform: "capitalize",
      textDecoration: "line-through",
      textDecorationColor: "#A0522D",
    },
  });

  const classes = useStyles();
  let toggleButton;
  todos &&
    todos.map((todo) => {
      return (toggleButton = todo.toggleButton);
    });
  return (
    <>
      <ListItemText className={toggleButton ? classes.checked : classes.root}>
        {" "}
        <input
          checked={toggleButton ? true : false}
          className={state ? "displayNone" : "checkbox"}
          type="checkbox"
          onClick={checkedHandler}
        />
        {state ? (
          <form>
            <TextField
              placeholder={props.todo.todo}
              value={edit}
              onChange={(event) => setEdit(event.target.value)}
              className="input_save"
            />

            <span className={edit.length > 0 ? "display" : "displayNone"}>
              <Button
                variant="contained"
                size="small"
                color="primary"
                disabled={!edit}
                type="submit"
                onClick={(e) => setSave(editHandler)}
              >
                Save
              </Button>
            </span>
          </form>
        ) : (
          props.todo.todo
        )}
      </ListItemText>
      <ButtonGroup disableElevation variant="contained" color="primary">
        <DeleteIcon
          onClick={(event) =>
            db.collection("todos").doc(props.todo.id).delete()
          }
          variant="outlined"
          color="secondary"
        />
        <EditIcon onClick={() => setState(!state)} />
      </ButtonGroup>
      <hr className="hr" />
    </>
  );
}
export default Todo;
