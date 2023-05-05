import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import Card from "react-bootstrap/Card";
import Navbar from "../elements/navbar";

import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import TitleSec from "../elements/titleSec";
import TitleStep from "../elements/titleStep";

//檔案上傳
import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage";
import { useState } from "react";

import { storage } from "../utils/firebase";

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCloudDownload } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from "react-router";
import ProgressBar from "react-bootstrap/ProgressBar";
import NavbarHome from "../elements/navbarHome";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { Container } from "react-bootstrap";
import { Col, Row } from "react-bootstrap";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../utils/firebase";
import Step from '@mui/material/Step';
import Stepper from '@mui/material/Stepper';
import StepLabel from '@mui/material/StepLabel';


function SetPhoto() {
    const location = useLocation();
    const { fromURL1 } = location.state;
    //   fromID,
    //   console.log(fromID);
    console.log(fromURL1);
    const [user] = useAuthState(auth);
    
    let CharityID = JSON.parse(localStorage.getItem("CharityID"));
    //   fromID
    const taskDocRef = doc(db, "charity", CharityID);



    const cardStyle = {
        width: "75%",
        color: "black",
        left: "50%",
        marginTop: "150px",
        transform: `translate(${-50}%, ${-20}%)`,
        paddingTop: "1%",
        paddingLeft: "5%",
        paddingRight: "5%",
        letterSpacing: "1px",
    };

    const btnStyle = {
        position: "absolute",
        left: "50%",
        transform: `translate(${-50}%, ${-50}%)`,
        paddingTop: "5px",
        paddingBottom: "5px",
        paddingLeft: "15px",
        paddingRight: "15px",
        borderRadius: "10px",
        letterSpacing: "1px",
    };
    const h4Style = {
        fontWeight: "bold",
        lineHeight: "80px",
    };
    const pStyle = {
        lineHeight: "25px",
    };

    const inputStyle = {
        marginLeft: "5%",
        marginRight: "5%",
    };
    const uploadBtn = {
        color: "#ffffff",
        backgroundColor: "#F4D19B",
        borderRadius: "30px",
        fontSize: "16px",
        width: "120px",
        textAlign: "center",
        height: "35px",
        fontWeight: "bold",
        margin: "35px auto 10px auto",
        border: "none"
    };

    const [progress, setProgress] = useState(0);
    const [urlID2, setUrlID2] = useState("");
    console.log("urlID2: " + urlID2);

    const formHandler = async (e) => {
        e.preventDefault();
        const file = e.target[0].files[0];
        uploadFiles(file);

        try {
            await updateDoc(taskDocRef, {
                "file.img.logo": fromURL1,
            });
            //console.log('end');
            //navigate("/uploadGoodsSuccess");
        } catch (err) {
            console.log(err);
        }
    };

    const uploadFiles = (file) => {
        if (!file) return;
        const storageRef = ref(storage, `/Photo/${file.name}`);
        const UploadTask = uploadBytesResumable(storageRef, file);

        UploadTask.on(
            "state_changed",
            (snapshot) => {
                const prog = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(prog);
            },
            (err) => console.log(err),
            () => {
                getDownloadURL(UploadTask.snapshot.ref).then((url) => {
                    //let urlID = url;
                    return setUrlID2(url);
                });
            }
        );
    };
    return (
        <div style={{ paddingBottom: "80px" }}>
            {user && <Navbar />}
            {!user && <NavbarHome />}
            <TitleSec name="公益團體申請資料上傳" color="#F4D19B" />
            <Container>
                <Stepper activeStep={3} alternativeLabel style={{ margin: "50px" }}>

                    <Step key={2}>
                        <StepLabel>輸入電子郵件</StepLabel>
                    </Step>
                    <Step key={3}>
                        <StepLabel>設定密碼</StepLabel>
                    </Step>
                    <Step key={4}>
                        <StepLabel>上傳機構Logo</StepLabel>
                    </Step>
                    <Step key={5}>
                        <StepLabel>上傳機構圖片</StepLabel>
                    </Step>
                    <Step key={6}>
                        <StepLabel>填寫機構簡介</StepLabel>
                    </Step>
                    <Step key={7}>
                        <StepLabel>完成</StepLabel>
                    </Step>

                </Stepper>
            </Container>
            <TitleStep color="#F58D59" name="STEP4&nbsp;-&nbsp;上傳機構圖片" />
            <Card style={cardStyle}>
                <Card.Body>
                    <h4 style={h4Style}>四、上傳機構圖片</h4>
                    <br></br>

                    <div style={inputStyle}>
                        <Form.Group controlId="formFile" className="mb-3">
                            <div>
                                <form onSubmit={formHandler}>
                                    <span style={{ display: "inline-block", width: "100%" }}>
                                        <Form.Control type="file" className="input" accept=".png, .jpeg" />
                                        {/* <input type="file" accept=".pdf, .png" /> */}
                                    </span>
                                    <br></br>
                                    <div style={{ textAlign: "center" }}>
                                        <button style={uploadBtn} type="submit">
                                            上傳&nbsp;&nbsp;
                                            <FontAwesomeIcon icon={faCloudArrowUp} />
                                        </button>
                                    </div>
                                </form>
                                {/* <hr></hr> */}
                                {/* <h5 style={h5Style}>上傳進度：　{progress} %</h5> */}
                                <ProgressBar
                                    style={{ margin: "40px 0px 30px 0px", width: "100%" }}
                                    now={progress}
                                    label={`${progress}%`}
                                />
                            </div>
                        </Form.Group>
                    </div>
                    <br></br>
                    <ul>
                        
                        <p style={pStyle}>
                            <li>
                                注意事項：若顯示
                                <span style={{ color: "#F58D59", fontWeight: "bold" }}>
                                    {" "}
                                    " 100 % "{" "}
                                </span>
                                ，代表上傳成功，請按"下一步"。
                            </li>
                        </p>
                    </ul>
                    <br></br>
                </Card.Body>
            </Card>
            <div style={btnStyle}>
                {progress === 100 && (
                    <Link
                        to="/CharityInfo"
                        state={{ fromURL2: urlID2 }}
                    >
                        {/* fromID: fromID,  */}
                        <button
                            style={{
                                color: "#ffffff",
                                backgroundColor: "#F58D59",
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
                    </Link>
                )}
                {progress !== 100 && (
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
                        }}
                    >
                        下一步
                    </button>
                )}
            </div>
        </div>
    );
}

export default SetPhoto;
