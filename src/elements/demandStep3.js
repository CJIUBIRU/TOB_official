import React from "react";
import Card from "react-bootstrap/Card";
// import img from "../img/tablet.jpg";

function DemandStep3({ id, name, store, count, demandInfo, user, pic }) {
  const card = {
    marginBottom: "20px",
    marginLeft: "10%",
    marginRight: "10%",
    padding: "5px",
    color: "#002B5B",
    width: "80%",
    // display: "flex",
    // flexDirection: "row",
  };
  const contentStyle = {
    textAlign: "left",
    marginLeft: "30px",
    letterSpacing: "2px",
  };
  const demandHrefStyle = {
    color: "#90AACB",
  };
  const goodsImgStyle = {
    marginTop: "40px",
    width: "150px",
    height: "150px",
  };
  return (
    <div>
      <Card style={card}>
        <div className="grid_demand">
          <div>
            <center>
              <Card.Img
                style={goodsImgStyle}
                variant="top"
                src={pic}
              />
            </center>
          </div>
          <div>
            <Card.Body style={contentStyle}>
              <Card.Title>
                物資名稱：<b>{name}</b>
              </Card.Title>
              <hr></hr>
              <Card.Text style={{ color: "#6C6C6C" }}>
                需求機構：{user}
                <br />
                需求數量：{count}
                <br />
                需求說明：{demandInfo}
                <br />
                物資提供商家：
                <a style={demandHrefStyle} href="#">
                  {store}
                </a>
              </Card.Text>
            </Card.Body>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default DemandStep3;
