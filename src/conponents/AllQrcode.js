/* eslint-disable react/jsx-pascal-case */
import React, { useState, useEffect } from "react";
import { faQrcode } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate, Link } from "react-router-dom";
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";
import { Container, Nav } from "react-bootstrap";
import TitleSec from "../elements/titleSec";
import Navbar from "../elements/navbarCharity";
import QrCodeList from "../elements/qrCodeList";

function AllQrcode() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate("");
  if (!user) {
    navigate("/signIn");
  }
  return (
    <div>
      <Navbar />
      <div style={{marginTop: "-80px"}}>
        <TitleSec name="我的兌換條碼" color="#90aacb" />
      </div>
      <QrCodeList />
    </div>
  );
}

export default AllQrcode;
