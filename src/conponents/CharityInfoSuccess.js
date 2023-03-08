import React from "react";
import "../App.css";
import Card from "react-bootstrap/Card";

import TitleSec from "../elements/titleSec";

import SuccessInfo from "../elements/successInfo";
import { Link } from "react-router-dom";
import { auth } from "../utils/firebase";
import NavbarNoFunction from "../elements/navbarNoFunction";
import { Nav } from "react-bootstrap";
import { Container, Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import ProgressBar from "react-bootstrap/ProgressBar";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Stepper } from "react-form-stepper";

function CharityInfoSuccess() {
  const cardStyle = {
    width: "50%",
    color: "black",
    left: "50%",
    marginTop: "200px",
    transform: `translate(${-50}%, ${-50}%)`,
    paddingTop: "3%",
    paddingBottom: "6%",
    paddingLeft: "8%",
    paddingRight: "8%",
    letterSpacing: "1px",
  };

  const btnStyle = {
    position: "absolute",
    marginTop: "30px",
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
      <NavbarNoFunction />
      <TitleSec name="基本資料設定" color="#90AACB" />
      <Container>
      <Stepper
          steps={[
            { label: "設定密碼" },
            { label: "上傳機構Logo" },
            { label: "填寫機構簡介" },
            { label: "完成" },
          ]}
          activeStep={3}
        />
      </Container>
      <Card style={cardStyle}>
        <Card.Body>
          <SuccessInfo
            name="機構簡介上傳成功！"
            name2="若需更改上傳資料請至＜機構簡介＞設定。"
            name3=""
          />

          {/* 以後要連到首頁，先暫訂查看合作機構 */}
          <div style={btnStyle}>
            <Nav.Link
              style={{
                color: "#ffffff",
                backgroundColor: "#002B5B",
                borderRadius: "30px",
                fontSize: "16px",
                width: "120px",
                textAlign: "center",
                height: "35px",
                fontWeight: "bold",
                lineHeight: "33px",
              }}
              as={Link}
              to="/signIn"
              onClick={() => auth.signOut()}
            >
              完成
            </Nav.Link>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default CharityInfoSuccess;
