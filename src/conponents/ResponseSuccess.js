import React, { Component } from "react";
import NavbarCharity from "../elements/navbarCharity";
import { Container } from "react-bootstrap";
import TitleSec from "../elements/titleSec";
import { Card, FormControl } from "react-bootstrap";
import SuccessInfo from "../elements/successInfo";
import ButtonLink from "../elements/button";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";
import { useNavigate, useLocation } from "react-router";
import Step from "@mui/material/Step";
import Stepper from "@mui/material/Stepper";
import StepLabel from "@mui/material/StepLabel";

function ResponseSuccess() {
  const navigate = useNavigate("");
  const [user] = useAuthState(auth);
  if (!user) {
    navigate("/signIn");
  }

  const btnStyle = {
    // marginLeft: "200px",
    marginTop: "20px",
  };
  return (
    <div>
      <NavbarCharity />
      <div style={{marginTop: "-80px"}}>
        <TitleSec name="愛心回饋" color="#90AACB" />
      </div>
      <Container>
        <Stepper
          alternativeLabel
          activeStep={3}
          style={{ margin: "30px 0px 30px 0px" }}
        >
          <Step key={2}>
            <StepLabel>上傳圖片</StepLabel>
          </Step>
          <Step key={3}>
            <StepLabel>填寫回饋心得</StepLabel>
          </Step>
          <Step key={4}>
            <StepLabel>完成</StepLabel>
          </Step>
        </Stepper>
      </Container>
      <div style={{ textAlign: "center" }}>
        <Card style={{ width: "70%", marginLeft: "15%" }}>
          <Card.Body>
            <SuccessInfo name="回饋上傳成功！" name2="捐捐不息感謝您的分享。" />
            <div style={btnStyle}>
              <center>
                <ButtonLink to="/home" name="回首頁" color="#002b5b" />
              </center>
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default ResponseSuccess;
