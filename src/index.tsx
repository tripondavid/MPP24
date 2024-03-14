import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.css";
import Airplane from "./components/Airplane";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
const dummyAirplanes: Airplane[] = [
  { id: 0, model: "Airbus", capacity: 230, type: "A320" },
  { id: 1, model: "Boeing", capacity: 368, type: "777" },
  { id: 2, model: "Gulfstream", capacity: 19, type: "G800" },
];
root.render(
  <React.StrictMode>
    <App dummyAirplanes={dummyAirplanes} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
