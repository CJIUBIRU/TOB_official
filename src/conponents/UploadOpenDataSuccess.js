import React from "react";
import "../App.css";
import Card from "react-bootstrap/Card";

import Navbar from "../elements/navbarAdmin";
import TitleSec from "../elements/titleSec";
import { Row, Col } from "react-bootstrap";
import Button from "../elements/button";

import SuccessInfo from "../elements/successInfo";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router";
import { Container } from "react-bootstrap";

import Step from '@mui/material/Step';
import Stepper from '@mui/material/Stepper';
import StepLabel from '@mui/material/StepLabel';

function UploadSuccess() {
    const navigate = useNavigate("");
    const [user] = useAuthState(auth);
    if (!user) {
        navigate("/signIn");
    }


    const btnStyle = {
        position: "absolute",
        marginTop: "80px",
        left: "50%",
        transform: `translate(${-50}%, ${-50}%)`,
        paddingTop: "5px",
        paddingBottom: "5px",
        paddingLeft: "15px",
        paddingRight: "15px",
        borderRadius: "10px",
        letterSpacing: "1px",
        display: "flex",
        flexDirection: "row",

    };
    return (
        <div>
            <Navbar />
            <div style={{ marginTop: "-80px" }}>
                <TitleSec name="上傳公開資料" color="#7BBFBA" />
            </div>
            <Container activeStep={3} style={{ marginBottom: "15px" }}>

                <Stepper alternativeLabel>

                    <Step key={2}>
                        <StepLabel>上傳檔案</StepLabel>
                    </Step>
                    <Step key={3}>
                        <StepLabel>完成</StepLabel>
                    </Step>

                </Stepper>
            </Container>
            <Container>
                <div style={{ textAlign: "center" }}>
                    <Row>
                        <Col>
                            <Card style={{ display: "inline-block", padding: "20px 20px 20px 20px", marginLeft: "auto" }}>
                                <Card.Body>
                                    <SuccessInfo
                                        name="檔案已上傳成功！"
                                        name2="（點擊下方按鈕可繼續上傳檔案。）"
                                    />
                                    <div style={btnStyle}>
                                        {/* <Button color="#069A8E" to="/uploadGoods" name="繼續上架" />
                                        &nbsp; */}
                                        <Button color="#069A8E" to="/uploadOpenData" name="繼續上傳" />
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </Container>
        </div>
    );
}

export default UploadSuccess;
