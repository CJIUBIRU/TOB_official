import React from "react";
import "../App.css";
import Alert from "react-bootstrap/Alert";

function successInfo(props) {
  return (
    <div>
      <Alert
        key={"warning"}
        variant={"warning"}
        style={{ textAlign: "center", padding: "3% 5% 3% 5%", margin: "20px", display: "inline-block" }}
      >
        <span
          style={{ fontWeight: "bold", lineHeight: "40px", fontSize: "22px" }}
        >
          {props.name}
          <br></br>
        </span>
        <br></br>
        {props.name2}
        <p style={{ lineHeight: "40px" }}>{props.name3}</p>
      </Alert>
    </div>
  );
}

export default successInfo;
