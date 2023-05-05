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
import { doc, updateDoc, Timestamp } from "firebase/firestore";
import Button from "../elements/button";
import Qrcode_pic from "../elements/qrcode_pic";


function OrgData({
  QRcodeId,
  charityName,
  storeName,
  qrcodeDate,
  deadlineDate,
  goodsName,
  goodsPicture,
  goodsNum,
  status,
  exchangeDate,
}) {
  const [tmp, setTmp] = useState([]);


  useEffect(() => {
    const q = query(collection(db, "QRcode"), where("QRcodeId", "==", QRcodeId));
    onSnapshot(q, (querySnapshot) => {
      setTmp(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    });
  }, []);

  const navigate = useNavigate("");
  const [passID, setPassID] = useState("");
  //修改資料的地方（不要刪掉！！！）
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("uid：" + QRcodeId);
    console.log("passID：" + passID);


    if (passID.trim() === QRcodeId.trim()) {
      const pID = QRcodeId.trim();
      //console.log("pID："+pID);
      const taskDocRef = doc(db, "QRcode", pID);

      // console.log(taskDocRef._key.id);
      console.log(taskDocRef);

      try {
        console.log("start");
        await updateDoc(taskDocRef, {
          status: "已領取",
          exchangeDate: Timestamp.now(),
        });
        alert("兌換成功");
        navigate("/storeQrcode");

      } catch (err) {
        console.log(err);
        //alert("驗證碼不正確，兌換失敗。")
      }
    } else {
      alert("兌換失敗，驗證碼不正確。");
    }
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
    marginLeft: "10px",
    letterSpacing: "1px",
  };
  const goodsImgStyle = {
    width: "100px",
    height: "100px",
  };
  const card = {
    marginBottom: "20px",
    marginLeft: "3%",
    padding: "10px 20px 10px 20px",
    color: "#002B5B",
    width: "90%",
    display: "flex",
    //flexDirection: "row",
  };
  const card_2 = {
    marginBottom: "20px",
    marginLeft: "15%",
    padding: "5%",
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
                  <b>{item.charityName}</b>
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
                  <center>
                    <Card.Img
                      style={goodsImgStyle}
                      variant="top"
                      src={item2.goodsPicture}
                    />
                  </center>

                  <Card.Body style={contentStyle}>
                    <center>
                      <Card.Title>
                        商品名稱：<b>{item2.goodsName}</b>
                      </Card.Title>
                    </center>
                    <hr></hr>
                    <center>
                      <Card.Text style={{ color: "#6C6C6C" }}>
                        兌換數量：{item2.goodsNum}
                        <br />
                      </Card.Text>
                    </center>
                  </Card.Body>

                </Card>
              ))}
              {/* 商品小卡結束 */}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      ))}

      <div style={btnStyle}>
        <Button color="#002B5B" to="/allQrcode" name="返回" />
      </div>

    </Card.Body>
  );
}

function AllQrcodeData() {
  const navigate = useNavigate("");
  const [user] = useAuthState(auth);
  if (!user) {
    navigate("/signIn");
  }
  const [tmp, setTmp] = useState([]);
  let org = JSON.parse(localStorage.getItem("orgData"));
  console.log(org.QRcodeId)

  useEffect(() => {

    const q = query(collection(db, "QRcode"), where("QRcodeId", "==", org.QRcodeId));
    onSnapshot(q, (querySnapshot) => {
      setTmp(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    });
  }, []);


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
      <Navbar />
      <div style={{marginTop: "-80px"}}>
        <TitleSec name="我的兌換條碼明細" color="#90aacb" />
      </div>
      <Card style={cardStyle}>
        {tmp.map((item, index) => (
          <OrgData
            key={index}
            id={item.id}
            QRcodeId={item.QRcodeId}
          />
        ))}
      </Card>
    </div>
  );
}

export default AllQrcodeData;
