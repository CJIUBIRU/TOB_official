import React, { useEffect } from "react";
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
import title from "../img/horizontal.PNG";
import Logout from "./logout";

function NavbarComp() {
  useEffect(() => {
    window.scrollTo(0, 0);
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
  const navbarStyle = {
    width: "100%",
    top: "0",
    position: "fixed",
    backgroundColor: "#ffffff",
    zIndex: "5",
    borderBottom: "3px solid #069a8e",
  };
  const navpageStyle = {
    fontWeight: "bold",
    fontSize: "19px",
    lineHeight: "50px",
  };
  const navitemStyle = {
    marginRight: "8px",
    color: "#F58D59",
    fontSize: "17px",
  };
  return (
    <div style={bodyStyle}>
      <div style={{ height: "80px" }}></div>
      <Navbar className="nav-bar" style={navbarStyle} expand="lg">
        <Container>
          <div className="navGrid">
            <div>
              <Navbar.Brand href="#home">
                <Nav.Link to="/home" as={Link}>
                  {/* <img
                    alt=""
                    src={logo}
                    width="100"
                    height="100"
                    className="d-inline-block align-top rwdLogoImg"
                  />{" "} */}
                  <img
                    style={{ margin: "26px 0 0 0" }}
                    alt=""
                    src={title}
                    width="397.95"
                    height="70"
                    className="d-inline-block align-top rwdLogoText"
                  />
                </Nav.Link>
              </Navbar.Brand>
            </div>
            <div className="togGrid">
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
            </div>
          </div>
          <Navbar.Collapse
            className="justify-content-end"
            id="basic-navbar-nav"
          >
            <div>
              <Nav className="me-auto" style={navpageStyle}>
                <Nav.Link
                  as={Link}
                  to="/managerProve"
                  href="#action/3.2"
                  style={{ color: "#069A8E", fontSize: "17px" }}
                >
                  申請資料審核
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/UploadOpenData"
                  href="#action/3.2"
                  style={{ color: "#069A8E", fontSize: "17px" }}
                >
                  上傳公開資料
                </Nav.Link>

                <Nav.Link
                  as={Link}
                  to="/addStores"
                  href="#action/3.2"
                  style={{ color: "#069A8E", fontSize: "17px" }}
                >
                  新增合作店家
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/allStores"
                  href="#action/3.2"
                  style={{ color: "#069A8E", fontSize: "17px" }}
                >
                  合作店家一覽
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/uploadGoods"
                  href="#action/3.2"
                  style={{ color: "#069A8E", fontSize: "17px" }}
                >
                  上架物資
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/allGoods"
                  href="#action/3.2"
                  style={{ color: "#069A8E", fontSize: "17px" }}
                >
                  物資一覽表
                </Nav.Link>

                {user && <Logout />}
                {!user && (
                  <Nav.Link as={Link} to="/signIn" style={navitemStyle}>
                    註冊／登入
                  </Nav.Link>
                )}
              </Nav>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <ScrollToTop smooth />
    </div>
  );
}
export default NavbarComp;
