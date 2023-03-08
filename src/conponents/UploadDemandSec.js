import { Container, Col, Row } from "react-bootstrap";
import React, { useState } from "react";
import "../App.css";
import TitleSec from "../elements/titleSec";
import TitleStep from "../elements/titleStep";
import DemandStep2 from "../elements/demandStep2";
import Navbar from "../elements/navbar";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import ProgressBar from "react-bootstrap/ProgressBar";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Stepper } from "react-form-stepper";

function UploadDemand() {
  const navigate = useNavigate(""); 
  const [user] = useAuthState(auth);
  if (!user) {
    navigate("/signIn");
  }

  let list = JSON.parse(localStorage.getItem("cart"));

  // 這個別刪，可能會用到
  // const location = useLocation();
  // const { from } = location.state;
  // console.log(from);

  // 原本的 nextStepStyle
  // const nextStepStyle = {
  //   marginLeft: "10px",
  // };

  // 改掉但會跑版的 nextStepStyle
  const nextStepStyle = {
    marginLeft: "10px",
    color: "#ffffff",
    backgroundColor: "#002B5B",
    borderRadius: "30px",
    border: "none",
    fontSize: "16px",
    width: "120px",
    textAlign: "center",
    height: "35px",
    fontWeight: "bold",
  };

  // 原本的 returnStepStyle
  // const returnStepStyle = {
  //   marginLeft: "39%",
  // };

  // 改掉但會跑版的 returnStepStyle
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

  const stepBtnStyle = {
    marginBottom: "40px",
    marginTop: "20px",
    textAlign: "center",
  };

  const [demandList, setDemandList] = useState([]);

  return (
    <div>
      <Navbar />
      <TitleSec name="刊登物資需求" color="#90AACB"/>
      <Container>
      <Stepper
          steps={[
            { label: "選鑿需求物資" },
            { label: "填寫資料" },
            { label: "確認送出" },
            // { label: "完成" },
          ]}
          activeStep={1}
        />
        <TitleStep name="STEP2&nbsp;-&nbsp;填寫資料" />
        {list ? (
          list.map((item, index) => (
            <>
              <DemandStep2
                key={index}
                id={item.id}
                name={item.name}
                pic={item.pic}
                store={item.store}
                demandList={demandList}
                setDemandList={setDemandList}
              />
            </>
          ))
        ) : (
          <p
            style={{
              textAlign: "center",
              color: "red",
              fontWeight: "bold",
              marginTop: "35px",
            }}
          >
            ※請返回上一頁選擇需求物資。
          </p>
        )}
        <div style={stepBtnStyle}>
          <Link to="/uploadDemand">
            <button
              style={returnStepStyle}
              onClick={() => {
                localStorage.removeItem("cart");
                localStorage.removeItem("demandList");
              }}
            >
              返回
            </button>
          </Link>
          {list !== null ? (
            <Link to="/uploadDemandThird">
              <button style={nextStepStyle}>下一步</button>
            </Link>
          ) : (
            ""
          )}
        </div>
      </Container>
    </div>
  );
}

export default UploadDemand;
