import React, { useState } from "react";
import { db, storage } from "../utils/firebase";
import Navbar from "../elements/navbarAdmin";
import TitleSec from "../elements/titleSec";
import { Card, FormControl } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import TitleStep from "../elements/titleStep";
import { Link } from "react-router-dom";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import ProgressBar from "react-bootstrap/ProgressBar";
import "../App.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";

import { doc, setDoc } from "firebase/firestore";

import "../App.css";

import Step from '@mui/material/Step';
import Stepper from '@mui/material/Stepper';
import StepLabel from '@mui/material/StepLabel';
import shortUUID from "short-uuid";
//let uuid = uuidv4();
function UploadOpenData() {
  //const [goodsId, setGoodsId] = useState(shortUUID.generate());

  //const [uuid, setUuid] = useState(goodsId);
  const navigate = useNavigate("");
  const [user] = useAuthState(auth);
  if (!user) {
    navigate("/signIn");
  }

  const [progress, setProgress] = useState(0);
  const [urlID, setUrlID] = useState("");

  console.log(urlID);
  const formHandler = async (e) => {
    e.preventDefault();
    const file = e.target[0].files[0];
    uploadFiles(file);
    console.log(file.name);

    e.preventDefault();
    // try {
    //   // await setDoc(doc(db, "goodsDemand", user.uid), {
    //   await setDoc(doc(db, "supply", uuid), {
    //     uid: uuid,
    //     name: "",
    //     store: "",
    //     price: "",
    //     pic: "",
    //   });
      
    // } catch (err) {
    //   console.log(err);
    // }
  };
  const uploadFiles = (file) => {
    if (!file) return;
    // setUuid(uuidv4());
    const storageRef = ref(storage, `/OpenData/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(prog);
      },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          //let urlID = url;
          return setUrlID(url);
        });
        console.log("progress: " + progress);
        //console.log("getDownloadURL.url: "+getDownloadURL.url);
      }
    );
  };

  const stepBtnStyle = {
    color: "#ffffff",
    backgroundColor: "#7BBFBA",
    border: "none",
    borderRadius: "30px",
    fontSize: "16px",
    width: "120px",
    textAlign: "center",
    height: "35px",
    fontWeight: "bold",
    margin: "35px auto 35px auto",
    marginBottom: "20px",
  };

  return (
    <div style={{ marginBottom: "50px" }}>
      <Navbar />
      <div style={{marginTop: "-80px"}}>
        <TitleSec name="上傳公開資料" color="#7BBFBA" />
      </div>
      <Container style={{ marginBottom: "15px" }}>
        
        <Stepper alternativeLabel>

          <Step key={2}>
            <StepLabel>上傳檔案</StepLabel>
          </Step>
          <Step key={3}>
            <StepLabel>完成</StepLabel>
          </Step>

        </Stepper>
      </Container>
      <TitleStep color="#069A8E" name="STEP1 - 上傳檔案" />
      <br />
      <Container>
        <div style={{ textAlign: "center" }}>
          <Row>
            <Col>
              <Card style={{ width: "70%", marginLeft: "15%" }}>
                <form onSubmit={formHandler}>
                  <FormControl
                    style={{ margin: "35px auto 0% auto", width: "80%" }}
                    type="file"
                    accept=".pdf"
                  />
                  <button style={stepBtnStyle} type="submit">
                    上傳&nbsp;
                    <FontAwesomeIcon icon={faCloudArrowUp} />
                  </button>
                  <ProgressBar
                    style={{ margin: "0px auto 0% auto", width: "80%" }}
                    now={progress}
                    label={`${progress}%`}
                  />
                </form>
                <div style={{ margin: "25px" }}>

                  {/* <p style={{ lineHeight: "25px" }}>

                    ※檔案格式：以照片上傳，需PDF檔案上傳。

                  </p> */}
                  <p style={{ lineHeight: "25px" }}>

                    ※注意事項：若顯示
                    <span style={{ color: "#069A8E", fontWeight: "bold" }}>
                      {" "}
                      " 100 % "{" "}
                    </span>
                    ，代表上傳成功，請按"完成"。

                  </p>

                  {progress === 100 && (
                    <Link
                      to="/UploadOpenDataSuccess"
                      //state={{ fromID: uuid, fromURL: urlID }}
                    >
                      <button
                        style={{
                          color: "#ffffff",
                          backgroundColor: "#069A8E",
                          borderRadius: "30px",
                          lineHeight: "30px",
                          fontSize: "16px",
                          width: "120px",
                          textAlign: "center",
                          height: "35px",
                          fontWeight: "bold",
                          border: "none",
                          margin: "30px auto 10px auto"
                        }}
                      >
                        完成
                      </button>
                    </Link>

                  )}

                </div>
              </Card>
            </Col>
            <div>
            </div>

          </Row>
        </div>
      </Container>
    </div>
  );
}

export default UploadOpenData;
