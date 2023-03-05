//打rcc+ENTER
import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";
import { Button } from "react-bootstrap";
import ScrollToTop from "react-scroll-to-top";
import { db } from "../utils/firebase";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { collection, query, onSnapshot } from "firebase/firestore";
import LogoutAdmin from "./logoutAdmin";
import LogoutCharity from "./logoutCharity";
import LogoutMember from "./logoutMember";

function Task({ id, email, level, name }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [user] = useAuthState(auth);
  return (
    <div>
      <div>
        {email === user.email && level === "member" && (
          <Navbar
            className="nav-bar"
            style={{
              width: "100%",
              height: "70px",
              top: "0",
              position: "fixed",
              display: "flex",
              backgroundColor: "#ffffff",
              zIndex: "1",
              borderBottom: "3px solid #F4D19B",
            }}
            expand="lg"
          >
            <Container>
              <Nav
                className="me-auto"
                style={{
                  height: "70px",
                  fontWeight: "bold",
                  fontSize: "19px",
                  lineHeight: "50px",
                }}
              >
                <Row style={{ textAlign: "center" }}>
                  {email === user.email && level === "member" && (
                    <Col>
                      <Navbar.Brand
                        as={Link}
                        to="/"
                        className="nav-title"
                        style={{
                          height: "70px",
                          color: "#F4D19B",
                          fontSize: "25px",
                          fontWeight: "bold",
                          lineHeight: "65px",
                          marginRight: "500px",
                        }}
                      >
                        捐捐不息&nbsp;Trickle of Benefaction
                      </Navbar.Brand>
                      <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    </Col>
                  )}
                  {email === user.email && level === "member" && (
                    <Col style={{ padding: "0px", width: "250px" }}>
                      <Nav.Link
                        as={Link}
                        to="/charity"
                        href="#action/3.2"
                        style={{ color: "#F58D59", fontSize: "17px" }}
                      >
                        合作機構一覽
                      </Nav.Link>
                    </Col>
                  )}
                  {/* {email === user.email && level === "member" && (
                    <Col style={{ padding: "0px", paddingLeft: "10px" }}>
                      <Nav.Link
                        as={Link}
                        to="/pointsActivity"
                        href="#action/3.2"
                        style={{ color: "#F58D59", fontSize: "17px" }}
                      >
                        點數兌換專區
                      </Nav.Link>
                    </Col>
                  )} */}

                  {email === user.email && level === "member" && (
                    <Col style={{ padding: "0px", paddingLeft: "10px" }}>
                      <LogoutMember />
                    </Col>
                  )}
                  {email === user.email && level === "member" && (
                    <Col style={{ padding: "0px", paddingLeft: "10px" }}>
                      <Nav.Link
                        as={Link}
                        to="/donateList"
                        style={{
                          color: "#ffffff",
                          backgroundColor: "#F58D59",
                          borderRadius: "30px",
                          marginTop: "16px",
                          marginBottom: "20px",
                          // marginLeft: "10px",
                          lineHeight: "16px",
                          fontSize: "16px",
                          width: "100px",
                          textAlign: "center",
                        }}
                      >
                        我要認購
                      </Nav.Link>
                    </Col>
                  )}
                  {/* {email === user.email && level === "member" && (
          <Col style={{ padding: "0px", paddingLeft: "10px" }}>
            <Nav.Link
              style={{
                color: "#ffffff",
                backgroundColor: "#002B5B",
                borderRadius: "30px",
                marginTop: "16px",
                marginBottom: "20px",
                // marginLeft: "10px",
                lineHeight: "16px",
                fontSize: "16px",
                width: "105px",
                textAlign: "center",
              }}
            >
              <FontAwesomeIcon icon={faCartShopping} />&nbsp;捐贈箱
            </Nav.Link>
          </Col>
        )} */}
                </Row>
              </Nav>
            </Container>
          </Navbar>
        )}
        {email === user.email && level === "charity" && (
          <Navbar
            className="nav-bar"
            style={{
              width: "100%",
              height: "70px",
              top: "0",
              position: "fixed",
              display: "flex",
              backgroundColor: "#ffffff",
              zIndex: "1",
              borderBottom: "3px solid #90AACB",
            }}
            expand="lg"
          >
            <Container>
              <Nav
                className="me-auto"
                style={{
                  height: "70px",
                  fontWeight: "bold",
                  fontSize: "19px",
                  lineHeight: "50px",
                }}
              >
                <Row style={{ textAlign: "center" }}>
                  {email === user.email && level === "charity" && (
                    <Col>
                      <Navbar.Brand
                        as={Link}
                        to="/"
                        className="nav-title"
                        style={{
                          height: "70px",
                          color: "#90AACB",
                          fontSize: "25px",
                          fontWeight: "bold",
                          lineHeight: "65px",
                          marginRight: "150px",
                        }}
                      >
                        捐捐不息&nbsp;Trickle of Benefaction
                      </Navbar.Brand>
                      <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    </Col>
                  )}

                  {email === user.email && level === "charity" && (
                    <Col style={{ padding: "0px", width: "250px" }}>
                      <Nav.Link
                        as={Link}
                        to="/response"
                        href="#action/3.2"
                        style={{ color: "#002b5b", fontSize: "17px" }}
                      >
                        愛心回饋
                      </Nav.Link>
                    </Col>
                  )}
                  {email === user.email && level === "charity" && (
                    <Col style={{ padding: "0px", width: "240px" }}>
                      <Nav.Link
                        as={Link}
                        to="/uploadDemand"
                        href="#home"
                        style={{ color: "#002B5B", fontSize: "17px" }}
                      >
                        刊登物資需求
                      </Nav.Link>
                    </Col>
                  )}
                  {email === user.email && level === "charity" && (
                    <Col style={{ padding: "0px" }}>
                      <Nav.Link
                        as={Link}
                        to="/myDemand"
                        href="#home"
                        style={{ color: "#002B5B", fontSize: "17px" }}
                      >
                        我的需求
                      </Nav.Link>
                    </Col>
                  )}
                  {email === user.email && level === "charity" && (
                    <Col style={{ padding: "0px" }}>
                      <Nav.Link
                        as={Link}
                        to="/AllQrcode"
                        href="#home"
                        style={{ color: "#002B5B", fontSize: "17px" }}
                      >
                        我的兌換條碼
                      </Nav.Link>
                    </Col>
                  )}
                  {/* {email === user.email && level === "charity" && (
          <Col
            style={{ padding: "0px", textAlign: "left", paddingRight: "15px" }}
          >
            <Nav.Link
              as={Link}
              to="/setPassword"
              href="#home"
              style={{ color: "#002B5B", fontSize: "17px" }}
            >
              初步設定密碼
            </Nav.Link>
          </Col>
        )} */}

                  {email === user.email && level === "charity" && (
                    <Col
                      style={{
                        padding: "0px",
                        textAlign: "center",
                        paddingRight: "15px",
                      }}
                    >
                      <LogoutCharity />
                    </Col>
                  )}
                  {email === user.email && level === "charity" && (
                    <Col style={{ padding: "0px", paddingLeft: "10px" }}>
                      <Nav.Link
                        as={Link}
                        to="/exchangeGoods"
                        style={{
                          color: "#ffffff",
                          backgroundColor: "#002B5B",
                          borderRadius: "30px",
                          marginTop: "16px",
                          marginBottom: "20px",
                          // marginLeft: "10px",
                          lineHeight: "16px",
                          fontSize: "16px",
                          width: "100px",
                          textAlign: "center",
                        }}
                      >
                        我要兌換
                      </Nav.Link>
                    </Col>
                  )}
                </Row>
              </Nav>
            </Container>
          </Navbar>
        )}
        {email === user.email && level === "admin" && (
          <Navbar
            className="nav-bar"
            style={{
              width: "100%",
              height: "70px",
              top: "0",
              position: "fixed",
              display: "flex",
              backgroundColor: "#ffffff",
              zIndex: "1",
              borderBottom: "3px solid #7BBFBA",
            }}
            expand="lg"
          >
            <Container>
              <Nav
                className="me-auto"
                style={{
                  height: "70px",
                  fontWeight: "bold",
                  fontSize: "19px",
                  lineHeight: "50px",
                }}
              >
                <Row style={{ textAlign: "center" }}>
                  {email === user.email && level === "admin" && (
                    <Col>
                      <Navbar.Brand
                        as={Link}
                        to="/"
                        className="nav-title"
                        style={{
                          height: "70px",
                          color: "#7BBFBA",
                          fontSize: "25px",
                          fontWeight: "bold",
                          lineHeight: "65px",
                          marginRight: "180px",
                        }}
                      >
                        捐捐不息&nbsp;Trickle of Benefaction
                      </Navbar.Brand>
                      <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    </Col>
                  )}
                  {email === user.email && level === "admin" && (
                    <Col style={{ padding: "0px", width: "250px" }}>
                      <Nav.Link
                        as={Link}
                        to="/managerProve"
                        href="#action/3.2"
                        style={{ color: "#069A8E", fontSize: "17px" }}
                      >
                        申請資料審核
                      </Nav.Link>
                    </Col>
                  )}
                  {email === user.email && level === "admin" && (
                    <Col style={{ padding: "0px" }}>
                      <Nav.Link
                        as={Link}
                        to="/addStores"
                        href="#action/3.2"
                        style={{ color: "#069A8E", fontSize: "17px" }}
                      >
                        新增合作店家
                      </Nav.Link>
                    </Col>
                  )}
                  {email === user.email && level === "admin" && (
                    <Col style={{ padding: "0px" }}>
                      <Nav.Link
                        as={Link}
                        to="/allStores"
                        href="#action/3.2"
                        style={{ color: "#069A8E", fontSize: "17px" }}
                      >
                        合作店家一覽
                      </Nav.Link>
                    </Col>
                  )}
                  {email === user.email && level === "admin" && (
                    <Col style={{ padding: "0px" }}>
                      <Nav.Link
                        as={Link}
                        to="/uploadGoods"
                        href="#action/3.2"
                        style={{ color: "#069A8E", fontSize: "17px" }}
                      >
                        上架物資
                      </Nav.Link>
                    </Col>
                  )}
                  {email === user.email && level === "admin" && (
                    <Col style={{ padding: "0px", textAlign: "left" }}>
                      <Nav.Link
                        as={Link}
                        to="/allGoods"
                        href="#action/3.2"
                        style={{ color: "#069A8E", fontSize: "17px" }}
                      >
                        物資一覽表
                      </Nav.Link>
                    </Col>
                  )}
                  {email === user.email && level === "admin" && (
                    <Col
                      style={{
                        padding: "0px",
                        textAlign: "left",
                        paddingRight: "15px",
                        color: "#069A8E",
                      }}
                    >
                      <LogoutAdmin />
                    </Col>
                  )}
                </Row>
              </Nav>
            </Container>
          </Navbar>
        )}
      </div>
      {!user && (
        <Nav.Link
          as={Link}
          to="/signIn"
          style={{ marginRight: "8px", color: "#002B5B", fontSize: "17px" }}
        >
          註冊／登入
        </Nav.Link>
      )}
    </div>
  );
}
function NavbarComp() {
  const [details, setDetails] = useState([]);
  useEffect(() => {
    const q = query(collection(db, "users"));
    onSnapshot(q, (querySnapshot) => {
      setDetails(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);
  const [user, loading] = useAuthState(auth);
  if (loading)
    return (
      <h3
        style={{
          textAlign: "center",
          color: "#002b5b",
          fontWeight: "bold",
          height: "0px",
          lineHeight: "65px",
        }}
      >
        網頁載入中...
      </h3>
    );
  const bodyStyle = {
    backgroundColor: "#ffffff",
  };
  return (
    <div style={bodyStyle}>
      <div>
        {details.map((item) => (
          <Task
            id={item.id}
            key={item.id}
            level={item.data.level}
            email={item.data.email}
            name={item.data.name}
          />
        ))}
      </div>
      <ScrollToTop smooth />
    </div>
  );
}
export default NavbarComp;
