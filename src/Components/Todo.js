import React, { useState } from "react";
import db from "../firebase";
import { ListItemText, ButtonGroup, Button } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import "./Todo.css";
function Todo(props) {
  const [state, setState] = useState(false);
  const [edit, setEdit] = useState("");
  const [save, setSave] = useState("false");
  const classes = useState("");

  const editHandler = () => {
    db.collection("todos").doc(props.todo.id).set(
      {
        todo: edit,
      },
      { merge: true }
    );
    setState(save);
  };
  return (
    <div>
      <div>
        <ListItemText className="list">
          {state ? (
            <form className={classes.root}>
              <input
                placeholder={props.todo.todo}
                value={edit}
                onChange={(event) => setEdit(event.target.value)}
                label="Filled"
                variant="filled"
              />{" "}
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
          <EditIcon onClick={setState} />
        </ButtonGroup>
        <hr className="hr" />
      </div>
      <div className="footer">
        This Application is connected to google firebase. So the Database will
        gonna expire anytime sooner. Its's build for test purpose.
      </div>
    </div>
  );
}
export default Todo;
