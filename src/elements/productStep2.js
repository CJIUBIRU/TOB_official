import React, { useState, useEffect } from "react";
import img from "../img/tablet.jpg";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Form } from "react-bootstrap";

function Product({
  id,
  name,
  pic,
  store,
  price,
  quantity,
  charity,
  description,
  donateList,
  setDonateList,
  setState,
}) {
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
  const contentStyle = {
    textAlign: "left",
    marginLeft: "30px",
    letterSpacing: "2px",
  };
  const demandHrefStyle = {
    color: "#90AACB",
  };
  const goodsImgStyle = {
    width: "200px",
    height: "200px",
  };
  const inputStyle = {
    border: "1.5px solid #90AACB",
    width: "10%",
    height: "30px",
    textAlign: "center",
  };
  const btnDashStyle = {
    backgroundColor: "#f58d59",
    width: "30px",
    height: "30px",
    paddingTop: "0px",
    textAlign: "left",
    border: "none",
    borderRadius: "100px",
    marginLeft: "3px",
    marginRight: "3px",
  };

  const btnAddStyle = {
    backgroundColor: "#f58d59",
    width: "30px",
    height: "30px",
    paddingTop: "0px",
    textAlign: "left",
    border: "none",
    borderRadius: "100px",
    marginLeft: "3px",
    marginRight: "3px",
    paddingLeft: "9px",
  };

  // console.log(donateList)

  const [count, setCount] = useState(1);
  const [subtotal, setSubtotal] = useState(price);
  console.log(subtotal);
  // if( subtotal.length === 0) {
  //   setSubtotal([...subtotal, price]);
  // }
  // console.log(subtotal);

  // if (state) {
  //   setTotal(subtotal)
  //   setState(false);
  // }

  // setTotal(total+subtotal);

  function handleChange(e) {
    e.preventDefault();
    let value = Number(e.target.value);
    let subtotal_value;
    if (value <= 0 || value === "-") {
      setCount(1);
      value = 1;
    } else if (value > quantity) {
      setCount(quantity);
      setSubtotal(price * quantity);
      // if (count <= 1) {
      //   setTotal(total + (price*(quantity-1)))
      // }
      value = quantity;
      subtotal_value = price * quantity;
    } else {
      setCount(value);
      setSubtotal(price * value);
      subtotal_value = price * value;
    }
    handleData(value, subtotal_value);
    setState(true);
  }

  function handlePlus() {
    let value;
    let subtotal_value;
    if (count < quantity) {
      value = count + 1;
      setCount(value);
      setSubtotal(value * price);
      subtotal_value = value * price;
      // setTotal(total + Number(price))
    }
    handleData(value, subtotal_value);
    setState(true);
  }

  function handleMinus() {
    if (count > 1) {
      let value = count - 1;
      setCount(value);
      setSubtotal(value * price);
      let subtotal_value = value * price;
      // setTotal(total - Number(price))
      handleData(value, subtotal_value);
    }
    setState(true);
  }

  // 更新 total
  // useEffect(() => {
  //   if (subtotal) {
  //     setTotal(subtotal)
  //   }
  // }, [subtotal]);

  // 更新 localStorage: donateList
  function handleData(value, subtotal_value) {
    if (value > 0) {
      if (donateList.some((e) => e.id === id)) {
        // 存在前一個相同id的資料
        let newDonateList = donateList.filter((e) => {
          return e.id !== id;
        });
        // console.log('newDonateList: ', newDonateList)
        newDonateList.push({
          id,
          name,
          pic,
          store,
          price,
          quantity,
          count: value,
          charity,
          description,
          subtotal: subtotal_value,
        });
        setDonateList(newDonateList);
        localStorage.setItem("donateList", JSON.stringify(newDonateList));
      } else {
        // 不存在前一個相同id的資料
        donateList.push({
          id,
          name,
          pic,
          store,
          price,
          quantity,
          count: value,
          charity,
          description,
          subtotal: subtotal_value,
        });
        localStorage.setItem("donateList", JSON.stringify(donateList));
      }
    }
  }

  return (
    <div>
      <Card style={card} onChange={handleData}>
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
            <a style={demandHrefStyle} href="#">
              {store}
            </a>
          </Card.Text>
          <hr></hr>
          <Card.Text>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                lineHeight: "30px",
              }}
            >
              認購數量：
              <Button
                style={btnDashStyle}
                variant="primary"
                onClick={handleMinus}
              >
                -
              </Button>
              <Form.Control
                type="text"
                style={inputStyle}
                value={count}
                onChange={handleChange}
              />
              <Button
                style={btnAddStyle}
                variant="primary"
                onClick={handlePlus}
              >
                +
              </Button>
            </div>
            <hr></hr>
            <p style={{textAlign: "right", marginBottom: "-15px", color: "black"}}>小計：${subtotal}</p>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Product;
