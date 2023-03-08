import { Container } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import "../App.css";
import TitleSec from "../elements/titleSec";
import TitleStep from "../elements/titleStep";
import ButtonLink from "../elements/button";
import DemandStep1 from "../elements/demandStep1";
import Navbar from "../elements/navbar";
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
import { Stepper } from "react-form-stepper";

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
          activeStep={0}
        />
        <TitleStep name="STEP1&nbsp;-&nbsp;選擇需求物資" />
        {details.map((item, index) => (
          <DemandStep1
            key={index}
            id={item.id}
            name={item.data.name}
            pic={item.data.pic}
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
