import React, { useState, useEffect } from "react";
import "../App.css";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faEye } from "@fortawesome/free-solid-svg-icons";
import Navbar from "../elements/navbar";
import TitleSec from "../elements/titleSec";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router";
import { Container } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";

function CharityProveList({ id, num, name, time, status, mail }) {
  // ManagerProveMail
  const mailProve = (item) => {
    localStorage.setItem("proveOrg", JSON.stringify(item));
  };

  // ManagerProveData
  const proveData = (item) => {
    localStorage.setItem("orgData", JSON.stringify(item));
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
  const iconStyle = {
    paddingTop: "3px",
    paddingBottom: "3px",
    paddingLeft: "6px",
    paddingRight: "6px",
    fontSize: "13px",
  };

  return (
    <tr>
      <th scope="row" data-th = "#" >{num}</th>
      <td data-th = "機構名稱" >{name}</td>
      <td data-th = "上傳日期" >{time}</td>
      <td data-th = "審核狀態" >
      {status === "已啟用" && (
        
          <p style={prove}>{status}</p>
     
      )}
      {status === "待啟用" && (
       
          <p style={prove2}>{status}</p>
      
      )}
      {status === "待審核" && (
        
          <p style={prove3}>{status}</p>
        
      )}
      </td>
      <td data-th = "其他" >
        <Button
          as={Link}
          to="/managerProveData"
          onClick={(e) => proveData({ name: name })}
          style={iconStyle}
          variant="success"
        >
          <FontAwesomeIcon icon={faEye} />
        </Button>
      &nbsp;
        {status === "待審核" ? (
          <Button
            as={Link}
            onClick={(e) => mailProve({ name: name, mail: mail, id: id })}
            to="/managerProveMail"
            style={iconStyle}
            variant="primary"
          >
            <FontAwesomeIcon icon={faEnvelope} />
          </Button>
        ) : (
          ""
        )}
      </td>
    </tr>
  );
}

function ManagerProve() {
  const navigate = useNavigate("");
  const [user] = useAuthState(auth);
  if (!user) {
    navigate("/signIn");
  }
  const [details, setDetails] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "charity"), orderBy("file.time", "asc"));
    onSnapshot(q, (querySnapshot) => {
      setDetails(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);

  // const cardStyle = {
  //   width: "90%",
  //   color: "black",
  //   left: "50%",
  //   marginTop: "65px",
  //   transform: `translate(${-50}%, ${-5}%)`,
  //   paddingTop: "10px",
  //   paddingBottom: "10px",
  //   paddingLeft: "10px",
  //   paddingRight: "10px",
  //   letterSpacing: "1px",
  // };

  return (
    <div>
      <Container>
        <div style={{ textAlign: "center" }}>
          <Row>
            <Col>
              <Card className="proveData" >
                <Card.Body>
                  <Table  striped bordered hover responsive className="table-rwd">
                    <thead>
                      <tr class="tr-only-hide">
                        <th scope="col">#</th>
                        <th scope="col">機構名稱</th>
                        <th scope="col">上傳日期</th>
                        <th scope="col">審核狀態</th>
                        <th scope="col">其他</th>
                      </tr>
                    </thead>
                    <tbody>
                      {details.map((item, index) => (
                        <CharityProveList
                          key={index}
                          id={item.id}
                          num={index + 1}
                          name={item.data.info.name}
                          status={item.data.info.status}
                          mail={item.data.info.mail}
                          time={new Date(
                            item.data.file.time.seconds * 1000
                          ).toLocaleDateString("zh-TW")}
                        />
                      ))}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
}

export default ManagerProve;
