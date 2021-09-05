// ** React Imports
import React from "react";
import { useHistory } from "react-router-dom";

// All Routes
import Router from "./Router";
import './App.css';
import "react-toastify/dist/ReactToastify.css";

function App() {

  const history = useHistory();

  if (localStorage.getItem("token") === null) {
    history.push("/login");
  }

  return <Router />;
}

export default App;
