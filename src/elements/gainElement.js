import React, { useEffect, useState } from "react";
import { auth, db } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Navbar from "../elements/navbar";
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
import "../App.css";

function Task({ id, pic, text }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [user] = useAuthState(auth);
  return (
    <div>
      <Card
        className="cardGrid"
        style={{
          marginBottom: "30px",
          backgroundColor: "#FEF1E6",
        }}
      >
        <div>
          <Card.Body>
            <img style={{ width: "100%" }} src={pic} alt="charityImg"></img>
          </Card.Body>
        </div>
        <div>
          <Card.Text style={{ marginTop: "10px", marginLeft: "20px" }}>
            <div>
              <p>{text}</p>
            </div>
          </Card.Text>
        </div>
      </Card>
    </div>
  );
}

function GainElement() {
  const [user] = useAuthState(auth);
  const [details, setDetails] = useState([]);
  useEffect(() => {
    const q = query(collection(db, "gains"), limit("5"));
    onSnapshot(q, (querySnapshot) => {
      setDetails(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);
  return (
    <div>
      <Container>
        <div className="cardPageGrid">
          {details.map((item) => (
            <Task
              id={item.id}
              key={item.id}
              pic={item.data.pic}
              text={item.data.text}
            />
          ))}
        </div>
      </Container>
    </div>
  );
}

export default GainElement;
