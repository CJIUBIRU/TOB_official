import { Container, Nav } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import "../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleQuestion } from "@fortawesome/free-solid-svg-icons";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import TitleSec from "../elements/titleSec";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "../elements/button";
import { auth } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { sendEmailVerification } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Navbar from "../elements/navbar";
import { faHandPointer } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "../utils/firebase";
import ProgressBar from "react-bootstrap/ProgressBar";
import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import { Card, FormControl } from "react-bootstrap";

function Task({ id, name, email, level, img, status }) {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  function verifiedEmail() {
    if (user.emailVerified === false) {
      sendEmailVerification(auth.currentUser)
        .then(() => {
          // 驗證信發送完成
          navigate("/profile");
          alert(
            "驗證信已發送到您的信箱，請查收。\n註：若找不到信件，可查看是否被寄送至垃圾郵件裡，謝謝。"
          );
        })
        .catch((error) => {
          // 驗證信發送失敗
          console.log(error.message);
          alert("驗證信發送失敗。");
        });
    } else {
      alert("未能抓到user資訊");
    }
  }
  const uploadUserName = (item) => {
    localStorage.setItem("good", JSON.stringify(item));
  };
  return (
    <div>
      {user.email === email && (
        <div>
          {level === "member" && (
            <TitleSec name="個人檔案管理" color="#F4D19B" />
          )}
          {level === "admin" && (
            <TitleSec name="個人檔案管理" color="#7BBFBA" />
          )}
          {level === "charity" && (
            <TitleSec name="個人檔案管理" color="#90AACB" />
          )}
          <Container>
            <Card
              style={{ marginTop: "0px", width: "700px", marginLeft: "300px" }}
            >
              <div
                style={{
                  borderRadius: "5px",
                  height: "380px",
                  color: "#002b5b",
                  fontSize: "18px",
                  letterSpacing: "1px",
                  lineHeight: "40px",
                  margin: "0 0 0 80px",
                }}
              >
                {/* <Row> */}
                  {/* <Col>
                    <div>
                      {email === user.email && (
                        <div>
                          <img
                            style={{
                              width: "260px",
                              height: "260px",
                              margin: "50px 0px 30px 100px",
                              borderRadius: "100%",
                            }}
                            alt="profileImg"
                            src={img}
                          ></img>
                        </div>
                      )}
                    </div>
                  </Col> */}
                  {/* <Col> */}
                    {email === user.email && level === "charity" && (
                      <div>
                        <div style={{ marginTop: "100px" }}>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              height: "0px",
                            }}
                          >
                            <b>用戶名稱：</b>
                            <p>{name}</p>
                            &nbsp;
                            <Nav.Link
                              as={Link}
                              to="/setUserName"
                              style={{
                                border: "none",
                                backgroundColor: "white",
                              }}
                              onClick={(e) =>
                                uploadUserName({ id: id, name: name })
                              }
                            >
                              <FontAwesomeIcon icon={faPen} />
                            </Nav.Link>
                          </div>
                          <a href="#" style={{ color: "#002b5b" }}></a>
                          <br />
                          <b>用戶信箱：</b>
                          {user.email}
                          &nbsp;
                          <FontAwesomeIcon
                            style={{ color: "#26aa99" }}
                            icon={faCircleCheck}
                          />
                          {/* {user.emailVerified == false && (
              <a href="#" style={{ color: "#002b5b" }} onClick={verifiedEmail}>
                <FontAwesomeIcon
                  style={{ color: "lightgray" }}
                  icon={faCircleCheck}
                />
              </a>
            )}
            {user.emailVerified == true && (
              <a href="#" style={{ color: "#002b5b" }}>
                <FontAwesomeIcon
                  style={{ color: "#26aa99" }}
                  icon={faCircleCheck}
                />
              </a>
            )} */}
                          <br />
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              height: "45px",
                            }}
                          >
                            <b>使用者帳號：</b>
                            {email}
                          </div>
                          <a href="#" style={{ color: "#002b5b" }}></a>
                          <br />
                          <div
                            style={{
                              marginTop: "0px",
                              display: "flex",
                              flexDirection: "row",
                            }}
                          >
                            <Button name="更換頭貼" color="#002b5b" />
                            &nbsp;
                            {status !== "google" && (
                              <Button
                                name="修改密碼"
                                to="/userUpdatePassword" color="#002b5b"
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                    {email === user.email && level === "member" && (
                      <div>
                        <div style={{ marginTop: "100px" }}>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              height: "0px",
                            }}
                          >
                            <b style={{ color: "#F58D59" }}>用戶名稱：</b>
                            <p>{name}</p>
                            &nbsp;
                            <Nav.Link
                              as={Link}
                              to="/setUserName"
                              style={{
                                border: "none",
                                backgroundColor: "white",
                                color: "#F58D59",
                              }}
                              onClick={(e) =>
                                uploadUserName({ id: id, name: name })
                              }
                            >
                              <FontAwesomeIcon icon={faPen} />
                            </Nav.Link>
                          </div>
                          <a href="#" style={{ color: "#002b5b" }}></a>
                          {/* <br />
                <strike>
                  <b style={{color: "#F58D59"}}>用戶級別：</b>中級會員&nbsp;
                </strike>
                <a href="#" style={{ color: "#F58D59" }}>
                  <FontAwesomeIcon icon={faCircleQuestion} />
                </a> */}
                          {/* <br />
                <strike>
                  <b style={{color: "#F58D59"}}>用戶累積點數：</b>1032&nbsp;
                </strike>
                <a href="#" style={{ color: "#F58D59" }}>
                  <FontAwesomeIcon icon={faCircleQuestion} />
                </a> */}
                          <br />
                          <b style={{ color: "#F58D59" }}>用戶信箱：</b>
                          {user.email}
                          &nbsp;
                          {user.emailVerified == false && (
                            <a
                              href="#"
                              style={{ color: "#002b5b" }}
                              onClick={verifiedEmail}
                            >
                              <FontAwesomeIcon
                                style={{ color: "lightgray" }}
                                icon={faCircleCheck}
                              />
                            </a>
                          )}
                          {user.emailVerified == true && (
                            <a href="#" style={{ color: "#002b5b" }}>
                              <FontAwesomeIcon
                                style={{ color: "#26aa99" }}
                                icon={faCircleCheck}
                              />
                            </a>
                          )}
                          <br />
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              height: "45px",
                            }}
                          >
                            <b style={{ color: "#F58D59" }}>使用者帳號：</b>
                            {email}
                          </div>
                          <a href="#" style={{ color: "#002b5b" }}></a>
                          {/* <strike>
                  <b style={{color: "#F58D59"}}>手機號碼：</b>0987654321&nbsp;
                </strike>
                <a href="#" style={{ color: "#002b5b" }}>
                  <FontAwesomeIcon
                    style={{ color: "lightgray" }}
                    icon={faCircleCheck}
                  />
                </a>
                <br /> */}
                          <div
                            style={{
                              marginTop: "18px",
                              display: "flex",
                              flexDirection: "row",
                            }}
                          >
                            <Button color="#F58D59" name="更換頭貼" />
                            &nbsp;
                            {status !== "google" && (
                              <Button
                                color="#F58D59"
                                name="修改密碼"
                                to="/userUpdatePassword"
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                    {email === user.email && level === "admin" && (
                      <div>
                        <div style={{ marginTop: "100px" }}>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              height: "0px",
                            }}
                          >
                            <b style={{ color: "#069A8E" }}>用戶名稱：</b>
                            <p>{name}</p>
                            &nbsp;
                            <Nav.Link
                              as={Link}
                              to="/setUserName"
                              style={{
                                border: "none",
                                backgroundColor: "white",
                                color: "#069A8E",
                              }}
                              onClick={(e) =>
                                uploadUserName({ id: id, name: name })
                              }
                            >
                              <FontAwesomeIcon icon={faPen} />
                            </Nav.Link>
                          </div>
                          <a href="#" style={{ color: "#002b5b" }}></a>
                          <br />
                          <b style={{ color: "#069A8E" }}>用戶信箱：</b>
                          {user.email}
                          &nbsp;
                          <FontAwesomeIcon
                            style={{ color: "#26aa99" }}
                            icon={faCircleCheck}
                          />
                          {/* {user.emailVerified == false && (
              <a href="#" style={{ color: "#002b5b" }} onClick={verifiedEmail}>
                <FontAwesomeIcon
                  style={{ color: "lightgray" }}
                  icon={faCircleCheck}
                />
              </a>
            )}
            {user.emailVerified == true && (
              <a href="#" style={{ color: "#002b5b" }}>
                <FontAwesomeIcon
                  style={{ color: "#26aa99" }}
                  icon={faCircleCheck}
                />
              </a>
            )} */}
                          <br />
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              height: "45px",
                            }}
                          >
                            <b style={{ color: "#069A8E" }}>使用者帳號：</b>
                            {email}
                          </div>
                          <a href="#" style={{ color: "#002b5b" }}></a>
                          <br />
                          <div
                            style={{
                              marginTop: "0px",
                              display: "flex",
                              flexDirection: "row",
                            }}
                          >
                            <Button color="#069A8E" name="更換頭貼" />
                            &nbsp;
                            {status !== "google" && (
                              <Button
                                color="#069A8E"
                                name="修改密碼"
                                to="/userUpdatePassword"
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  {/* </Col> */}
                {/* </Row> */}
              </div>
            </Card>
          </Container>
        </div>
      )}
    </div>
  );
}
function UploadDemand() {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  if (!user) {
    navigate("/signIn");
  }
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
  return (
    <div>
      <Navbar />
      {details.map((item) => (
        <Task
          id={item.id}
          key={item.id}
          name={item.data.name}
          email={item.data.email}
          level={item.data.level}
          img={item.data.img}
          status={item.data.status}
        />
      ))}
    </div>
  );
}

export default UploadDemand;
