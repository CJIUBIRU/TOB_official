import React from "react";

function TitleSec(props) {
  const titleStyle = {
    backgroundColor: props.color,
    color: "#ffffff",
    width: "100%",
    textAlign: "center",
    height: "100px",
    lineHeight: "100px",
    fontWeight: "bold",
    marginBottom: "20px",
    letterSpacing: "1px",
  };
  return (
    <div>
      <h2 className="titleStyle" style={titleStyle}> {props.name} </h2>
    </div>
  );
}

export default TitleSec;
