import { Container, Card } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import "../App.css";
import TitleSec from "../elements/titleSec";
import TitleStep from "../elements/titleStep";
import Navbar from "../elements/navbar";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";
import NavbarHome from "../elements/navbarHome";
import { useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { db } from "../utils/firebase";
import { doc, setDoc, arrayUnion } from "firebase/firestore";
import shortUUID from "short-uuid";

const ExchangeGoodsSec = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  if (!user) {
    navigate("/signIn");
  }
  const { mergedDetails } = useLocation().state;
  const QRcodeDate = new Date().toLocaleString("zh-TW", {
    timeZone: "Asia/Taipei",
  });
  // console.log(QRcodeDate);
  // console.log(`QRcodeId: ${QRcodeId}`)
  const donPageStyle = {
    marginTop: "70px",
  };
  const card = {
    marginBottom: "30px",
    marginLeft: "15%",
    marginRight: "15%",
    padding: "30px 40px 20px 40px",
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
  const nextStepStyle = {
    marginLeft: "10px",
    color: "#ffffff",
    backgroundColor: "#002B5B",
    borderRadius: "30px",
    border: "none",
    fontSize: "16px",
    width: "200px",
    textAlign: "center",
    height: "35px",
    fontWeight: "bold",
  };

  const [QRcodeId, setQRcodeId] = useState(shortUUID.generate());

  const handleUploadDB = async () => {
    // upload demand DB
    try {
      const filteredDetails = mergedDetails.map((item) => ({
        docId: item.docId,
        goodsName: item.name,
        goodsPicture: item.pic,
        goodsNum: item.exchangeQuantity,
      }));
      let tags = mergedDetails.reduce(
        (result, item) => {
          if (!result.charity) {
            result.charity = item.charity;
          } else if (result.charity !== item.charity) {
            console.error("Error: mergedDetails charity is not consistent");
          }
          if (!result.store) {
            result.store = item.store;
          } else if (result.store !== item.store) {
            console.error("Error: mergedDetails store is not consistent");
          }
          return result;
        },
        { charity: "", store: "" }
      );

      // console.log(tags)
      await setDoc(doc(db, "QRcode", QRcodeId), {
        QRcodeId: QRcodeId,
        QRcodeDate: QRcodeDate,
        uid: user.uid,
        status: "未領取",
        charityName: tags.charity,
        storeName: tags.store,
        exchangeGoodsData: arrayUnion(...filteredDetails),
      });
      // alert("生成兌換條碼成功。");
      navigate("/exchangeGoodsThird", { state: { QRcodeId: QRcodeId } });
    } catch (err) {
      console.log(err);
      window.location.reload();
      alert("生成不成功，請再試一次，謝謝。");
    }
  };

  return (
    <div>
      <Navbar />
      <div style={donPageStyle}>
        <TitleSec name="兌換物資列表" color="#90AACB" />
        <Container>
          <TitleStep name="STEP2&nbsp;-&nbsp;確認兌換資料" />
          {mergedDetails.map((item, index) => (
            <div key={index}>
              <Card style={card}>
                <Card.Img style={goodsImgStyle} variant="top" src={item.pic} />
                <Card.Body style={contentStyle}>
                  <Card.Title>
                    物資名稱：<b>{item.name}</b>
                  </Card.Title>
                  <hr></hr>
                  <Card.Text style={{ color: "#6C6C6C" }}>
                    需求機構：{item.charity}
                    <br />
                    需求說明：{item.description}
                    <br />
                    物資提供商家：
                    <a style={demandHrefStyle} href="#">
                      {item.store}
                    </a>
                    <br />
                    需求數量：{item.quantity}
                    <br />
                    可兌換數量：{item.availability}
                    <br />
                    已兌換數量：{item.received}
                  </Card.Text>
                  <hr></hr>
                  <Card.Text style={{ color: "#e74a3b", fontWeight: "bold" }}>
                    欲兌換數量：{item.exchangeQuantity}
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          ))}
          <div style={stepBtnStyle}>
            <Link to="/exchangeGoods">
              <button style={returnStepStyle}>返回</button>
            </Link>
            {/* <Link to="/exchangeGoodsThird"> */}
            <button style={nextStepStyle} onClick={handleUploadDB}>
              下一步
            </button>
            {/* </Link> */}
          </div>
        </Container>
      </div>
    </div>
  );
};

export default ExchangeGoodsSec;
