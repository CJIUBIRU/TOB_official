import { Container } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import "../App.css";
import TitleSec from "../elements/titleSec";
import TitleStep from "../elements/titleStep";
import ButtonLink from "../elements/button";
import DemandStep1 from "../elements/demandStep1";
import NavbarCharity from "../elements/navbarCharity";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router";
import ProgressBar from "react-bootstrap/ProgressBar";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Step from "@mui/material/Step";
import Stepper from "@mui/material/Stepper";
import StepLabel from "@mui/material/StepLabel";

function UploadDemand() {
  const navigate = useNavigate("");
  const [user] = useAuthState(auth);
  if (!user) {
    navigate("/signIn");
  }

  // 抓supply DB data
  const [details, setDetails] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "supply"));
    onSnapshot(q, (querySnapshot) => {
      setDetails(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);

  // details.map((item) =>
  //   console.log(item)
  // )

  //let cart = [];
  const [cart, setCart] = useState([]);

  return (
    <div>
      <NavbarCharity />
      <div style={{marginTop: "-80px"}}>
        <TitleSec name="刊登物資需求" color="#90AACB" />
      </div>
      <Container>
        <Stepper
          alternativeLabel
          activeStep={0}
          style={{ margin: "30px 0px 30px 0px" }}
        >
          <Step key={2}>
            <StepLabel>選擇需求物資</StepLabel>
          </Step>
          <Step key={3}>
            <StepLabel>填寫資料</StepLabel>
          </Step>
          <Step key={4}>
            <StepLabel>確認送出</StepLabel>
          </Step>
        </Stepper>
        <TitleStep name="STEP1&nbsp;-&nbsp;選擇需求物資" />
        {details.map((item, index) => (
          <DemandStep1
            key={index}
            id={item.id}
            name={item.data.name}
            pic={item.data.pic}
            price={item.data.price}
            store={item.data.store}
            cart={cart}
            setCart={setCart}
          />
        ))}
        <div
          style={{
            marginTop: "40px",
            marginBottom: "50px",
            marginLeft: "45%",
            marginRight: "55%",
          }}
        >
          <ButtonLink color="#002b5b" to="/uploadDemandSec" name="下一步" />
        </div>
      </Container>
    </div>
  );
}

export default UploadDemand;
