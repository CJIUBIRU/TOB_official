import React, { useState } from "react";
import Card from "react-bootstrap/Card";
// import img from "../img/tablet.jpg";
import { db } from "../utils/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router";
import { Form } from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";
function MyProduct() {
  const card = {
    marginBottom: "20px",
    marginLeft: "5%",
    padding: "30px 40px 30px 40px",
    color: "#002B5B",
    width: "90%",
    display: "flex",
    flexDirection: "col",
  };
  const contentStyle = {
    textAlign: "left",
    marginLeft: "0px",
    letterSpacing: "2px",
  };
  const goodsImgStyle = {
    width: "200px",
    height: "200px",
  };
  const navigate = useNavigate();
  let good = JSON.parse(localStorage.getItem("good"));
  const [values, setValues] = useState({
    quantity: good.quantity,
    description: good.description,
  });
  const handleChange = (e) => {
    setValues((values) => ({
      ...values,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const taskDocRef = doc(db, "demand", good.id);
    console.log(taskDocRef);
    console.log(good.id);
    try {
      await updateDoc(taskDocRef, {
        quantity: values.quantity,
        description: values.description,
      });
      alert("修改成功。");
      navigate("/myDemand");
    } catch (err) {
      console.log(err);
      alert("資料更新有誤：", err);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit} style={{ marginBottom: "50px" }}>
        <Card style={card}>
          <center>
            <Card.Img
              style={goodsImgStyle}
              variant="top"
              src={good.pic}
            />
          </center>
          <Card.Body style={contentStyle}>
            <Card.Title>
              物資名稱：<b>{good.name}</b>
            </Card.Title>
            <hr></hr>
            <Card.Text style={{ color: "#6C6C6C" }}>
              <p>需求機構：<b>{good.charity} </b></p>

              <p>物資提供商家：<b>{good.store}</b></p>

              <p>目前可領取／已領取數量：<b>{good.availability}／{good.received}</b></p>

              <InputGroup className="mb-3">
                <InputGroup.Text>需求數量</InputGroup.Text>
                <Form.Control
                  placeholder="請輸入需求數量（如：100）"
                  // value={}
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  onChange={handleChange}
                  type="text"
                  value={values.quantity}
                  name="quantity" />

              </InputGroup>
              <InputGroup>
                <InputGroup.Text>需求說明</InputGroup.Text>
                <Form.Control as="textarea"
                  placeholder="請輸入需求說明（如：用途等）"
                  // value={}
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  onChange={handleChange}
                  type="text"
                  value={values.description}
                  name="description" />
              </InputGroup>
            </Card.Text>
          </Card.Body>
        </Card>
        <div>
          {/* <ButtonLink to="/passwordSuccess" name="確定" /> */}
          <center>
            <button
              type="submit"
              style={{
                color: "#ffffff",
                backgroundColor: "#002B5B",
                borderRadius: "30px",
                fontSize: "16px",
                width: "120px",
                textAlign: "center",
                height: "35px",
                fontWeight: "bold",
                // marginLeft: "46.5%",
                marginTop: "40px",
                border: "none",
              }}
            >
              送出
            </button>
          </center>
        </div>
      </form>
    </div>
  );
}

export default MyProduct;
