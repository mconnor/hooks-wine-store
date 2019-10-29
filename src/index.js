import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <App
    url="https://gist.githubusercontent.com/mconnor/9b9f93ad895c695cfdc70ba6857fe6a1/raw/d0871f04fb834cc48e38386ce670ee9c584831af/wine.json"
    title="Cool Wine Store"
  />,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
