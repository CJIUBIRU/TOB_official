import { Container, Col, Row } from "react-bootstrap";
import React, { useState } from "react";
import "../App.css";
import TitleSec from "../elements/titleSec";
import TitleStep from "../elements/titleStep";
import ProductStep3 from "../elements/productStep3";
import NavbarMember from "../elements/navbarMember";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";
import { useNavigate, useLocation } from "react-router";
import { Link } from "react-router-dom";
import { doc, setDoc, arrayUnion } from "firebase/firestore";
import { db } from "../utils/firebase";
import ProgressBar from "react-bootstrap/ProgressBar";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ShortUniqueId from "short-unique-id";
import Step from "@mui/material/Step";
import Stepper from "@mui/material/Stepper";
import StepLabel from "@mui/material/StepLabel";

function UploadDemand() {
  const navigate = useNavigate("");
  const [user] = useAuthState(auth);
  if (!user) {
    navigate("/signIn");
  }
  // const [docid, setDocid] = useState(uuidv4());
  // console.log(docid)
  // eg. 73WakrfVbNJBaAmhQtEeDv
  // console.log(shortUUID.generate());
  const { totalAmount } = useLocation().state;
  // const TradeDate = new Date().toLocaleString('zh-TW', { timeZone: 'Asia/Taipei' });
  // const date = new Date();
  // const formatter = new Intl.DateTimeFormat('zh-TW', {
  //   year: 'numeric',
  //   month: '2-digit',
  //   day: '2-digit',
  //   hour: '2-digit',
  //   minute: '2-digit',
  //   second: '2-digit',
  //   hour12: false,
  // });

  // const merchantTradeDate = formatter.format(date);
  function getCurrentTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = ("0" + (now.getMonth() + 1)).slice(-2);
    const day = ("0" + now.getDate()).slice(-2);
    const hour = ("0" + now.getHours()).slice(-2);
    const minute = ("0" + now.getMinutes()).slice(-2);
    const second = ("0" + now.getSeconds()).slice(-2);
    const formattedTime = `${year}/${month}/${day} ${hour}:${minute}:${second}`;
    return formattedTime;
  }

  const merchantTradeDate = getCurrentTime();
  const nextStepStyle = {
    color: "#ffffff",
    backgroundColor: "#f58d59",
    borderRadius: "30px",
    border: "none",
    fontSize: "16px",
    width: "120px",
    textAlign: "center",
    marginLeft: "10px",
    height: "35px",
    fontWeight: "bold",
  };
  const returnStepStyle = {
    color: "#ffffff",
    backgroundColor: "#f58d59",
    borderRadius: "30px",
    border: "none",
    fontSize: "16px",
    width: "120px",
    textAlign: "center",
    height: "35px",
    fontWeight: "bold",
  };
  const stepBtnStyle = {
    marginBottom: "40px",
    marginTop: "25px",
    textAlign: "center",
  };
  const payStyle = {
    margin: "20px 15% 40px 15%",
    color: "#002b5b",
  };

  let donateList = JSON.parse(localStorage.getItem("donateList"));
  // console.log(donateList)
  let itemName = donateList
    .map((item) => {
      return `${item.name}X${item.count}`;
    })
    .join("#");

  const createMerchantTradeNo = new ShortUniqueId({ length: 20 });
  const [merchantTradeNo, setMerchantTradeNo] = useState(
    createMerchantTradeNo()
  );

  // 測試連接 php 用
  // const [result, setResult] = useState('');

  // const formRef = useRef()
  // const handleSubmit = async (e) => {
  //   // alert('hi')
  //   await uploadDonateDB(e);
  //   formRef.current && formRef.current.submit()
  // }

  const uploadDonateDB = async (e) => {
    e.preventDefault();
    try {
      // 上傳 data 到 donate DB
      await setDoc(doc(db, "donate", merchantTradeNo), {
        merchantTradeNo: merchantTradeNo,
        uid: user.uid,
        donateList: arrayUnion(...donateList),
        totalAmount: totalAmount,
        merchantTradeDate: merchantTradeDate,
        paymentStatus: "尚未付款",
      });
      // alert("正在前往付款介面......");
      localStorage.removeItem("donateList");
      localStorage.removeItem("donateCart");
    } catch (err) {
      console.log(err);
      alert("認購過程有誤，請重新認購一次，謝謝。");
    }
  };

  const handleCreateOrder = async (e) => {
    await uploadDonateDB(e);

    const orderData = {
      MerchantTradeNo: merchantTradeNo,
      MerchantTradeDate: merchantTradeDate, // merchantTradeDate
      TotalAmount: totalAmount,
      ReturnURL:
        "https://us-central1-donation-platform-54f2b.cloudfunctions.net/returnResult",
      ChoosePayment: "ALL",
      ClientBackURL: "http://localhost:3000/donateList",
      ItemName: itemName,
    };
    try {
      await fetch(
        "https://us-central1-donation-platform-54f2b.cloudfunctions.net/app",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ orderData }),
        }
      )
        .then((res) => res.text())
        .then((html) => {
          document.write(html);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <NavbarMember />
      <TitleSec name="認購物資需求" color="#F4D19B" />
      <Container>
      <Stepper alternativeLabel activeStep={2} style={{margin: "30px 0px 30px 0px"}}>
          <Step key={2}>
            <StepLabel>選擇認購物資</StepLabel>
          </Step>
          <Step key={3}>
            <StepLabel>填寫資料</StepLabel>
          </Step>
          <Step key={4}>
            <StepLabel>確認資料</StepLabel>
          </Step>
          <Step key={5}>
            <StepLabel>付款</StepLabel>
          </Step>
        </Stepper>
        <TitleStep name="STEP3&nbsp;-&nbsp;確認付款" />
        <div style={{height: "30px"}}></div>
        {donateList ? (
          donateList.map((item, index) => (
            <>
              <ProductStep3
                key={index}
                id={item.id}
                pic={item.pic}
                name={item.name}
                store={item.store}
                charity={item.charity}
                description={item.description}
                quantity={item.quantity}
                count={item.count}
                price={item.price}
                subtotal={item.subtotal}
              />
            </>
          ))
        ) : (
          <div style={{ textAlign: "center", marginTop: "35px" }}>
            <p style={{ color: "red", fontWeight: "bold" }}>
              ※請返回上一頁填寫需求物資之資料。
            </p>
          </div>
        )}
        {donateList ? (
          <>
            <div
              style={{ textAlign: "right", width: "70%", marginLeft: "15%", marginBottom: "30px" }}
            >
              <hr></hr>
              <p
                style={{
                  color: "red",
                  fontWeight: "bold",
                  marginTop: "25px",
                  fontSize: "18px",
                }}
              >
                總計：${totalAmount}
              </p>
            </div>
            <div style={payStyle}>
              <h5>
                <b>可使用之付款方式：</b>
              </h5>
              <h5
                style={{
                  margin: "20px 0px 10px 0px",
                  backgroundColor: "#FFECF5",
                  textAlign: "center",
                }}
              >
                信用卡 Credit Card
              </h5>
              <h5
                style={{
                  margin: "20px 0px 10px 0px",
                  backgroundColor: "#FFECF5",
                  textAlign: "center",
                }}
              >
                網路 ATM
              </h5>
              <h5
                style={{
                  margin: "20px 0px 10px 0px",
                  backgroundColor: "#FFECF5",
                  textAlign: "center",
                }}
              >
                ATM 櫃員機
              </h5>
              <h5
                style={{
                  margin: "20px 0px 10px 0px",
                  backgroundColor: "#d7e9f7",
                  textAlign: "center",
                }}
              >
                超商條碼
              </h5>
              <h5
                style={{
                  margin: "20px 0px 10px 0px",
                  backgroundColor: "#d7e9f7",
                  textAlign: "center",
                }}
              >
                超商代碼
              </h5>
            </div>
            <p
              style={{
                fontSize: "17px",
                textAlign: "center",
                marginTop: "10px",
                color: "red",
                fontWeight: "bold",
              }}
            >
              ※注意：完成付款後視為認購成立，不得取消。
            </p>
          </>
        ) : (
          ""
        )}
        <div style={stepBtnStyle}>
          <Link to="/donateListSec">
            <button
              style={returnStepStyle}
              onClick={() => {
                localStorage.removeItem("demandList");
              }}
            >
              返回
            </button>
          </Link>
          {donateList !== null ? (
            <button onClick={handleCreateOrder} style={nextStepStyle}>
              前往付款
            </button>
          ) : (
            ""
          )}
          {/* {donateList !== null ? (
              <form ref={formRef} id="idFormAioCheckOut" action="http://localhost:8000/EcPay/createOrder.php" method="post">
                <input type="hidden" name="donateList" value={donateList}/>
                <input type="hidden" name="merchantTradeNo" value={merchantTradeNo}/> 
                <input type="hidden" name="merchantTradeDate" value={merchantTradeDate} />
                <input type="hidden" name="totalAmount" value={totalAmount}/>
                <input type="hidden" name="donateListJson" value={donateListJson} />
                <button type="button" onClick={handleSubmit} style={nextStepStyle}>前往付款(php)</button>
              </form>
            ) : (
              ""
            )} */}
        </div>
      </Container>
    </div>
  );
}

export default UploadDemand;
