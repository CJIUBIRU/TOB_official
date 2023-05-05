import React, { useState } from "react";
import { auth } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import NavbarCharity from "../elements/navbarCharity";
import NavbarHome from "../elements/navbarHome";
import TitleSec from "../elements/titleSec";
import { Card, Container, FormControl } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { Row, Col } from "react-bootstrap";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { doc, setDoc } from "firebase/firestore";
import { db, storage } from "../utils/firebase";
import ProgressBar from "react-bootstrap/ProgressBar";
import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Step from "@mui/material/Step";
import Stepper from "@mui/material/Stepper";
import StepLabel from "@mui/material/StepLabel";

function Gain() {
  const [uuid, setUuid] = useState(uuidv4());
  const navigate = useNavigate("");
  const [user] = useAuthState(auth);
  if (!user) {
    navigate("/signIn");
  }
  const stepBtnStyle = {
    color: "#ffffff",
    backgroundColor: "#90AACB",
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

  const [progress, setProgress] = useState(0);
  const [urlID, setUrlID] = useState("");

  console.log(urlID);
  const formHandler = async (e) => {
    e.preventDefault();
    const file = e.target[0].files[0];
    uploadFiles(file);
    console.log(file.name);

    e.preventDefault();
    try {
      // await setDoc(doc(db, "goodsDemand", user.uid), {
      await setDoc(doc(db, "gains", user.uid), {
        uid: user.uid,
        text: "",
        pic: "",
      });
      //navigate("/uploadGoodsSuccess");
      //alert("物資上架成功。");
    } catch (err) {
      console.log(err);
    }
  };
  const uploadFiles = (file) => {
    if (!file) return;
    // setUuid(uuidv4());
    const storageRef = ref(storage, `/Gains/${file.name}`);
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

  return (
    <div>
      {user && <NavbarCharity />}
      {!user && <NavbarHome />}
      <div style={{marginTop: "-80px"}}>
      <TitleSec name="愛心回饋" color="#90AACB" />
      </div>
      <Container>
        {/* <div style={{ textAlign: "center" }}>
          <p
            style={{
              backgroundColor: "#FFD2D2",
              textAlign: "center",
              // width: "300px",
              color: "#e74a3b",
              fontWeight: "bold",
              letterSpacing: "2px",
            }}
          >
            <FontAwesomeIcon
              style={{ marginRight: "5px" }}
              icon={faTriangleExclamation}
            />
            您尚有物資需求未回覆愛心回饋！（您的回覆能讓捐捐不息的愛心長流❤）
          </p>
        </div> */}

        <Stepper alternativeLabel style={{ margin: "30px 0px 30px 0px" }}>
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

        <div style={{ display: "grid", gridTemplateColumns: "10% 80% 10%" }}>
          <div></div>
          <Card>
            <div>
              <form onSubmit={formHandler}>
                <FormControl
                  style={{ margin: "35px auto 0% auto", width: "80%" }}
                  type="file"
                  accept=".jpg, .png, .jpeg"
                />
                <center>
                  <button
                    style={stepBtnStyle}
                    type="submit"
                  >
                    上傳&nbsp;
                    <FontAwesomeIcon icon={faCloudArrowUp} />
                  </button>
                </center>
                <ProgressBar
                  style={{ margin: "0px auto 0% auto", width: "80%" }}
                  now={progress}
                  label={`${progress}%`}
                />
              </form>
              <div style={{ margin: "25px" }}>
                <ul>
                  <p style={{ lineHeight: "25px" }}>
                    <li>
                      檔案格式：以照片上傳，需保證照片清晰、色調正常，JPG檔、PNG檔均可。
                    </li>
                  </p>
                  <p style={{ lineHeight: "25px" }}>
                    <li>
                      注意事項：若顯示
                      <span style={{ color: "#002b5b", fontWeight: "bold" }}>
                        {" "}
                        " 100 % "{" "}
                      </span>
                      ，代表上傳成功，請按"下一步"。
                    </li>
                  </p>
                </ul>
              </div>
            </div>
          </Card>
          <div></div>
        </div>
        <div
          style={{
            marginTop: "60px",
            width: "auto",
            marginBottom: "50px",
          }}
        >
          {progress === 100 && (
            <center><Link to="/responseSec" state={{ fromID: uuid, fromURL: urlID }}>
              
                <button
                  style={{
                    color: "#ffffff",
                    backgroundColor: "#002b5b",
                    borderRadius: "30px",
                    lineHeight: "30px",
                    fontSize: "16px",
                    width: "120px",
                    textAlign: "center",
                    height: "35px",
                    fontWeight: "bold",
                    border: "none",
                  }}
                >
                  下一步
                </button>
              
            </Link></center>
          )}
          {progress !== 100 && (
            <center><Link
              to="/UploadGoodsSec"
              state={{ fromID: uuid, fromURL: getDownloadURL.URL }}
            >
              
                <button
                  style={{
                    color: "#ffffff",
                    backgroundColor: "lightgray",
                    borderRadius: "30px",
                    lineHeight: "30px",
                    fontSize: "16px",
                    width: "120px",
                    textAlign: "center",
                    height: "35px",
                    fontWeight: "bold",
                    border: "none",
                    marginBottom: "50px",
                  }}
                >
                  下一步
                </button>
              
            </Link></center>
          )}
        </div>
      </Container>
    </div>
  );
}

export default Gain;
