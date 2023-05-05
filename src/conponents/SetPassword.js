import React from "react";
import "../App.css";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import TitleSec from "../elements/titleSec";
import TitleStep from "../elements/titleStep";
import { useState, useEffect } from "react";
import {
  addDoc,
  collection,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import { db, auth } from "../utils/firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router";
import { Container } from "react-bootstrap";
import Navbar from "../elements/navbar";
import NavbarHome from "../elements/navbarHome";
import Step from '@mui/material/Step';
import Stepper from '@mui/material/Stepper';
import StepLabel from '@mui/material/StepLabel';
import { useAuthState } from "react-firebase-hooks/auth";

function SetPassword() {
  const [user] = useAuthState(auth);
  // const auth = getAuth(app);
  const navigate = useNavigate();
  // const [user] = useAuthState(auth);
  // if (!user){
  //   navigate("/signIn");
  // }
  let CharityMail = JSON.parse(localStorage.getItem("CharityMail"));
  //let CharityID = JSON.parse(localStorage.getItem("CharityID"));
  console.log(CharityMail);
  // const [emailCharity, setEmailCharity] = useState(org);
  
  // 應為連結傳進來的email，目前先預設假email
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  // const [user] = useAuthState(auth);
  const [charityData, setCharityData] = useState();
  const [charityName2, setCharityName2] = useState();
  // accquire charity data: get charity's name  //問題

  useEffect(() => {
    const q = query(
      collection(db, "charity"),
      where("info.mail", "==", CharityMail)
    );
    onSnapshot(q, (querySnapshot) => {
      const doc = querySnapshot.docs[0];
      const charityData = doc ? doc.data() : '';
      setCharityData(charityData);
    });
  }, [CharityMail]);

  console.log(charityData?.info.name);

  const signUp = () => {
    
    if (password === checkPassword) {
      createUserWithEmailAndPassword(auth, CharityMail, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // console.log(user);
          addUser(user);
          navigate("/setLogo");
          alert("帳號註冊成功，請繼續填寫。")
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
        });
    } else {
      alert("兩次密碼輸入不相同，請重新輸入。");
    }
  };

  // 新增firebase "users" 資訊
  function addUser(user) {
    try {
      addDoc(collection(db, "users"), {
        email: CharityMail,
        level: "charity",
        uid: user.uid,
        name: charityData?.info.name,
      });
    } catch (err) {
      console.log(err);
    }
  }

  // const handleSubmit = async (e) => {
  //   if (password === checkPassword) {
  //     e.preventDefault();
  //     try {
  //       // await setDoc(doc(db, "goodsDemand", user.uid), {
  //       await addDoc(collection(db, "charity"), {
  //         email: email,
  //         password: password,
  //       });
  //       // navigate("/passwordSuccess");
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   } else {
  //     alert("兩次密碼輸入不相同，請重新輸入。");
  //   }
  // };

  const cardStyle = {
    width: "80%",
    height: "300px",
    color: "black",
    paddingTop: "40px",
    marginLeft: "10%",
    paddingBottom: "40px",
    paddingLeft: "8%",
    paddingRight: "8%",
    letterSpacing: "1px",
    marginTop: "30px",
  };
  const labelStyle = {
    width: "25%",
    textAlign: "center",
    paddingTop: "1%",
  };
  const inputStyle = {
    width: "75%",
    borderRadius: "5px",
  };
  const groupStyle = {
    marginTop: "30px",
  };
  const subBtnStyle = {
    color: "#ffffff",
    backgroundColor: "#F58D59",
    border: "none",
    borderRadius: "30px",
    fontSize: "16px",
    width: "120px",
    textAlign: "center",
    height: "35px",
    fontWeight: "bold",
    marginLeft: "46.5%",
    marginTop: "40px",
  };
  const errorMessageStyle = {
    fontSize: "16px",
    fontWeight: "bold",
    color: "red",
    textAlign: "center",
    marginTop: "0px",
    border: "1px red solid",
    backgroundColor: "#FFECEC",
  };
  return (
    <div>
      {user && <Navbar />}
      {!user && <NavbarHome />}
      <TitleSec name="基本資料設定" color="#F4D19B" />
      <Container style={{ marginBottom: "50px" }}>
        <Container>

          <Stepper activeStep={1} alternativeLabel style={{ margin: "50px" }}>

            <Step key={2}>
              <StepLabel>輸入電子郵件</StepLabel>
            </Step>
            <Step key={3}>
              <StepLabel>設定密碼</StepLabel>
            </Step>
            <Step key={4}>
              <StepLabel>上傳機構Logo</StepLabel>
            </Step>
            <Step key={5}>
              <StepLabel>上傳機構圖片</StepLabel>
            </Step>
            <Step key={6}>
              <StepLabel>填寫機構簡介</StepLabel>
            </Step>
            <Step key={7}>
              <StepLabel>完成</StepLabel>
            </Step>

          </Stepper>
        </Container>
        <TitleStep name="STEP2&nbsp;-&nbsp;設定密碼" />
        <Card style={cardStyle}>
          <Card.Body>
            <InputGroup className="mb-3">
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">帳號</InputGroup.Text>
                <Form.Control
                  value={CharityMail}
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  readOnly
                />
              </InputGroup>
            </InputGroup>
            
            <InputGroup className="mb-3">
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">設定密碼</InputGroup.Text>
                <Form.Control
                  placeholder="輸入密碼"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </InputGroup>
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">確認密碼</InputGroup.Text>
                <Form.Control
                  placeholder="輸入密碼"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  type="password"
                  onChange={(e) => setCheckPassword(e.target.value)}
                  required
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
              </InputGroup>
            </InputGroup>

            
      
            {errorMessage && <p style={errorMessageStyle}>{errorMessage}</p>}
          </Card.Body>
        </Card>
        <div>
          {/* <ButtonLink to="/passwordSuccess" name="確定" /> */}
          <button onClick={signUp} style={subBtnStyle}>
            送出
          </button>
        </div>
      </Container>
    </div>
  );
}

export default SetPassword;
