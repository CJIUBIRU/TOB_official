import { Container } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import "../App.css";
import TitleSec from "../elements/titleSec";
import Col from "react-bootstrap/Col";
import { Card } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import Navbar from "../elements/navbar";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import {
  getAuth,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "../utils/firebase";

function Task({ id, email, level, name }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const navigate = useNavigate();
  const auth = getAuth();
  const [user] = useAuthState(auth);
  if (!user) {
    navigate("/signIn");
  }

  // console.log([user]);

  const [password, setPassword] = useState({
    oldOne: "",
    newOne: "",
  });

  const handleChange = (e) => {
    setPassword((password) => ({
      ...password,
      [e.target.name]: e.target.value,
    }));
  };

  function reauthenticate(password) {
    console.log(password);
    const user = auth.currentUser;
    const credential = EmailAuthProvider.credential(
      user.email,
      password.oldOne
    );
    console.log(password.oldOne);
    reauthenticateWithCredential(user, credential)
      .then(() => {
        // User re-authenticated.
        if (password.oldOne === password.newOne) {
          window.location.reload();
          alert("新密碼與舊密碼一致，請重新設定新密碼");
        } else {
          changePassword(password.newOne);
        }
      })
      .catch((error) => {
        console.log(error);
        const errorMes = error.code;
        console.log(errorMes);
        if (errorMes === "auth/wrong-password") {
          window.location.reload();
          alert("舊密碼不一致，請輸入正確的密碼");
        }
        // else if ()
      });
  }

  function changePassword(newPassword) {
    const user = auth.currentUser;
    console.log(newPassword);
    updatePassword(user, newPassword)
      .then(() => {
        console.log("更新完畢");
        alert("成功設置新密碼！");
        navigate("/profile");
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  function sendNewPassword() {
    try {
      reauthenticate(password);
    } catch (err) {
      console.log(err.message);
      alert("密碼設置失敗，請重試。");
    }
  }

  // console.log("password.oldOne", password.oldOne);
  // console.log("password.newOne", password.newOne);

  return (
    <div>
      {user.email === email && level === "member" && (
        <div>
          <TitleSec name="修改密碼" color="#F4D19B" />
          <Container>
            <Card
              style={{ marginTop: "60px", width: "60%", marginLeft: "20%" }}
            >
              <div
                style={{
                  borderRadius: "5px",
                  height: "200px",
                  color: "#002b5b",
                  fontSize: "18px",
                  letterSpacing: "1px",
                  lineHeight: "40px",
                  margin: "20px 0 0 5%",
                }}
              >
                <Col>
                  <div
                    style={{
                      marginTop: "35px",
                      width: "70%",
                      marginLeft: "11%",
                    }}
                  >
                    <InputGroup style={{ marginBottom: "10px" }}>
                      <Form.Label
                        htmlFor="basic-url"
                        style={{ lineHeight: "40px", marginRight: "10px" }}
                      >
                        輸入舊密碼：&nbsp;
                      </Form.Label>
                      <Form.Control
                        type="password"
                        name="oldOne"
                        style={{
                          width: "30%",
                          height: "40px",
                          borderRadius: "5px",
                        }}
                        value={password.oldOne}
                        onChange={handleChange}
                        placeholder="請輸入舊密碼"
                      />
                    </InputGroup>
                    <InputGroup>
                      <Form.Label
                        htmlFor="basic-url"
                        style={{ lineHeight: "40px", marginRight: "10px" }}
                      >
                        設定新密碼：&nbsp;
                      </Form.Label>
                      <Form.Control
                        type="password"
                        name="newOne"
                        style={{
                          width: "30%",
                          height: "40px",
                          borderRadius: "5px",
                        }}
                        value={password.newOne}
                        onChange={handleChange}
                        placeholder="請輸入新密碼"
                      />
                    </InputGroup>
                  </div>
                </Col>
              </div>
            </Card>

            <div style={{ marginTop: "70px", marginLeft: "45.5%" }}>
              <input
                style={{
                  color: "#ffffff",
                  backgroundColor: "#F58D59",
                  borderRadius: "30px",
                  borderColor: "#002B5B",
                  fontSize: "16px",
                  width: "120px",
                  textAlign: "center",
                  height: "35px",
                  fontWeight: "bold",
                  border: "none",
                }}
                type="submit"
                value="確認修改"
                onClick={sendNewPassword}
              />
            </div>
          </Container>
        </div>
      )}
      {user.email === email && level === "admin" && (
        <div>
          <TitleSec name="修改密碼" color="#7BBFBA" />
          <Container>
            <Card
              style={{ marginTop: "60px", width: "60%", marginLeft: "20%" }}
            >
              <div
                style={{
                  borderRadius: "5px",
                  height: "200px",
                  color: "#002b5b",
                  fontSize: "18px",
                  letterSpacing: "1px",
                  lineHeight: "40px",
                  margin: "20px 0 0 5%",
                }}
              >
                <Col>
                  <div
                    style={{
                      marginTop: "35px",
                      width: "70%",
                      marginLeft: "11%",
                    }}
                  >
                    <InputGroup style={{ marginBottom: "10px" }}>
                      <Form.Label
                        htmlFor="basic-url"
                        style={{ lineHeight: "40px", marginRight: "10px" }}
                      >
                        輸入舊密碼：&nbsp;
                      </Form.Label>
                      <Form.Control
                        type="password"
                        name="oldOne"
                        style={{
                          width: "30%",
                          height: "40px",
                          borderRadius: "5px",
                        }}
                        value={password.oldOne}
                        onChange={handleChange}
                        placeholder="請輸入舊密碼"
                      />
                    </InputGroup>
                    <InputGroup>
                      <Form.Label
                        htmlFor="basic-url"
                        style={{ lineHeight: "40px", marginRight: "10px" }}
                      >
                        設定新密碼：&nbsp;
                      </Form.Label>
                      <Form.Control
                        type="password"
                        name="newOne"
                        style={{
                          width: "30%",
                          height: "40px",
                          borderRadius: "5px",
                        }}
                        value={password.newOne}
                        onChange={handleChange}
                        placeholder="請輸入新密碼"
                      />
                    </InputGroup>
                  </div>
                </Col>
              </div>
            </Card>

            <div style={{ marginTop: "70px", marginLeft: "45.5%" }}>
              <input
                style={{
                  color: "#ffffff",
                  backgroundColor: "#069A8E",
                  borderRadius: "30px",
                  borderColor: "#002B5B",
                  fontSize: "16px",
                  width: "120px",
                  textAlign: "center",
                  height: "35px",
                  fontWeight: "bold",
                  border: "none",
                }}
                type="submit"
                value="確認修改"
                onClick={sendNewPassword}
              />
            </div>
          </Container>
        </div>
      )}
      {user.email === email && level === "charity" && (
        <div>
          <TitleSec name="修改密碼" color="#90AACB" />
          <Container>
            <Card
              style={{ marginTop: "60px", width: "60%", marginLeft: "20%" }}
            >
              <div
                style={{
                  borderRadius: "5px",
                  height: "200px",
                  color: "#002b5b",
                  fontSize: "18px",
                  letterSpacing: "1px",
                  lineHeight: "40px",
                  margin: "20px 0 0 5%",
                }}
              >
                <Col>
                  <div
                    style={{
                      marginTop: "35px",
                      width: "70%",
                      marginLeft: "11%",
                    }}
                  >
                    <InputGroup style={{ marginBottom: "10px" }}>
                      <Form.Label
                        htmlFor="basic-url"
                        style={{ lineHeight: "40px", marginRight: "10px" }}
                      >
                        輸入舊密碼：&nbsp;
                      </Form.Label>
                      <Form.Control
                        type="password"
                        name="oldOne"
                        style={{
                          width: "30%",
                          height: "40px",
                          borderRadius: "5px",
                        }}
                        value={password.oldOne}
                        onChange={handleChange}
                        placeholder="請輸入舊密碼"
                      />
                    </InputGroup>
                    <InputGroup>
                      <Form.Label
                        htmlFor="basic-url"
                        style={{ lineHeight: "40px", marginRight: "10px" }}
                      >
                        設定新密碼：&nbsp;
                      </Form.Label>
                      <Form.Control
                        type="password"
                        name="newOne"
                        style={{
                          width: "30%",
                          height: "40px",
                          borderRadius: "5px",
                        }}
                        value={password.newOne}
                        onChange={handleChange}
                        placeholder="請輸入新密碼"
                      />
                    </InputGroup>
                  </div>
                </Col>
              </div>
            </Card>

            <div style={{ marginTop: "70px", marginLeft: "45.5%" }}>
              <input
                style={{
                  color: "#ffffff",
                  backgroundColor: "#002B5B",
                  borderRadius: "30px",
                  borderColor: "#002B5B",
                  fontSize: "16px",
                  width: "120px",
                  textAlign: "center",
                  height: "35px",
                  fontWeight: "bold",
                  border: "none",
                }}
                type="submit"
                value="確認修改"
                onClick={sendNewPassword}
              />
            </div>
          </Container>
        </div>
      )}
    </div>
  );
}

function UserUpdatePassword() {
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
          level={item.data.level}
          email={item.data.email}
          name={item.data.name}
        />
      ))}
    </div>
  );
}

export default UserUpdatePassword;
