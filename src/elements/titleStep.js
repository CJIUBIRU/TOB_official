import React from "react";

function TitleStep(props) {
  const titleStepStyle = {
    fontSize: "18px",
    fontWeight: "bold",
    display: "inline-block",
    textAlign: "center",
    border: "1.5px dashed gray",
    // marginLeft: "37.5%",
    // marginRight: "37.5%",
    // width: "25%",
    // height: "45px",
    margin: "auto",
    padding: "5px 30px 5px 30px",
    lineHeight: "45px",
    color: props.color, //#002b5b
    letterSpacing: "1.5px",
  };
  return (
    <div style={{textAlign: "center"}}>
      <p style={titleStepStyle}> {props.name} </p>
    </div>
  );
}

export default TitleStep;
