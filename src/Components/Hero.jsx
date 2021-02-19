import "./Hero.css";
import Todo from "./Todo";
import React, { useState, useEffect } from "react";
import db from "../firebase";
import firebase from "firebase";
import { TextField, Button } from "@material-ui/core";

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
    setInput("");
  };

  return (
    <>
      <div className="body">
        <h1 className="heading">Todo-List</h1>
        <form className="form" autocomplete="off">
          <TextField
            className="input"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            id="standard-basic"
            label="Things to do.."
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
        </form>
        <ul>
          {todos.map((todo, i) => (
            <Todo todo={todo} />
          ))}
        </ul>
      </div>
    </>
  );
}
