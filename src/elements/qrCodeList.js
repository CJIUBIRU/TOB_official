/* eslint-disable react/jsx-pascal-case */
import React, { useState, useEffect } from "react";
import { faQrcode } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate, Link } from "react-router-dom";
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";
import { Container, Nav } from "react-bootstrap";
import TitleSec from "../elements/titleSec";
import Navbar from "../elements/navbar";
import Modal from "react-bootstrap/Modal";
import { faEye } from "@fortawesome/free-solid-svg-icons";

import Qrcode_pic from "../elements/qrcode_pic";
function Task({
  QRcodeDate,
  QRcodeId,
  charityName,
  exchangeGoodsData,
  status,
  storeName,
  uid,
}) {
  // QRcodeDetailData
  const qrcodeData = (item) => {
    localStorage.setItem("orgData", JSON.stringify(item));
  };
  const [user] = useAuthState(auth);
  console.log(exchangeGoodsData);

  const contentStyle = {
    textAlign: "left",
    marginLeft: "0px",
    letterSpacing: "2px",
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

  const giftIconStyle = {
    backgroundColor: "#002B5B",
    height: "40px",
    marginLeft: "10px",
    width: "40px",
    fontSize: "17px",
    borderRadius: "50%",
    textAlign: "center",
    color: "white",
    lineHeight: "38px",
    border: "none",
    // marginTop: "100px"
  };
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div>
      {user.uid === uid && (
        <Container>
          <div style={{ display: "flex", flexDirection: "row", marginBottom: "20px" }}>

            <Card
              style={{
                padding: "30px 5px 30px 0px",
                color: "#002B5B",
                width: "100%",
                
              }}
            >

              <Card.Body style={contentStyle}>
                <div className="grid_qrcode">
                  <div>
                    <center><Nav.Link style={{ textAlign: "center", paddingTop: "15px" }} onClick={handleShow}>
                      <FontAwesomeIcon
                        icon={faQrcode}
                        className="qrIconGrid"
                        style={{ marginBottom: "15px" }}
                      />
                      <br />
                      <p><b
                        style={{
                          fontSize: "18px",
                          
                        }}
                      >
                        查看兌換條碼
                      </b></p>
                      <p></p>
                      
                    </Nav.Link></center>
                  </div>
                  <div>
                    <Card.Title className="title_qrcode">
                      <b>{charityName}</b>
                    </Card.Title>
                    <hr style={{ width: "100%" }}></hr>
                    <Card.Text style={{ color: "#6C6C6C" }}>
                      {status === "已領取" && (
                        <td>
                          兌換狀態： <b><p style={prove}>{status}</p></b>
                        </td>
                      )}
                      {status === "未領取" && (
                        <td>
                          兌換狀態：<b><p style={prove2}>{status}</p></b>
                        </td>
                      )}
                      <p>結單日期：<b>{QRcodeDate}</b></p>
                      
                      <p>合作商家：<b>{storeName}</b></p>
                 
                    </Card.Text>
                  </div>

                  <div>
                    <Nav.Link
                      as={Link}
                      to="/allQrcodeData"
                      onClick={(e) => qrcodeData({ QRcodeId: QRcodeId })}
                      style={giftIconStyle}
                    >
                      <FontAwesomeIcon icon={faEye} />
                    </Nav.Link>
                  </div>
                </div>
              </Card.Body>
            </Card>

          </div>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>兌換條碼</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ textAlign: "center" }}>
              <Qrcode_pic QRcodeId={QRcodeId}></Qrcode_pic>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                關閉
              </Button>
              <Button variant="primary" onClick={handleClose}>
                完成
              </Button>
            </Modal.Footer>
          </Modal>
        </Container>
      )}
    </div>
  );
}

function AllQrcode() {
  const [qrcodeDetails, setQrcodeDetails] = useState([]);

  useEffect(() => {
    const qrQuery = query(collection(db, "QRcode"));
    onSnapshot(qrQuery, (querySnapshot) => {
      setQrcodeDetails(
        querySnapshot.docs.map((doc) => ({
          QRcodeId: doc.id,
          ...doc.data(),
        }))
      );
    });
  }, []);
  console.log(qrcodeDetails);
  const [user] = useAuthState(auth);
  const navigate = useNavigate("");
  if (!user) {
    navigate("/signIn");
  }
  return (
    <div>
      {qrcodeDetails.map((item) => (
        <Task
          QRcodeDate={item.QRcodeDate}
          QRcodeId={item.QRcodeId}
          charityName={item.charityName}
          exchangeGoodsData={item.exchangeGoodsData}
          status={item.status}
          storeName={item.storeName}
          uid={item.uid}
        />
      ))}
    </div>
  );
}

export default AllQrcode;
