import React from "react";
import "../App.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import TitleSec from "../elements/titleSec";

import SuccessInfo from "../elements/successInfo";
import { Link } from "react-router-dom";
import { auth } from "../utils/firebase";
import Navbar from "../elements/navbar";
import NavbarHome from "../elements/navbarHome";
import { useAuthState } from "react-firebase-hooks/auth";
import { Nav } from "react-bootstrap";
import { Container, Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import ProgressBar from "react-bootstrap/ProgressBar";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Step from '@mui/material/Step';
import Stepper from '@mui/material/Stepper';
import StepLabel from '@mui/material/StepLabel';

function CharityInfoSuccess() {
  const [user] = useAuthState(auth);

  const cardStyle = {
    width: "90%",
    color: "black",
    left: "50%",
    right: "50%",
    marginTop: "280px",
    transform: `translate(${-50}%, ${-50}%)`,
    paddingTop: "3%",
    paddingBottom: "3%",
    //paddingBottom: "30px",
    paddingLeft: "5%",
    paddingRight: "5%",
    letterSpacing: "1px",
  };

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
    marginTop: "40px",
  };
  return (
    <div>
      {user && <Navbar />}
      {!user && <NavbarHome />}
      <TitleSec name="基本資料設定" color="#F4D19B" />
      <Container>
        <Stepper activeStep={5} alternativeLabel style={{ margin: "50px" }}>

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
      <div style={{ textAlign: "center" }}>
        <Card style={cardStyle}>
          <Card.Body>
            <SuccessInfo
              name="機構帳號啟用成功！"
              name2="歡迎加入涓涓不惜，祝您有個美好的體驗。"
              name3=""
            />

            <Button
              style={btnStyle}
              as={Link}
              to="/signIn"
              variant="primary"
              name="立即登入"
            >
              立即登入
            </Button>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default CharityInfoSuccess;
