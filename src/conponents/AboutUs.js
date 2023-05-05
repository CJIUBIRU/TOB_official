import React, { Component } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Navbar from "../elements/navbar";
import NavbarHome from "../elements/navbarHome";
import TitleSec from "../elements/titleSec";
import { auth, db } from "../utils/firebase";
import about1 from "../img/about1.png";
import { Container } from "react-bootstrap";

function AboutUs() {
  const [user] = useAuthState(auth);
  return (
    <div>
      {user && <Navbar />}
      {!user && <NavbarHome />}
      <TitleSec name="關於我們" color="#F4D19B" />
      <Container>
        <img style={{ width: "100%" }} src={about1} alt="a1Img"></img>
      </Container>
    </div>
  );
}

export default AboutUs;
