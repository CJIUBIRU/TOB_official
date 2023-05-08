import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import ButtonLink from "../elements/button";
import ReturnHome from "../elements/returnHome";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import app from "../utils/firebase";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../utils/firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import logo from "../img/logo.png";
import logo2 from "../img/logo2.png";
import PrivacyPolicy from "./PrivacyPolicy";
import { Nav } from "react-bootstrap";
import Policy from "./Files/隱私保護政策.pdf"

function Login() {
  const navigate = useNavigate();
  const auth = getAuth(app);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [checkPassword, setCheckPassword] = useState("");

  const signUp = () => {
    setIsLoading(true);
    if (password === checkPassword) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // console.log(user);
          addUser(user);
          setIsLoading(false);
          alert("註冊成功，正在前往登入頁面...");
          verifiedEmail(user);
          // auth.signOut();
          navigate("/signIn");
        })
        .catch((error) => {
          const errorCode = error.code;
          switch (errorCode) {
            case "auth/email-already-in-use":
              setErrorMessage("信箱已存在");
              break;
            case "auth/invalid-email":
              setErrorMessage("信箱格式不正確");
              break;
            case "auth/weak-password":
              setErrorMessage("密碼強度不足");
              break;
            default:
          }
          setIsLoading(false);
        });
    } else {
      alert("兩次密碼輸入不相同，請重新輸入。");
    }
  };

  // 新增firebase "users" 資訊
  function addUser(user) {
    try {
      addDoc(collection(db, "users"), {
        email: email,
        level: "member",
        uid: user.uid,
        name: "使用者",
      });
    } catch (err) {
      console.log(err);
    }
  }

  function verifiedEmail(user) {
    if (user.emailVerified === false) {
      sendEmailVerification(auth.currentUser)
        .then(() => {
          // 驗證信發送完成
          // window.location.reload();
          alert(
            "驗證信已發送到您的信箱，請查收。\n註：\n1. 若找不到信件可查看是否被寄送至垃圾郵件裡。\n2. 若過有效時間，可至'個人檔案管理'重新發送驗證信。"
          );
          navigate("/signIn");
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

  const loginContentStyle = {
    width: "380px",
    height: "300px",
    position: "absolute",
    top: "50%",
    left: "50%",
    margin: "-175px 0px 0px -190px",
  };
  const titleStyle = {
    color: "#002B5B",
    fontSize: "30px",
    textAlign: "center",
    marginBottom: "30px",
    fontWeight: "bold",
  };
  const inputStyle = {
    marginBottom: "20px",
    border: "1.5px solid #90AACB",
    width: "85%",
    marginLeft: "30px"
  };
  const btnContentStyle = {
    width: "240px",
    height: "35px",
    position: "absolute",
    top: "50%",
    left: "50%",
    margin: "0px 0px 0px -125px",
    marginTop: "130px",
    display: "flex",
    flexDirection: "row",
  };
  const loginPageStyle = {
    // width: "50%",
  };
  const loginBodyStyle = {
    display: "flex",
    flexDirection: "row",
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
    marginTop: "65px",
    border: "1px red solid",
    backgroundColor: "#FFECEC",
  };

  return (
    <div style={loginBodyStyle}>
      {/* <img style={{ width: "90%", marginTop: "-70px" }} src={logo2} alt="bgPhoto" /> */}
      <div>
        <img className="loginLogoStyle" src={logo} alt="logoPhoto" />
      </div>
      <div style={loginPageStyle}>
        <div className="loginCardStyle">
          <div style={loginContentStyle}>
            <p style={titleStyle}>註冊</p>
            {/* <form> */}
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
            <div style={{ display: "flex", flexDirection: "row" }}>
              <Form.Control
                style={{
                  marginBottom: "20px",
                  border: "1.5px solid #90AACB",
                  width: "75%",
                  marginLeft: "30px"
                }}
                type="password"
                placeholder="再次輸入密碼"
                onChange={(e) => setCheckPassword(e.target.value)}
              />
              {password === checkPassword && (
                <FontAwesomeIcon
                  icon={faCircleCheck}
                  style={{
                    color: "#1cc88a",
                    fontSize: "20px",
                    marginTop: "8px",
                    marginLeft: "10px",
                  }}
                />
              )}
              {password !== checkPassword && (
                <FontAwesomeIcon
                  icon={faCircleCheck}
                  style={{
                    color: "lightgray",
                    fontSize: "20px",
                    marginTop: "8px",
                    marginLeft: "10px",
                  }}
                />
              )}
            </div>
            <div style={{ display: "flex", flexDirection: "row", marginLeft: "70px" }}>
              <span style={{ color: "#002b5b" }}>請先閱讀捐捐不息</span>
              <a href={Policy} target="_blank" rel="noreferrer">隱私保護政策</a>
            </div>
            <div style={btnContentStyle}>
              <ButtonLink color="#002b5b" to="/signIn" name="返回登入" />
              &nbsp;&nbsp;
              <button style={stepBtnStyle} type="submit" onClick={signUp}>
                註冊
              </button>
            </div>
            {/* </form> */}
            {errorMessage && <p style={errorMessageStyle}>{errorMessage}</p>}
          </div>
        </div>
      </div>
      <ReturnHome />
    </div>
  );
}

export default Login;
