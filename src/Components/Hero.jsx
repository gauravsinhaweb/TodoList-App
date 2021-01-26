import "./Hero.css";
import Todo from "./Todo";
import React, { useState, useEffect } from "react";
import db from "../firebase";
import firebase from "firebase";
import { TextField, Button } from "@material-ui/core";

// const styles = makeStyles((theme) => ({
//   container: {
//     width: 530,
//     [theme.breakpoints.down("xs")]: {
//       width: 100,
//     },
//   },
// }));

export default function App() {
  const [todos, setTodos] = useState([""]);
  const [input, setInput] = useState("");
  useEffect(() => {
    db.collection("todos")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setTodos(
          snapshot.docs.map((doc) => ({ id: doc.id, todo: doc.data().todo }))
        );
      });
  }, []);

  const addTodo = (event) => {
    event.preventDefault(); //stop refreshing page ..store todos IMPORTANT!
    db.collection("todos").add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    // setTodos([...todos, input])
    setInput("");
  };

  return (
    <>
      <h1 className="heading">Todo-List</h1>
      <form className="form" autocomplete="off">
        <TextField
          InputLabelProps={{
            style: { color: "#fff" },
          }}
          className="input"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          id="standard-basic"
          label="New Task.."
        />

        <Button
          variant="contained"
          size="large"
          color="secondary"
          disabled={!input}
          type="submit"
          onClick={addTodo}
        >
          ADD
        </Button>

        {/* <AddCircleIcon
          disabled={!input}
          type="submit"
          onClick={addTodo}
          variant="contained"
          color="secondary"
        >
          Add todos
        </AddCircleIcon> */}
      </form>
      <ul>
        {todos.map((todo, i) => (
          <Todo todo={todo} />
        ))}
      </ul>
    </>
  );
}
