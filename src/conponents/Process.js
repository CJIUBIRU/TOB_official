import { Container } from "react-bootstrap";
import React from "react";
import "../App.css";
import TitleSec from "../elements/titleSec";
import ProcessList from "./ProcessList";
import Navbar from "../elements/navbar";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router";

function UploadDemand() {
  const navigate = useNavigate("");
  const [user] = useAuthState(auth);
  if (!user) {
    navigate("/signIn");
  }
  return (
    <div>
      <Navbar />
      <TitleSec name="認購進度追蹤" color="#F4D19B"/>
      <Container>
        <div>
          <ProcessList />
        </div>
      </Container>
    </div>
  );
}

export default UploadDemand;
