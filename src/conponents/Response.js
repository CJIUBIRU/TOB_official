import React from "react";
import { auth } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Navbar from "../elements/navbar";
import NavbarHome from "../elements/navbarHome";
import TitleSec from "../elements/titleSec";
import { Card, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

function Gain() {
  const [user] = useAuthState(auth);
  return (
    <div>
      {user && <Navbar />}
      {!user && <NavbarHome />}
      <TitleSec name="愛心回饋" color="#90AACB"/>
      <Container>
        <div style={{ textAlign: "center" }}>
          <p
            style={{
              backgroundColor: "#FFD2D2",
              textAlign: "center",
              // width: "300px",
              color: "#e74a3b",
              fontWeight: "bold",
            }}
          >
            <FontAwesomeIcon
              style={{ marginRight: "5px" }}
              icon={faTriangleExclamation}
            />
            您尚有_筆物資尚未回覆愛心回饋！
          </p>
        </div>
        <Card style={{ height: "500px" }}></Card>
      </Container>
    </div>
  );
}

export default Gain;
