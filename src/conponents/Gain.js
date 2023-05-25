import React, { useEffect, useState } from "react";
import { auth, db } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Navbar from "../elements/navbarMember";
import NavbarHome from "../elements/navbarHome";
import TitleSec from "../elements/titleSec";
import {
  collection,
  limit,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import Card from "react-bootstrap/Card";
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Slider from "react-slick";
import GainElement from "../elements/gainElement";

function Task({ id, pic, text }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div style={{ backgroundColor: "#FEF1E6", height: "400px" }}>
      <img
        style={{
          height: "400px",
          display: "block",
          margin: "auto",
        }}
        alt="gainImg"
        src={pic}
      ></img>
    </div>
  );
}

function Gain() {
  const [user] = useAuthState(auth);
  const [details, setDetails] = useState([]);
  useEffect(() => {
    const q = query(collection(db, "gains"), limit(6));
    onSnapshot(q, (querySnapshot) => {
      setDetails(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };
  return (
    <div>
      {user && <Navbar />}
      {!user && <NavbarHome />}
      <TitleSec name="捐捐細流" color="#F4D19B" />
      {/* <Slider {...settings}>
        {details.map((item) => (
          <Task
            id={item.id}
            key={item.id}
            pic={item.data.pic}
            text={item.data.text}
          />
        ))}
      </Slider>
      <br />
      <br /> */}
      <GainElement />
    </div>
  );
}

export default Gain;
