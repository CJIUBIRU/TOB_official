import React, { useState } from "react";
import Navbar from "../elements/navbarAdmin";
import TitleSec from "../elements/titleSec";
import { Container } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { FormControl } from "react-bootstrap";

import shortUUID from "short-uuid";

import { addDoc, collection } from "firebase/firestore";
import { db } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router";
import { doc, setDoc, arrayUnion } from "firebase/firestore";

function UploadGoods() {
  const navigate = useNavigate("");
  const [user] = useAuthState(auth);
  if (!user) {
    navigate("/signIn");
  }
  const [name, setName] = useState("");
  // const [address, setAddress] = useState("");
  // const [phone, setPhone] = useState("");
  // const [user] = useAuthState(auth);
  const [storesId, setStoresId] = useState(shortUUID.generate());

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // await setDoc(doc(db, "goodsDemand", user.uid), {
      await setDoc(doc(db, "stores", storesId), {
        name: name,
        uid: storesId,
      });
      window.location.reload();
      alert("新增成功。");
    } catch (err) {
      console.log(err);
    }
  };
  const subBtnStyle = {
    color: "#ffffff",
    backgroundColor: "#069A8E",
    borderRadius: "30px",
    fontSize: "16px",
    width: "120px",
    textAlign: "center",
    height: "35px",
    fontWeight: "bold",
    margin: "35px auto 35px auto",
    border: "none"
  };
  return (
    <div>
      <Navbar />
      <div style={{marginTop: "-80px"}}>
        <TitleSec name="新增合作店家" color="#7BBFBA" />
      </div>
      <br />
      <Container>
        <div style={{ textAlign: "center" }}>
          <Row>
            <Col>
              <Card style={{ width: "60%", marginLeft: "20%" }}>
                <form onSubmit={handleSubmit}>
                  <FormControl
                    style={{ margin: "35px auto 0% auto", width: "80%" }}
                    placeholder="輸入店家名稱（如：7-ELEVEN）"
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    value={name}
                  />

                  <button type="submit" style={subBtnStyle}>
                    送出
                  </button>
                </form>
              </Card>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
}

export default UploadGoods;
