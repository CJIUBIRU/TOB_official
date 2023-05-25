import { Container } from "react-bootstrap";
import React from "react";
import "../App.css";
import TitleSec from "../elements/titleSec";
import Record from "../elements/record";
import NavbarMember from "../elements/navbarMember";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router";
import { Row, Col } from "react-bootstrap";

function UploadDemand() {
  const navigate = useNavigate("");
  const [user] = useAuthState(auth);
  if (!user) {
    navigate("/signIn");
  }
  return (
    <div style={{marginBottom: "50px"}}>
      <NavbarMember />
      <TitleSec name="認購紀錄" color="#F4D19B"/>
      <Container>
        <div>
          <Record></Record>
        </div>
      </Container>
    </div>
  );
}

export default UploadDemand;
