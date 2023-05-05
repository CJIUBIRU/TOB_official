import { Container } from "react-bootstrap";
import React from "react";
import "../App.css";
import MyProduct from "../elements/myProduct";
import TitleSec from "../elements/titleSec";
import { useNavigate } from "react-router-dom";
import NavbarCharity from "../elements/navbarCharity";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";

function UploadDemand() {
  const navigate = useNavigate("");
  const [user] = useAuthState(auth);
  if (!user) {
    navigate("/signIn");
  }
  return (
    <div>
      <NavbarCharity />
      <div style={{marginTop: "-80px"}}>
        <TitleSec name="我的需求" color="#90aacb" />
      </div>
      <Container>
        <div>
          <MyProduct />
        </div>
      </Container>
    </div>
  );
}

export default UploadDemand;
