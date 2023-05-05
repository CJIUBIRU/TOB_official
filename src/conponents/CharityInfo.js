import React, { useState } from "react";
// import "../App.css";
//引入資料庫
import { db, auth } from "../utils/firebase";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import Card from "react-bootstrap/Card";

import TitleSec from "../elements/titleSec";
import TitleStep from "../elements/titleStep";
import { doc, updateDoc } from "firebase/firestore";

import { useNavigate, useLocation } from "react-router";
import Navbar from "../elements/navbar";
import NavbarHome from "../elements/navbarHome";

import { Container, Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import ProgressBar from "react-bootstrap/ProgressBar";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Step from '@mui/material/Step';
import Stepper from '@mui/material/Stepper';
import StepLabel from '@mui/material/StepLabel';
import { useAuthState } from "react-firebase-hooks/auth";

function CharityInfo() {
  const navigate = useNavigate("");
  const [user] = useAuthState(auth);

  const location = useLocation();
  const { fromURL2 } = location.state;
  let CharityID = JSON.parse(localStorage.getItem("CharityID"));

  console.log(fromURL2);
  const cardStyle = {
    width: "80%",
    color: "black",
    left: "50%",
    marginTop: "130px",
    transform: `translate(${-50}%, ${-10}%)`,
    paddingTop: "25px",
    paddingBottom: "8px",
    paddingLeft: "8%",
    paddingRight: "8%",
    letterSpacing: "1px",
  };
  const h4Style = {
    fontWeight: "550",
    marginTop: "30px",
  };
  const infoStyle = {
    marginBottom: "8%",
    margingLeft: "5%",
    marginRight: "5%",
    marginTop: "5%",
    /* color: #6C6C6C; */
  };
  const changeBtn = {
    color: "#ffffff",
    backgroundColor: "#F58D59",
    borderRadius: "30px",
    fontSize: "16px",
    width: "120px",
    textAlign: "center",
    height: "35px",
    fontWeight: "bold",
    border: "none",
  };
  const inputStyle = {
    marginLeft: "0px",
    marginRight: "0px",
  };
  const textareaStyle = {
    marginLeft: "5%",
    marginRight: "5%",
  };
  const nameStyle = {
    lineHeight: "40px",
    marginRight: "10px",
  };
  const labelStyle = {
    height: "40px",
    borderRadius: "5px",
  };




  const [charityFundraisingNo, setCharityFundraisingNo] = useState("");
  const [charityTel, setCharityTel] = useState("");
  const [charityCategory, setCharityCategory] = useState("");
  const [charityConcept, setCharityConcept] = useState("");
  const [charityIntro, setCharityIntro] = useState("");
  // console.log(charityCategory);

  const handleUpdate = async (e) => {
    e.preventDefault();
    //mail接值之後要修
    const taskDocRef = doc(db, "charity", CharityID);

    // console.log(taskDocRef._key.id);
    // console.log(taskDocRef);

    try {
      console.log("start");
      await updateDoc(taskDocRef, {
        "file.img.photo": fromURL2,
        "info.status": "已啟用",
        "info.fundraisingNo": charityFundraisingNo,
        "info.tel": charityTel,
        "info.details.category": charityCategory,
        "info.details.concept": charityConcept,
        "info.details.intro": charityIntro,
      });
      //console.log('end');
      navigate("/charityInfoSuccess");
      localStorage.removeItem("CharityID");
      localStorage.removeItem("CharityMail");
    } catch (err) {
      //console.log(err);
      // alert("資料更新有誤：", err)
    }
  };

  return (
    <div>
      {user && <Navbar />}
      {!user && <NavbarHome />}
      <TitleSec name="基本資料設定" color="#F4D19B" />

      <form className="form">
        <Container style={{ marginBottom: "50px" }}>
          <Stepper activeStep={4} alternativeLabel style={{ margin: "50px" }}>

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
        <TitleStep name="STEP5&nbsp;-&nbsp;填寫機構簡介" />
        <Card style={cardStyle}>
          <Card.Body>
            <div>
              <div style={infoStyle}>

                <h4 style={h4Style}>二、機構基本資料</h4>
                <br></br>
                <div style={inputStyle}>
                  <div>
                    <InputGroup className="mb-3">
                      <InputGroup.Text id="basic-addon1">勸募許可文號</InputGroup.Text>
                      <Form.Control
                        placeholder="請輸入文字"
                        required
                        value={charityFundraisingNo}
                        onChange={(e) =>
                          setCharityFundraisingNo(e.target.value)
                        }
                      />
                    </InputGroup>
                    <br></br>
                    <InputGroup className="mb-3">
                      <InputGroup.Text id="basic-addon1">機構聯絡電話</InputGroup.Text>
                      <Form.Control
                        placeholder="請輸入文字"
                        value={charityTel}
                        onChange={(e) => setCharityTel(e.target.value)}
                      />
                    </InputGroup>
                    <br></br>
                    <InputGroup className="mb-3">
                      <InputGroup.Text id="basic-addon1">機構類別</InputGroup.Text>
                      <Form.Select
                        placeholder="請選擇"
                        style={labelStyle}
                        value={charityCategory}
                        required
                        onChange={(e) => setCharityCategory(e.target.value)}
                      >
                        <option value="">請選擇</option>
                        <option value="綜合性服務">綜合性服務</option>
                        <option value="兒童青少年福利">兒童青少年福利</option>
                        <option value="婦女福利">婦女福利</option>
                        <option value="老人福利">老人福利</option>
                        <option value="身心障礙福利">身心障礙福利</option>
                        <option value="家庭福利">家庭福利</option>
                        <option value="健康醫療">健康醫療</option>
                        <option value="心理衛生">心理衛生</option>
                        <option value="社區規劃">社區規劃</option>
                        <option value="環境保護">環境保護</option>
                        <option value="國際合作交流">國際合作交流</option>
                        <option value="教育與科學">教育與科學</option>
                        <option value="文化藝術">文化藝術</option>
                        <option value="人權和平">人權和平</option>
                        <option value="消費者紀錄">消費者紀錄</option>
                        <option value="性別平等">性別平等</option>
                        <option value="政府單位">政府單位</option>
                        <option value="動物保護">動物保護</option>
                      </Form.Select>
                    </InputGroup>
                    <br></br>
                    <InputGroup>
                      <InputGroup.Text>機構宗旨</InputGroup.Text>
                      <Form.Control
                        as="textarea"
                        placeholder="請輸入文字"
                        value={charityConcept}
                        onChange={(e) => setCharityConcept(e.target.value)} />
                    </InputGroup>

                    <br></br>
                    <InputGroup>
                      <InputGroup.Text>機構簡介</InputGroup.Text>
                      <Form.Control
                        as="textarea"
                        placeholder="請輸入文字"
                        value={charityIntro}
                        onChange={(e) => setCharityIntro(e.target.value)} />
                    </InputGroup>






                  </div>
                </div>

                {/* <Button type='submit' style={changeBtn}>Submit</Button> */}

                <div>
                  {/* <ButtonLink to="/charityInfoSuccess" name="確定上傳" /> */}
                  <br></br>
                  <center>
                    <input
                      style={changeBtn}
                      type="submit"
                      onClick={handleUpdate}
                      value="確定上傳"
                    />
                  </center>
                </div>
              </div>
            </div>
          </Card.Body>
        </Card>
      </form>
    </div>
  );
}

export default CharityInfo;
