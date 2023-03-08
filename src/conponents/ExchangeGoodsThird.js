import { Container, Card, Spinner } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import "../App.css";
import TitleSec from "../elements/titleSec";
import TitleStep from "../elements/titleStep";
import Navbar from "../elements/navbar";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";
import NavbarHome from "../elements/navbarHome";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { collection, query, onSnapshot, where } from "firebase/firestore";
import { db } from "../utils/firebase";
import { useNavigate } from "react-router-dom";

import QRCode from "qrcode.react";

const ExchangeGoodsThird = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  if (!user) {
    navigate("/signIn");
  }
  const { state } = useLocation();
  const QRcodeId = state ? state.QRcodeId : null;
  const donPageStyle = {
    marginTop: "70px",
  };
  const stepBtnStyle = {
    marginBottom: "40px",
    marginTop: "20px",
    textAlign: "center",
  };
  const returnStepStyle = {
    color: "#ffffff",
    backgroundColor: "#002B5B",
    borderRadius: "30px",
    border: "none",
    fontSize: "16px",
    width: "120px",
    textAlign: "center",
    height: "35px",
    fontWeight: "bold",
    // marginLeft: "39%",
    // marginTop: "40px"
  };

  const [tmp, setTmp] = useState([]);

  // get demand DB data
  useEffect(() => {
    const q = query(
      collection(db, "QRcode"),
      where("QRcodeId", "==", QRcodeId)
    );
    onSnapshot(q, (querySnapshot) => {
      setTmp(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    });
  }, []);

  console.log(tmp);

  return (
    <div>
      <Navbar />
      <div style={donPageStyle}>
        <TitleSec name="兌換物資列表" color="#90AACB" />
        <Container>
          <TitleStep name="STEP3&nbsp;-&nbsp;生成兌換條碼" />
          <div style={{ textAlign: "center" }}>
            {/* <p>{QRcodeId ? QRcodeId : (
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                            )}
                        </p> */}
            <hr />
          </div>
          <div style={stepBtnStyle}>
            {tmp.map((item, index) => (
              <div key={index}>
                <p>兌換條碼ID：{item.QRcodeId}</p>
                <p>{<QRCode value={item.QRcodeId} />}</p>
                {/* <p>兌換條碼生成時間: {item.QRcodeDate}</p>
                                <p>機構名稱: {item.charityName}</p>
                                <p>合作商家: {item.storeName}</p>
                                {item.exchangeGoodsData.map((item2, index2) => (
                                    <div key={index2}>
                                        <p>商品名稱: {item2.goodsName}</p>
                                        <p>兌換數量: {item2.goodsNum}</p>
                                        <p>商品圖片: {item2.goodsPicture}</p>
                                    </div> 
                                ))} */}
                <hr />
              </div>
            ))}

            <Link to="/exchangeGoods">
              <button style={returnStepStyle}>繼續兌換</button>
            </Link>
            <Link to="/AllQRcode">
              <button style={{ ...returnStepStyle, marginLeft: "15px" }}>
                我的兌換條碼
              </button>
            </Link>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default ExchangeGoodsThird;
