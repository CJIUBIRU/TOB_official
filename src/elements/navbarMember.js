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
    borderBottom: "3px solid #F4D19B",
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
  const navDonateBtnStyle = {
    color: "#ffffff",
    backgroundColor: "#F58D59",
    borderRadius: "30px",
    marginTop: "16px",
    marginBottom: "20px",
    marginLeft: "10px",
    lineHeight: "16px",
    fontSize: "16px",
    width: "100px",
    textAlign: "center",
  };
  const navdropStyle = {
    fontSize: "17px",
    marginRight: "8px",
  };
  const navdropItemStyle = {
    fontWeight: "bold",
    color: "#002B5B",
  };
  const profilePhotoStyle = {
    width: "50px",
    height: "50px",
    borderRadius: "100%",
    marginBottom: "15px",
    marginTop: "10px",
  };
  const profilePhotoSecStyle = {
    width: "50px",
    height: "50px",
    borderRadius: "100%",
    marginBottom: "15px",
    marginTop: "10px",
    backgroundColor: "#fef1e6",
    textAlign: "center",
    marginLeft: "34%",
    fontSize: "13px",
  };
  return (
    <div style={bodyStyle}>
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
                  to="/gain"
                  href="#home"
                  style={{
                    marginRight: "8px",
                    color: "#F58D59",
                    fontSize: "17px",
                  }}
                >
                  捐捐細流
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/charity"
                  href="#action/3.2"
                  style={{ color: "#F58D59", fontSize: "17px" }}
                >
                  合作機構一覽
                </Nav.Link>
                {user && (
                  <Logout />
                  //   <NavDropdown
                  //     title="登出"
                  //     id="basic-nav-dropdown"
                  //     style={navdropStyle}
                  //   >
                  //     <div style={{ textAlign: "center" }}>
                  //       {user.photoURL && (
                  //         <img
                  //           src={user.photoURL}
                  //           alt="profilePhoto"
                  //           referrerPolicy="no-referrer"
                  //           style={profilePhotoStyle}
                  //         ></img>
                  //       )}
                  //       {!user.photoURL && (
                  //         <div style={profilePhotoSecStyle}>使用者</div>
                  //       )}
                  //       {!user.displayName && <h6>使用者，您好！</h6>}
                  //       {user.displayName && <h6>{user.displayName}，您好！</h6>}
                  //       <Button
                  //         onClick={() => auth.signOut()}
                  //         style={{
                  //           backgroundColor: "#002b5b",
                  //           border: "none",
                  //           fontWeight: "bold",
                  //           borderRadius: "20px",
                  //         }}
                  //       >
                  //         登出
                  //       </Button>
                  //     </div>
                  //     <NavDropdown.Divider style={{ marginTop: "20px" }} />
                  //     <NavDropdown.Item
                  //       as={Link}
                  //       to="/process"
                  //       href="#action/3.1"
                  //       style={navdropItemStyle}
                  //     >
                  //       捐贈進度追蹤
                  //     </NavDropdown.Item>
                  //     <NavDropdown.Item
                  //       as={Link}
                  //       to="/donateRecord"
                  //       href="#action/3.3"
                  //       style={navdropItemStyle}
                  //     >
                  //       捐贈紀錄
                  //     </NavDropdown.Item>
                  //     <NavDropdown.Item
                  //       as={Link}
                  //       to="/viewRecord"
                  //       href="#action/3.3"
                  //       style={navdropItemStyle}
                  //     >
                  //       瀏覽紀錄
                  //     </NavDropdown.Item>
                  //     <NavDropdown.Divider />
                  //     <NavDropdown.Item
                  //       as={Link}
                  //       to="/profile"
                  //       href="#action/3.4"
                  //       style={navdropItemStyle}
                  //     >
                  //       個人檔案管理
                  //     </NavDropdown.Item>
                  //   </NavDropdown>
                )}
                {!user && (
                  <Nav.Link as={Link} to="/signIn" style={navitemStyle}>
                    註冊／登入
                  </Nav.Link>
                )}

                <Nav.Link as={Link} to="/donateList" style={navDonateBtnStyle}>
                  我要認購
                </Nav.Link>
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
