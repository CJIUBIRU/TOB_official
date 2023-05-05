import React, { useState, useEffect } from "react";
import { db } from "../utils/firebase";
import NavbarCharity from "../elements/navbarCharity";
import TitleSec from "../elements/titleSec";
import { Card, FormControl } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import {
  doc,
  collection,
  query,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import TitleStep from "../elements/titleStep";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";
import { useNavigate, useLocation } from "react-router";
//import { v4 as uuidv4 } from "uuid";
import Form from "react-bootstrap/Form";
import Timestamp from "react-timestamp";
import Step from "@mui/material/Step";
import Stepper from "@mui/material/Stepper";
import StepLabel from "@mui/material/StepLabel";

function ResponseSec() {
  const navigate = useNavigate("");
  const [user] = useAuthState(auth);
  const [tasks, setTasks] = useState([]);
  if (!user) {
    navigate("/signIn");
  }
  const location = useLocation();
  const { fromID, fromURL } = location.state;

  //console.log(fromID);
  //console.log(fromURL);

  const [text, setText] = useState("");
  // const [user] = useAuthState(auth);

  const taskDocRef = doc(db, "gains", user.uid);

  const handleSubmit = async (e) => {
    //let uuid = uuidv4();
    e.preventDefault();
    try {
      //console.log("start");
      await updateDoc(taskDocRef, {
        text: text,
        pic: fromURL,
      });
      //console.log('end');
      navigate("/ResponseSuccess");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const q = query(collection(db, "gains"));
    onSnapshot(q, (querySnapshot) => {
      setTasks(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);

  return (
    <div>
      <NavbarCharity />
      <div style={{ marginTop: "-80px" }}>
        <TitleSec color="#90AACB" name="愛心回饋" />
      </div>
      <Container>
        <Stepper
          alternativeLabel
          activeStep={1}
          style={{ margin: "30px 0px 30px 0px" }}
        >
          <Step key={2}>
            <StepLabel>上傳圖片</StepLabel>
          </Step>
          <Step key={3}>
            <StepLabel>填寫回饋心得</StepLabel>
          </Step>
          <Step key={4}>
            <StepLabel>完成</StepLabel>
          </Step>
        </Stepper>

        <form onSubmit={handleSubmit}>
          <Card
            style={{
              width: "80%",
              marginLeft: "10%",
              paddingBottom: "50px",
            }}
          >
            <center>
              <textarea
                class="form-control"
                style={{
                  margin: "2%",
                  marginTop: "30px",
                  width: "90%",
                  height: "150px",
                }}
                placeholder="填寫本次物資需求達成後，發生的有趣小故事、心得。"
                onChange={(e) => setText(e.target.value)}
                type="text"
                value={text}
              />
            </center>
          </Card>
          <div
            style={{
              //marginLeft: "44.3%",
              marginTop: "60px",
              width: "auto",
            }}
          >
            {text && (
              <center>
                <button
                  type="submit"
                  style={{
                    color: "#ffffff",
                    backgroundColor: "#002b5b",
                    borderRadius: "30px",
                    fontSize: "16px",
                    width: "120px",
                    textAlign: "center",
                    height: "35px",
                    fontWeight: "bold",
                    margin: "0px 0px 80px 15px",
                    border: "none",
                  }}
                >
                  送出
                </button>
              </center>
            )}
            {!text && (
              <center>
                <button
                  type="submit"
                  style={{
                    color: "#ffffff",
                    backgroundColor: "lightgray",
                    borderRadius: "30px",
                    fontSize: "16px",
                    width: "120px",
                    textAlign: "center",
                    height: "35px",
                    fontWeight: "bold",
                    margin: "0px 0px 80px 15px",
                    border: "none",
                  }}
                >
                  送出
                </button>
              </center>
            )}
          </div>
        </form>
      </Container>
    </div>
  );
}

export default ResponseSec;
