import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import img from "../img/tablet.jpg";

function ProductStep3({id, pic, name, store, count, quantity, description, charity, subtotal, price}) {
  const contentStyle = {
    textAlign: "left",
    marginLeft: "30px",
    letterSpacing: "2px",
  };
  const card = {
    marginBottom: "20px",
    marginLeft: "15%",
    marginRight: "15%",
    padding: "40px 40px 40px 40px",
    color: "#002B5B",
    width: "70%",
    display: "flex",
    flexDirection: "row",
  };
  const demandHrefStyle = {
    color: "#90AACB",
  };
  const goodsImgStyle = {
    width: "200px",
    height: "200px",
  };
  const userTextStyle = {
    color: "#002b5b",
    fontWeight: "bold",
  };
  return (
    <div>
      <Card style={card}>
        <Card.Img style={goodsImgStyle} variant="top" src={pic} />
        <Card.Body style={contentStyle}>
          <Card.Title>
            物資名稱：<b>{name}</b>
          </Card.Title>
          <hr></hr>
          <Card.Text style={{ color: "#6C6C6C" }}>
            需求機構：{charity}
            <br />
            需求物資數量：{quantity}
            <br />
            單價：${price}
            <br />
            需求說明：{description}
            <br />
            物資提供商家：
            <a style={demandHrefStyle} href="#">{store}</a>
          </Card.Text>
          <hr></hr>
          <Card.Text style={{ color: "#6C6C6C" }}>
            認購數量：<span style={userTextStyle}>{count}</span>
            <hr></hr>
            <p style={{textAlign: "right", marginBottom: "-15px", color: "black"}}>
            小計：${subtotal}
            </p>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default ProductStep3;
