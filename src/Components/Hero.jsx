import "./Hero.css";
import Todo from "./Todo";
import React, { useState, useEffect } from "react";
import db from "../firebase";
import firebase from "firebase";
import { TextField, Button } from "@material-ui/core";
import animationData from "../Assets/rocket.json";
import Lottie from "react-lottie";

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

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

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
      {" "}
      <div className="rocket">
        <Lottie options={defaultOptions} height={75} width={75} />
      </div>
      <div className="body">
        <h1 className="heading">Todo-List </h1>

        <form className="form" autocomplete="off">
          <TextField
            className="input"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            id="standard-basic"
            label="Things to do.."
          />
          <span className={input.length > 0 ? "display" : "displayNone"}>
            {" "}
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
          </span>
        </form>
        <ul>
          {todos.map((todo, i) => (
            <Todo todo={todo} key={i} />
          ))}
        </ul>
      </div>
    </>
  );
}
