import React from "react";
import "../App.css";
import Card from "react-bootstrap/Card";

import Navbar from "../elements/navbar";
import TitleSec from "../elements/titleSec";

import Button from "../elements/button";

import SuccessInfo from "../elements/successInfo";
import NavbarHome from "../elements/navbarHome";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { Container } from "react-bootstrap";
import ProgressBar from "react-bootstrap/ProgressBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Row } from "react-bootstrap";
import { Stepper } from "react-form-stepper";

function UploadSuccess() {
  const [user] = useAuthState(auth);

  const cardStyle = {
    width: "50%",
    color: "black",
    left: "50%",
    marginTop: "230px",
    transform: `translate(${-50}%, ${-50}%)`,
    paddingTop: "3%",
    paddingBottom: "6%",
    paddingLeft: "8%",
    paddingRight: "8%",
    letterSpacing: "1px",
  };

  const btnStyle = {
    position: "absolute",
    marginTop: "45px",
    left: "50%",
    transform: `translate(${-50}%, ${-50}%)`,
    paddingTop: "5px",
    paddingBottom: "5px",
    paddingLeft: "15px",
    paddingRight: "15px",
    borderRadius: "10px",
    letterSpacing: "1px",
  };
  return (
    <div>
      {user && <Navbar />}
      {!user && <NavbarHome />}
      <TitleSec name="注意事項" color="#90AACB"/>
      <Container>
      <Stepper style={{marginBottom: "15px"}}
          steps={[
            { label: "上傳勸募許可函一份" },
            { label: "上傳切結書一份" },
            { label: "上傳法人登記書一份" },
            { label: "上傳公益團體基本資料" },
            { label: "完成" },
          ]}
          activeStep={4}
        />
      </Container>
      <Card style={cardStyle}>
        <Card.Body>
          <SuccessInfo
            name="申請資料已上傳成功！"
            name2="需等待3～5天個工作天，屆時審核結果將寄送至申請書上的電子信箱，請務必查收，謝謝！"
            name3="（註：若寄送後7天內未查收須重新申請。）"
          />
          <div style={btnStyle}>
            <Button color="#F58D59" to="/" name="回首頁" />
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default UploadSuccess;
