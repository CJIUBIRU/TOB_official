import React, { useState, useEffect } from "react";
import "../App.css";
import Card from "react-bootstrap/Card";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import Navbar from "../elements/navbarAdmin";
import Table from "react-bootstrap/Table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudDownload } from "@fortawesome/free-solid-svg-icons";

import TitleSec from "../elements/titleSec";
import Button from "../elements/button";

import { collection, query, onSnapshot, where } from "firebase/firestore";
import { db } from "../utils/firebase";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router";


import { Container } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";

function OrgData({
  name,
  status,
  mail,
  demandPurpose,
  authority,
  managerName,
  managerPhone,
  registAdd,
  contactAdd,
  affidavit,
  permit,
  certificate,
}) {
  const btnStyle = {
    position: "absolute",
    marginTop: "40px",
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
    lineHeight: "100px",
  };
 
   const prove = {
    backgroundColor: "#26aa99",
    display: "inline-block",
    fontSize: "12px",
    padding: "3px",
    letterSpacing: "1px",
    fontWeight: "550",
    borderRadius: "5px",
    color: "white",
  };
  const prove2 = {
    backgroundColor: "#f6c23e",
    display: "inline-block",
    fontSize: "12px",
    padding: "3px",
    letterSpacing: "1px",
    fontWeight: "550",
    borderRadius: "5px",
  };
  const prove3 = {
    backgroundColor: "#e74a3b",
    display: "inline-block",
    fontSize: "12px",
    padding: "3px",
    letterSpacing: "1px",
    fontWeight: "550",
    borderRadius: "5px",
    color: "white",
  };
  const titleStyle = {
    width: "40%",
    fontWeight: "800",
    
    // color: "#069A8E",
  }
  return (
    <div>
      <Container>
        <div>
          <Row>
            <Col>
              <Card.Body>
                <h4 style={h4Style}>一、公益團體基本資料</h4>

                <Table striped bordered hover responsive style={{ textAlign: "center" }}>
                  <tbody>
                    <tr>
                      <td style={titleStyle}>募捐需求物資團體全銜</td>
                      <td>{name}</td>
                    </tr>
                    <tr>
                      <td style={titleStyle}>審核狀態</td>
                      <td>
                        {status === "已啟用" && (

                          <span style={prove}>{status}</span>

                        )}
                        {status === "待啟用" && (

                          <span style={prove2}>{status}</span>

                        )}
                        {status === "待審核" && (

                          <span style={prove3}>{status}</span>

                        )}
                      </td>
                    </tr>
                    <tr>
                      <td style={titleStyle}>登記地址</td>
                      <td>{registAdd}</td>
                    </tr>
                    <tr>
                      <td style={titleStyle}>聯絡地址</td>
                      <td>{contactAdd}</td>
                    </tr>
                    <tr>
                      <td style={titleStyle}>負責人姓名</td>
                      <td>{managerName}</td>
                    </tr>
                    <tr>
                      <td style={titleStyle}>負責人聯絡電話</td>
                      <td>{managerPhone}</td>
                    </tr>
                    <tr>
                      <td style={titleStyle}>機構電子信箱</td>
                      <td>{mail}</td>
                    </tr>
                    <tr>
                      <td style={titleStyle}>現行主管機關</td>
                      <td>{authority}</td>
                    </tr>
                    <tr>
                      <td style={titleStyle}>募捐需求物資目的</td>
                      <td>{demandPurpose}</td>
                    </tr>
                  </tbody>
                </Table>


                <h4 style={h4Style}>二、審核資料</h4>
                <ol style={{ lineHeight: "45px", paddingLeft: "50px" }}>
                  <li>
                    <span style={{ color: "#90AACB", cursor: "pointer" }}>
                      <a
                        href={certificate}
                        target="_blank"
                        rel="noreferrer"
                        style={{ color: "#90AACB" }}
                      >
                        法人登記書
                      </a>
                      &nbsp;
                      <FontAwesomeIcon icon={faCloudDownload} />
                    </span>
                  </li>
                  <li>
                    <span style={{ color: "#90AACB", cursor: "pointer" }}>
                      <a
                        href={affidavit}
                        target="_blank"
                        rel="noreferrer"
                        style={{ color: "#90AACB" }}
                      >
                        切結書
                      </a>
                      &nbsp;
                      <FontAwesomeIcon icon={faCloudDownload} />
                    </span>
                  </li>
                  <li>
                    <span style={{ color: "#90AACB", cursor: "pointer" }}>
                      <a
                        href={permit}
                        target="_blank"
                        rel="noreferrer"
                        style={{ color: "#90AACB" }}
                      >
                        政府勸募許可函
                      </a>
                      &nbsp;
                      <FontAwesomeIcon icon={faCloudDownload} />
                    </span>
                  </li>
                </ol>
                <div style={btnStyle}>
                  <Button color="#069A8E" to="/managerProve" name="返回" />
                </div>
              </Card.Body>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
}

function ManagerProveData() {
  const navigate = useNavigate("");
  const [user] = useAuthState(auth);
  if (!user) {
    navigate("/signIn");
  }
  const [details, setDetails] = useState([]);

  useEffect(() => {
    let org = JSON.parse(localStorage.getItem("orgData"));
    const q = query(
      collection(db, "charity"),
      where("info.name", "==", org.name)
    );
    onSnapshot(q, (querySnapshot) => {
      setDetails(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);

  const cardStyle = {
    width: "90%",
    color: "black",
    left: "50%",
    marginTop: "100px",
    transform: `translate(${-50}%, ${-5}%)`,
    paddingTop: "10px",
    paddingBottom: "100px",
    paddingLeft: "5%",
    paddingRight: "5%",
    letterSpacing: "1px",

  };

  return (
    <div>
      <Navbar />
      <div style={{marginTop: "-80px"}}>
      <TitleSec name="公益單位申請-資料內容" color="#7BBFBA" />
      </div>
      <Card style={cardStyle}>
        {details.map((item, index) => (
          <OrgData
            key={index}
            id={item.id}
            name={item.data.info.name}
            status={item.data.info.status}
            mail={item.data.info.mail}
            demandPurpose={item.data.info.details.demandPurpose}
            authority={item.data.info.details.authority}
            managerName={item.data.info.manager.name}
            managerPhone={item.data.info.manager.phone}
            registAdd={item.data.info.registAddress}
            contactAdd={item.data.info.contactAddress}
            affidavit={item.data.file.doc.affidavit}
            permit={item.data.file.doc.permit}
            certificate={item.data.file.doc.certificate}
          />
        ))}
      </Card>
    </div>
  );
}

export default ManagerProveData;
