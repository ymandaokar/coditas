import React from "react";
import { render } from "react-dom";
import Users from "./components/users.js";
import "./styles/style.css";
import "flexboxgrid";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

const App = () => (
  <div style={styles}>
    <Users />
  </div>
);

render(<App />, document.getElementById("root"));
