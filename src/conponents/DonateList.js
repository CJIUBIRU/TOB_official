import { Col, Container, Row } from "react-bootstrap";
import React, { useState, useEffect } from "react";
// import ListGroup from "react-bootstrap/ListGroup";
import Pagination from "react-bootstrap/Pagination";
import "../App.css";
import TitleSec from "../elements/titleSec";
import TitleStep from "../elements/titleStep";
import FromSelect from "../elements/fromSelect";
import Search from "../elements/search";
import ProductStep1 from "../elements/productStep1";
import ButtonLink from "../elements/button";
import PaginationList from "../elements/paginationList";
import NavbarMember from "../elements/navbarMember";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";
import NavbarHome from "../elements/navbarHome";
import { collection, query, onSnapshot, where } from "firebase/firestore";
import { db } from "../utils/firebase";
import Step from "@mui/material/Step";
import Stepper from "@mui/material/Stepper";
import StepLabel from "@mui/material/StepLabel";

const DonateList = () => {
  const [user] = useAuthState(auth);
  const donPageStyle = {
    marginTop: "70px",
  };
  const selectPageStyle = {
    display: "flex",
    flexDirection: "row",
  };
  const goodsPageStyle = {
    display: "flex",
    flexDirection: "row",
  };
  const paginationStyle = {
    marginLeft: "28%",
    marginRight: "62%",
    marginTop: "20px",
  };

  // 抓 demand DB data
  const [details, setDetails] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "demand"), where("quantity", ">", 0));
    onSnapshot(q, (querySnapshot) => {
      setDetails(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);

  // console.log(details)

  // details.map((item) =>
  //   console.log(item)
  // )

  //set up donateCart
  const [donateCart, setDonateCart] = useState([]);

  return (
    <div>
      {user && <NavbarMember />}
      {!user && <NavbarHome />}
      <div style={donPageStyle}>
        <TitleSec name="認購物資列表" color="#F4D19B" />
        <Container>
          <TitleStep name="STEP1&nbsp;-&nbsp;選擇認購物資" />
          <Stepper alternativeLabel style={{margin: "30px 0px 30px 0px"}}>
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
          {details.map((item, index) => (
            <ProductStep1
              key={index}
              id={item.id}
              name={item.data.name}
              pic={item.data.pic}
              store={item.data.store}
              quantity={item.data.quantity}
              received={item.data.received}
              charity={item.data.charity}
              description={item.data.description}
              price={item.data.price}
              donateCart={donateCart}
              setDonateCart={setDonateCart}
            />
          ))}
          {user && (
            <div
              style={{
                marginTop: "25px",
                marginBottom: "40px",
                marginLeft: "45%",
                marginRight: "55%",
              }}
            >
              <ButtonLink to="/donateListSec" name="下一步" color="#f58d59" />
            </div>
          )}
          {!user && (
            <div
              style={{
                marginTop: "25px",
                marginBottom: "40px",
                marginLeft: "43%",
              }}
            >
              <button
                style={{
                  color: "#ffffff",
                  backgroundColor: "lightgray",
                  border: "none",
                  borderRadius: "30px",
                  fontSize: "16px",
                  width: "180px",
                  textAlign: "center",
                  height: "35px",
                  fontWeight: "bold",
                }}
              >
                登入後可進行下一步
              </button>
            </div>
          )}
        </Container>
      </div>
    </div>
  );
};

export default DonateList;
