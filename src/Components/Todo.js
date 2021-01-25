import React, { useState } from "react";
import db from "../firebase";
import { ListItemText, ButtonGroup, Button } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import "./Hero.css";

function Todo(props) {
  const [state, setState] = useState(false);
  const [edit, setEdit] = useState("");
  const [save, setSave] = useState("false");

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
    <>
      <div>
        <ListItemText>
          {state ? (
            <form>
              <input
                placeholder={props.todo.todo}
                value={edit}
                onChange={(event) => setEdit(event.target.value)}
                label="Filled"
                variant="filled"
              />
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
    </>
  );
}
export default Todo;
