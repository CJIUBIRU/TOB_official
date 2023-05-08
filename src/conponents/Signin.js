import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import ButtonLink from "../elements/button";
import ReturnHome from "../elements/returnHome";
import GoogleLogin from "../elements/googleLogin";
import FbLogin from "../elements/fbLogin";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import app from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import React from "react";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
// import bgphoto from "../img/vertical.PNG";
import titleImg from "../img/horizontal.PNG";
import Background from '../img/horizontal.PNG';

function Login() {
  const [activeItem, setActiveItem] = React.useState("loginUser");

  const navigate = useNavigate();
  const auth = getAuth(app);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // 清除 localstorage
  let userEmail = JSON.parse(localStorage.getItem("email"));
  if (userEmail) {
    localStorage.clear();
  }

  const signIn = () => {
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        navigate("/home");
        localStorage.setItem("email", JSON.stringify(user.email));
        setIsLoading(false);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        // const errorMessage = error.message;
        switch (errorCode) {
          case "auth/user-not-found":
            setErrorMessage("信箱不存在");
            break;
          case "auth/invalid-email":
            setErrorMessage("信箱格式不正確");
            break;
          case "auth/wrong-password":
            setErrorMessage("密碼錯誤");
            break;
          default:
        }
        setIsLoading(false);
      });
  };

  const loginCardStyle = {
    backgroundColor: "#D7E9F7",
    width: "450px",
    height: "500px",
    boxShadow: "5px 5px 10px gray",
    borderRadius: "30px",
  };
  const mulLoginPageStyle = {
    width: "380px",
    height: "80px",
    textAlign: "center",
  };
  const loginContentStyle = {
    width: "380px",
    height: "300px",
    margin: "30px",
  };
  const titleStyle = {
    color: "#002B5B",
    fontSize: "30px",
    textAlign: "center",
    fontWeight: "bold",
    paddingTop: "40px",
  };
  const inputStyle = {
    marginBottom: "20px",
    border: "1.5px solid #90AACB",
  };
  const btnContentStyle = {
    display: "grid",
    gridTemplateColumns: "15% 35% 40% 10%",
  };
  const stepBtnStyle = {
    color: "#ffffff",
    backgroundColor: "#002B5B",
    borderRadius: "30px",
    fontSize: "16px",
    width: "120px",
    textAlign: "center",
    height: "35px",
    fontWeight: "bold",
  };
  const errorMessageStyle = {
    fontSize: "16px",
    fontWeight: "bold",
    color: "red",
    textAlign: "center",
    border: "1px red solid",
    backgroundColor: "#FFECEC",
  };
  const backImg = {
    // backgroundImage: `url(${Background})` 
    // backgroundColor: "#FEF1E6",
  }
  return (
    <div style={backImg}>
      <div className="signInGrid">
        <div></div>
        <div>
          <div style={{display: "grid", gridTemplateColumns: "5% 90% 5%"}}>
            <div></div>
            <div className="signIntitleImg">
              <img className="titleImg" src={titleImg} alt="titleImg"></img>
            </div>
            <div></div>
          </div>
          <div style={loginCardStyle}>
            <div style={loginContentStyle}>
              <p style={titleStyle}>
                {activeItem === "loginUser" && "使用者，您好："}
                {activeItem === "loginDemand" && "公益單位，您好："}
                {activeItem === "loginAdmin" && "管理者，您好："}
              </p>
              <div>
                <Form.Control
                  style={inputStyle}
                  type="email"
                  placeholder="請輸入帳號"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Form.Control
                  style={inputStyle}
                  type="password"
                  placeholder="請輸入密碼"
                  onChange={(e) => setPassword(e.target.value)}
                />

                <div style={btnContentStyle}>
                  <div></div>
                  <div>
                    <ButtonLink to="/signUp" name="前往註冊" color="#002b5b" />
                  </div>
                  <div>
                    <button
                      loading={isLoading}
                      style={stepBtnStyle}
                      onClick={signIn}
                    >
                      登入
                    </button>
                  </div>
                  <div></div>
                </div>

                <div
                  style={{
                    marginTop: "40px",
                    textAlign: "center",
                    zIndex: "2",
                  }}
                >
                  <Nav.Link
                    style={{
                      fontSize: "14px",
                      letterSpacing: "1px",
                      textDecoration: "underLine",
                      color: "blue",
                    }}
                    as={Link}
                    to="/forgetPassword"
                  >
                    忘記密碼？請點擊這裡。
                  </Nav.Link>
                </div>
              </div>
              <div style={mulLoginPageStyle}>
                <hr style={{ marginTop: "40px" }} />
                <GoogleLogin />
                {/* <FbLogin /> */}
              </div>
              {errorMessage && <p style={errorMessageStyle}>{errorMessage}</p>}
            </div>
          </div>
        </div>
        <div></div>
      </div>
      <ReturnHome />
    </div>
  );
}

export default Login;
