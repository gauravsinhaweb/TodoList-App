import React, { useState } from "react";
import db from "../firebase";
import "./TodoList.css";

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
    <div className="list">
      <li>
        {state ? (
          <form>
            <input
              placeholder={props.todo.todo}
              value={edit}
              onChange={(event) => setEdit(event.target.value)}
            />
            <button disabled={!edit} onClick={(e) => setSave(editHandler)}>
              save
            </button>
          </form>
        ) : (
          props.todo.todo
        )}
      </li>
      <div>
        <button
          onClick={(event) =>
            db.collection("todos").doc(props.todo.id).delete()
          }
        >
          delete
        </button>

        <button onClick={setState}>edit</button>
      </div>
      <hr />
    </div>
  );
}
export default Todo;
