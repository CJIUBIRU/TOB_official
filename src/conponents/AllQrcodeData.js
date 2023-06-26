/* eslint-disable react/jsx-pascal-case */
import React, { useState, useEffect } from "react";
import "../App.css";
import Card from "react-bootstrap/Card";

import Navbar from "../elements/navbarCharity";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TitleSec from "../elements/titleSec";

import { collection, query, onSnapshot, where } from "firebase/firestore";
import { db } from "../utils/firebase";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";
import { useNavigate, Link } from "react-router-dom";
import Accordion from 'react-bootstrap/Accordion';
import { faGift, faList } from "@fortawesome/free-solid-svg-icons";
import { doc, updateDoc, getDocs, getDoc, Timestamp } from "firebase/firestore";
import Button from "../elements/button";
import Qrcode_pic from "../elements/qrcode_pic";

import { useLocation } from 'react-router-dom';

function OrgData({
  QRcodeDate,
  QRcodeId,
  charityName,
  exchangeData,
}) {

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const value = searchParams.get("value");

  const [tmp, setTmp] = useState([]);
  useEffect(() => {
    const q = query(collection(db, "QRcode"), where("QRcodeId", "==", QRcodeId));

    if (value) {
      console.log("value is exist");
      const qWithValue = query(collection(db, "QRcode"), where("QRcodeId", "==", value));
      onSnapshot(qWithValue, (querySnapshot) => {
        setTmp(
          querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
      });
    }
    else{
      console.log("value isn't exist");
    }

    onSnapshot(q, (querySnapshot) => {
      setTmp(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    });
  }, [QRcodeId, value]);

  const navigate = useNavigate("");
  const [demandData, setDemandData] = useState([]);

  //修改資料的地方
  const handleSubmit = async () => {
    if (value) {
      const qrcodeRef = doc(db, "QRcode", value);
      const qrcodeData = await getDoc(qrcodeRef);

      if (qrcodeData.exists()) {
        const exchangeGoodsData = qrcodeData.data().exchangeGoodsData;

        if (qrcodeData.data().status === "未領取") {
          await updateDoc(qrcodeRef, {
            "status": "已領取",
            "exchangeDate": Timestamp.now()
          });
          alert("兌換成功");
          navigate("/allQrcode");
        }
        else{
          alert("您已兌換過物資，此QR碼已失效。");
          navigate("/allQrcode");
        }
      }
    }
    else {
      navigate("/allQrcode");
    }
  };
  const nextStepStyle = {
    marginLeft: "10px",
    color: "#ffffff",
    backgroundColor: "#002B5B",
    borderRadius: "30px",
    border: "none",
    fontSize: "16px",
    width: "125px",
    textAlign: "center",
    height: "35px",
    fontWeight: "bold",
  };
  const btnStyle = {
    position: "absolute",
    marginTop: "60px",
    left: "50%",
    transform: `translate(${-50}%, ${-50}%)`,
    paddingTop: "5px",
    paddingBottom: "40px",
    paddingLeft: "15px",
    paddingRight: "15px",
    borderRadius: "10px",
    letterSpacing: "1px",
  };
  const h4Style = {
    fontWeight: "bold",
    lineHeight: "100px",
  };
  const contentStyle = {
    textAlign: "left",
    marginLeft: "30px",
    letterSpacing: "2px",
  };
  const goodsImgStyle = {
    width: "100px",
    height: "100px",
  };
  const card = {
    marginBottom: "20px",
    marginLeft: "5%",
    padding: "30px 40px 30px 40px",
    color: "#002B5B",
    width: "90%",
    display: "flex",
    flexDirection: "row",
  };
  const card_2 = {
    marginBottom: "20px",
    marginLeft: "15%",
    padding: "30px 40px 30px 40px",
    color: "#002B5B",
    width: "70%",
    display: "flex",
    flexDirection: "row",
    textAlign: "center"
  };
  const title_Btn = {
    color: "#002B5B",
    fontWeight: "600",
    letterSpacing: "2px"
  }
  const prove = {
    backgroundColor: "#26aa99",
    display: "inline-block",
    fontSize: "12px",
    padding: "3px",
    letterSpacing: "1px",
    fontWeight: "550",
    borderRadius: "5px",
    color: "white",
  };
  const prove2 = {
    backgroundColor: "#f6c23e",
    display: "inline-block",
    fontSize: "12px",
    padding: "3px",
    letterSpacing: "1px",
    fontWeight: "550",
    borderRadius: "5px",
  };

  return (
    <Card.Body>

      <h4 style={h4Style}>一、兌換條碼：</h4>

      <center><Qrcode_pic QRcodeId={QRcodeId}></Qrcode_pic></center>

      <h4 style={h4Style}>二、兌換資訊：</h4>
      {tmp.map((item, index) => (
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header><span style={title_Btn}>基本資料&nbsp;<FontAwesomeIcon icon={faList} /></span></Accordion.Header>
            <Accordion.Body>

              <Card.Body style={contentStyle}>
                <Card.Title>
                  機構名稱：<b>{item.charityName}</b>
                </Card.Title>

                <hr></hr>
                <Card.Text style={{ color: "#6C6C6C" }}>
                  結單日期：{item.QRcodeDate}
                  <br />
                  合作商家：{item.storeName}

                  <br />
                  兌換狀態：{item.status === "已領取" && (
                    <p style={prove}>{item.status}</p>
                  )}
                  {item.status === "未領取" && (
                    <p style={prove2}>{item.status}</p>
                  )}

                </Card.Text>
              </Card.Body>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header><span style={title_Btn}>商品明細&nbsp;<FontAwesomeIcon icon={faGift} /></span></Accordion.Header>
            <Accordion.Body>
              {/* 商品小卡 */}

              {item.exchangeGoodsData.map((item2, index2) => (
                <Card style={card} key={index2}>

                  <Card.Img
                    style={goodsImgStyle}
                    variant="top"
                    src={item2.goodsPicture}
                  />

                  <Card.Body style={contentStyle}>
                    <Card.Title>
                      商品名稱：<b>{item2.goodsName}</b>
                    </Card.Title>
                    <hr></hr>
                    <Card.Text style={{ color: "#6C6C6C" }}>
                      兌換數量：{item2.goodsNum}
                      <br />
                    </Card.Text>
                  </Card.Body>

                </Card>
              ))}
              {/* 商品小卡結束 */}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      ))}

      <div style={btnStyle}>
        <button style={nextStepStyle} color="#002B5B" onClick={handleSubmit}>返回</button>
      </div>

    </Card.Body>
  );
}


function AllQrcodeData() {
  const navigate = useNavigate("");

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const value = searchParams.get("value");
  
  const [tmp, setTmp] = useState([]);
  let org = JSON.parse(localStorage.getItem("orgData"));

  useEffect(() => {
    
    //console.log("org.QRcodeId:", org?.QRcodeId);

    if(value) {
      org = { ...org, QRcodeId: value };
      localStorage.setItem("orgData", JSON.stringify(org));
    }

    const q = query(collection(db, "QRcode"), where("QRcodeId", "==", org.QRcodeId));

    onSnapshot(q, (querySnapshot) => {
      setTmp(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    });
  }, [org?.QRcodeId, value]);


  const cardStyle = {
    width: "90%",
    color: "black",
    left: "50%",
    marginTop: "100px",
    transform: `translate(${-50}%, ${-5}%)`,
    paddingTop: "1.5%",
    paddingBottom: "100px",
    paddingLeft: "8%",
    paddingRight: "8%",
    letterSpacing: "1px",
  };

  return (
    <div>
      <Card style={cardStyle}>
        {tmp.map((item, index) => (
          <OrgData
            key={index}
            QRcodeId={value ? value : item.id}
            QRcodeDate={item.qrcodeDate}
            charityName={item.charityName}
            exchangeData={item.exchangeDate}
          />

        ))}
      </Card>
    </div>
  );
}

export default AllQrcodeData;
