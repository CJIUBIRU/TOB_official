import React, { useState, useEffect } from "react";
import "../App.css";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import TitleSec from "../elements/titleSec";
import TitleStep from "../elements/titleStep";
import {
  addDoc,
  collection,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import { db, auth } from "../utils/firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router";
import { Container, Row } from "react-bootstrap";

import { Link } from "react-router-dom";
import Step from '@mui/material/Step';
import Stepper from '@mui/material/Stepper';
import StepLabel from '@mui/material/StepLabel';

import Navbar from "../elements/navbar";
import NavbarHome from "../elements/navbarHome";
import { useAuthState } from "react-firebase-hooks/auth";
import Button from "react-bootstrap/Button";

// function GetCharityID({emailCharity}) {
//   const [charityID, setCharityID] = useState(null);
//   // 抓 charity DB data
//   useEffect(() => {
//     const q = query(collection(db, "charity"), where("info.mail", "==", emailCharity));
//     onSnapshot(q, (querySnapshot) => {
//       setCharityID(querySnapshot.docs.map((doc) => ({ id: doc.id })))
//       // setDetails(
//       //   querySnapshot.docs.map((doc) => ({
//       //     id: doc.id,
//       //   }))
//       // );
//     });
//   }, [emailCharity]);
// }

function SetMailData() {
  const navigate = useNavigate();
  // const [charityID, setCharityID] = useState(null);
  // console.log(charityID);

  const getCharityMailData = async (item) => {
    localStorage.setItem("CharityMail", JSON.stringify(item));
    const q = query(collection(db, "charity"), where("info.mail", "==", emailCharity));
    onSnapshot(q, (querySnapshot) => {
      onSnapshot(q, (querySnapshot) => {
        if (querySnapshot.docs.length === 0) {
          alert('找不到相同的電子郵件，請確認後重新輸入。');
          navigate("/SetMailData")
          return;
        }
        const doc = querySnapshot.docs[0];
        const charityID = doc ? doc.id : '';
        localStorage.setItem("CharityID", JSON.stringify(charityID));
      });
    });
    navigate("/setPassword")
  }

  const [user] = useAuthState(auth);
  const [emailCharity, setEmailCharity] = useState(""); // 應為連結傳進來的email，目前先預設假email

  console.log(emailCharity);

  const btnStyle = {
    color: "#ffffff",
    backgroundColor: "#F58D59",
    borderRadius: "30px",
    fontSize: "16px",
    width: "120px",
    textAlign: "center",
    height: "35px",
    fontWeight: "bold",
    border: "none",
  };
  const cardStyle = {
    width: "80%",
    height: "300px",
    color: "black",
    paddingTop: "60px",
    marginLeft: "10%",
    paddingBottom: "10px",
    paddingLeft: "8%",
    paddingRight: "8%",
    letterSpacing: "1px",
    marginTop: "30px",
  };
  const labelStyle = {
    width: "25%",
    textAlign: "center",
    paddingTop: "1%",
  };
  const inputStyle = {
    width: "80%",
    borderRadius: "5px",
    marginBottom: "10px",
  };
  const groupStyle = {
    marginTop: "30px",
  };
  const subBtnStyle = {
    color: "#ffffff",
    backgroundColor: "#002B5B",
    borderRadius: "30px",
    fontSize: "16px",
    width: "120px",
    textAlign: "center",
    height: "35px",
    fontWeight: "bold",
    marginLeft: "46.5%",
    marginTop: "40px",
  };
  const errorMessageStyle = {
    fontSize: "16px",
    fontWeight: "bold",
    color: "red",
    textAlign: "center",
    marginTop: "0px",
    border: "1px red solid",
    backgroundColor: "#FFECEC",
  };
  return (
    <div>
      {user && <Navbar />}
      {!user && <NavbarHome />}
      <TitleSec name="基本資料設定" color="#F4D19B" />

      <Container style={{ marginBottom: "50px" }}>
        <Container>

          <Stepper alternativeLabel style={{ margin: "50px" }}>

            <Step key={2}>
              <StepLabel>輸入電子郵件</StepLabel>
            </Step>
            <Step key={3}>
              <StepLabel>設定密碼</StepLabel>
            </Step>
            <Step key={4}>
              <StepLabel>上傳機構Logo</StepLabel>
            </Step>
            <Step key={5}>
              <StepLabel>上傳機構圖片</StepLabel>
            </Step>
            <Step key={6}>
              <StepLabel>填寫機構簡介</StepLabel>
            </Step>
            <Step key={7}>
              <StepLabel>完成</StepLabel>
            </Step>

          </Stepper>
        </Container>
        <TitleStep name="STEP1&nbsp;-&nbsp;輸入電子郵件" />
        <Card style={cardStyle}>
          <Card.Body>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">帳號</InputGroup.Text>
              <Form.Control
                value={emailCharity}
                aria-label="Username"
                aria-describedby="basic-addon1"
                placeholder="請輸入帳號（電子郵件）"
                onChange={(e) => setEmailCharity(e.target.value)}
              />
            </InputGroup>


            <div>
              <br></br>
              <center>
                <button
                  style={btnStyle}
                  as={Link}
                  // to="/setPassword"
                  onClick={(e) => getCharityMailData(emailCharity)}
                  variant="primary"
                  name="下一步"
                >
                  下一步
                </button>
              </center>


            </div>

          </Card.Body>
        </Card>

      </Container>
    </div>
  );
}

export default SetMailData;
