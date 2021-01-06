import Todo from "./Todo";
import React, { useState, useEffect } from "react";
import db from "../firebase";
import firebase from "firebase";
import "./TodoList.css";

export default function App() {
  const [todos, setTodos] = useState([""]);
  const [input, setInput] = useState("");
  const classes = useState("");
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
    <div className="todolist">
      <div>
        <h1>Todo-List</h1>
      </div>
      <div>
        <form>
          <input
            InputLabelProps={{
              style: { color: "gray" },
            }}
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />

          <button
            className="add"
            className={classes.margin}
            disabled={!input}
            type="submit"
            onClick={addTodo}
          >
            Add
          </button>
        </form>
      </div>
      <div>
        <ul>
          {todos.map((todo, i) => (
            <Todo key={i} todo={todo} />
          ))}
        </ul>
      </div>
    </div>
  );
}
