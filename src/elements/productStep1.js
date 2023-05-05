import React, { useState } from "react";
import img from "../img/tablet.jpg";
import Card from "react-bootstrap/Card";

function Product({ id, name, pic, store, price, quantity, charity, description, donateCart, setDonateCart}) {
  const card = {
    marginBottom: "15px",
    marginLeft: "15px",
    marginRight: "15px",
    marginTop: "15px",
    padding: "45px 40px 10px 40px",
    color: "#002B5B",
    height: "auto"
  };
  const contentStyle = {
    marginTop: "15px",
    marginBottom: "5px",
    textAlign: "center",
  };
  const demandHrefStyle = {
    color: "#90AACB",
  };
  const goodsImgStyle = {
    width: "200px",
    height: "200px",
    marginLeft: "15%",
    marginRight: "75%",
  };

  const [buttonStyle, setButtonStyle] = useState({
    border: "none",
    borderRadius: "10px",
    width: "400px",
    margin: "15px",
  });
  const [state, setState] = useState(false);

  // 測試點選返回按鈕後留著上一次的點選紀錄（先別刪）
  // useEffect(() => {
  //   if (list.includes(id)) {
  //     setButtonStyle({...buttonStyle, backgroundColor: "lightgreen"});
  //     setState(true);
  //   }
  // }, []);

  function handleSelect() {
    if (!state) {
      setButtonStyle({
        ...buttonStyle,
        backgroundColor: "lightgreen",
        borderRadius: "10px",
        width: "400px",
        margin: "15px",
      });
      donateCart.push({ id, name, pic, store, price, charity, description, quantity, count: 1, subtotal: price});
      localStorage.setItem("donateCart", JSON.stringify(donateCart));
      let newDonateCart = [...donateCart];
      localStorage.setItem("donateList", JSON.stringify(newDonateCart));
      setState(true);
    } else {
      setButtonStyle({
        border: "none",
        borderRadius: "10px",
        width: "400px",
        margin: "15px",
      });
      setState(false);
      let newCart = donateCart.filter((e) => {
        return e.id !== id;
      });
      setDonateCart(newCart);
      localStorage.setItem("donateCart", JSON.stringify(newCart));
      let newDonateCart = [...donateCart];
      localStorage.setItem("donateList", JSON.stringify(newDonateCart));
    }
  }

  return (
    <div style={{ display: "inline-block" }}>
      <button style={buttonStyle} onClick={handleSelect}>
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
              需求說明：{description}
              <br />
              物資提供商家：
              <a style={demandHrefStyle} href="#">{store}</a>
              <br />
              單價：${price}／台
            </Card.Text>
          </Card.Body>
        </Card>
      </button>
    </div>
  );


  // return (
  //   <div>
  //     <Card style={card}>
  //       <Card.Img style={goodsImgStyle} variant="top" src={img} />
  //       <Card.Body style={contentStyle}>
  //         <Card.Title>
  //           物資名稱：<b>{name}</b>
  //         </Card.Title>
  //         <hr></hr>
  //         <Card.Text style={cardText}>
  //           需求機構：{charity}
  //           <br />
  //           需求數量：{quantity}
  //           <br />
  //           需求說明：{description}
  //           <br />
  //           物資提供商家：
  //           <a style={demandHrefStyle} href="#">
  //             {store}
  //           </a>
  //           <br />
  //           單價：${price}／台
  //         </Card.Text>
  //       </Card.Body>
  //     </Card>
  //   </div>
  // );
}

export default Product;
