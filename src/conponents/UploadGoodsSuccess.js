import React from "react";
import "../App.css";
import Card from "react-bootstrap/Card";

import Navbar from "../elements/navbarAdmin";
import TitleSec from "../elements/titleSec";
import { Row, Col } from "react-bootstrap";
import Button from "../elements/button";

import SuccessInfo from "../elements/successInfo";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router";
import { Container } from "react-bootstrap";
// import { Stepper } from "react-form-stepper";
import Step from '@mui/material/Step';
import Stepper from '@mui/material/Stepper';
import StepLabel from '@mui/material/StepLabel';

function UploadSuccess() {
  const navigate = useNavigate("");
  const [user] = useAuthState(auth);
  if (!user) {
    navigate("/signIn");
  }
  // const cardStyle = {
  //   width: "50%",
  //   color: "black",
  //   left: "50%",
  //   marginTop: "350px",
  //   transform: `translate(${-50}%, ${-50}%)`,
  //   paddingTop: "3%",
  //   paddingBottom: "6%",
  //   paddingLeft: "8%",
  //   paddingRight: "8%",
  //   letterSpacing: "1px",
  // };

  const btnStyle = {
    position: "absolute",
    marginTop: "80px",
    left: "50%",
    transform: `translate(${-50}%, ${-50}%)`,
    paddingTop: "5px",
    paddingBottom: "5px",
    paddingLeft: "15px",
    paddingRight: "15px",
    borderRadius: "10px",
    letterSpacing: "1px",
    display: "flex",
    flexDirection: "row",

  };
  return (
    <div>
      <Navbar />
      <div style={{marginTop: "-80px"}}>
        <TitleSec name="上架物資" color="#7BBFBA" />
      </div>
      <Container style={{ marginBottom: "15px" }}>
        <Stepper activeStep={3} alternativeLabel>

          <Step key={2}>
            <StepLabel>上傳圖片</StepLabel>
          </Step>
          <Step key={3}>
            <StepLabel>填寫商品資訊</StepLabel>
          </Step>
          <Step key={4}>
            <StepLabel>完成</StepLabel>
          </Step>

        </Stepper>
      </Container>
      <Container>
        <div style={{ textAlign: "center" }}>
          <Row>
            <Col>
              <Card style={{ display: "inline-block", padding: "20px 20px 20px 20px", marginLeft: "auto" }}>
                <Card.Body>
                  <SuccessInfo
                    name="物資已上架成功！"
                    name2="（可至 物資一覽表 查看已上架物資。）"
                  />
                  <div style={btnStyle}>
                    <Button color="#069A8E" to="/uploadGoods" name="繼續上架" />
                    &nbsp;
                    <Button color="#069A8E" to="/allGoods" name="物資一覽表" />
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
}

export default UploadSuccess;
