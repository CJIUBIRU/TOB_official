import React, { useState, useEffect } from "react";
import "../App.css";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faEye } from "@fortawesome/free-solid-svg-icons";
import Navbar from "../elements/navbarAdmin";
import TitleSec from "../elements/titleSec";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router";
import { Container } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import ManagerProveList from "../elements/managerProveList";

function ManagerProve() {
  const navigate = useNavigate("");
  const [user] = useAuthState(auth);
  if (!user) {
    navigate("/signIn");
  }

  const cardStyle = {
    width: "90%",
    color: "black",
    left: "50%",
    marginTop: "110px",
    transform: `translate(${-50}%, ${-5}%)`,
    paddingTop: "10px",
    paddingBottom: "10px",
    paddingLeft: "10px",
    paddingRight: "10px",
    letterSpacing: "1px",
  };

  return (
    <div>
      <Navbar />
      <div style={{marginTop: "-80px"}}>
        <TitleSec name="機構申請資料審核" color="#7BBFBA" />
      </div>
      <ManagerProveList />
    </div>
  );
}

export default ManagerProve;
