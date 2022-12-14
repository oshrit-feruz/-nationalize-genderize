import "./App.css";
import axios from "axios";
import { useState } from "react";
import { setName } from "./redux/nameSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/store";

function App() {
  const nameState = useSelector((state: RootState) => state.name.name);
  const dispatch = useDispatch();
  const urlWithProxy = "/api/v1";

  function nameCheck() {
    axios
      .get(urlWithProxy + "/nameCheck")
      .then((res) => dispatch(setName(res.data)))
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <div className="App">
      <button onClick={nameCheck}>Check your name</button>
      <p>data : {nameState}</p>
    </div>
  );
}

export default App;
