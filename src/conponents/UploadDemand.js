import { Container } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import "../App.css";
import TitleSec from "../elements/titleSec";
import TitleStep from "../elements/titleStep";
import ButtonLink from "../elements/button";
import DemandStep1 from "../elements/demandStep1";
import NavbarCharity from "../elements/navbarCharity";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { collection, query, onSnapshot, where } from "firebase/firestore";
import { db } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router";
import ProgressBar from "react-bootstrap/ProgressBar";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Step from "@mui/material/Step";
import Stepper from "@mui/material/Stepper";
import StepLabel from "@mui/material/StepLabel";
import Form from 'react-bootstrap/Form';

function UploadDemand() {
  const navigate = useNavigate("");
  const [user] = useAuthState(auth);
  const [tasks, setTasks] = useState([]);

  if (!user) {
    navigate("/signIn");
  }

  // 抓supply DB data
  const [details, setDetails] = useState([]);
  //搜尋過濾第一步
  const [searchStore, setSearchStore] = useState("");
  const [searchCategory, setSearchCategory] = useState("");


  const [searchGood, setSearchGood] = useState("");
  useEffect(() => {
    let q = query(collection(db, "supply"));
    //搜尋過濾第三步
    if (searchStore) {
      q = query(q, where("store", "==", searchStore));
    }
    if (searchCategory) {
      q = query(q, where("store", "==", searchCategory));
    }

    if (searchGood) {
      q = query(q, where("name", ">=", searchGood));
    }
    onSnapshot(q, (querySnapshot) => {
      setDetails(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);


  useEffect(() => {
    const q = query(collection(db, "stores"));
    onSnapshot(q, (querySnapshot) => {
      setTasks(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);
  // details.map((item) =>
  //   console.log(item)
  // )

  //let cart = [];
  const [cart, setCart] = useState([]);

  return (
    <div>
      <NavbarCharity />
      <div style={{ marginTop: "-80px" }}>
        <TitleSec name="刊登物資需求" color="#90AACB" />
      </div>
      <Container>
        <Stepper
          alternativeLabel
          activeStep={0}
          style={{ margin: "30px 0px 30px 0px" }}
        >
          <Step key={2}>
            <StepLabel>選擇需求物資</StepLabel>
          </Step>
          <Step key={3}>
            <StepLabel>填寫資料</StepLabel>
          </Step>
          <Step key={4}>
            <StepLabel>確認送出</StepLabel>
          </Step>
        </Stepper>
        <TitleStep name="STEP1&nbsp;-&nbsp;選擇需求物資" />
        <br></br>
        {/* 搜尋過濾第二步 */}
        <center>
          <div style={{ width: "80%" }}>
            <div style={{ display: "grid", gridTemplateColumns: "33% 8px 33% 8px 33%" }}>
              <div>
                <Form.Select
                  //style={{ marginRight: "100px",}}
                  required
                  onChange={(e) => setSearchStore(e.target.value)}
                >
                  <option value="">請選擇物資提供商家</option>
                  {tasks.map((task) => (
                    <option value={task.data.name}>{task.data.name}</option>
                  ))}
                </Form.Select>
              </div>
              <div></div>
              <div>
                <Form.Select
                  //style={{ width: "60%", marginLeft: "38%" }}
                  value={searchCategory}
                  onChange={(e) => setSearchCategory(e.target.value)}
                >
                  <option value="">請選擇物資類別</option>

                  <option value="保健食品">保健食品</option>
                  <option value="食品飲料">食品飲料</option>
                  <option value="生鮮蔬果">生鮮蔬果</option>

                  <option value="文具用品">文具用品</option>

                  <option value="個人清潔">個人清潔</option>
                  <option value="紙棉用品">紙棉用品</option>
                  <option value="日常清潔">生活清潔</option>

                  <option value="質優帽襪">質優帽襪</option>
                  <option value="內著衣賞">內著衣賞</option>

                  <option value="生活五金">生活五金</option>
                  <option value="生活雜貨">生活雜貨</option>

                  <option value="家庭護理">家庭護理</option>
                  <option value="兒童保健">兒童用品</option>
                  <option value="寵物專屬">寵物專屬</option>

                </Form.Select>
              </div>
              <div></div>
              <div>
                <Form.Control
                  //style={{ width: "60%", marginLeft: "2%" }}
                  type="text"
                  value={searchGood}
                  onChange={(e) => setSearchGood(e.target.value)}
                  placeholder="搜尋物資名稱"
                />
              </div>
            </div>
          </div>
        </center>
        <br></br>
        <center>
          {details
            .filter((item) => {
              if (searchStore && item.data.store !== searchStore) {
                return false;
              }
              if (searchCategory && item.data.category !== searchCategory) {
                return false;
              }
              if (searchGood && !item.data.name.includes(searchGood)) {
                return false;
              }
              return true;
            }).map((item, index) => (

              <DemandStep1
                key={index}
                id={item.id}
                name={item.data.name}
                pic={item.data.pic}
                price={item.data.price}
                store={item.data.store}
                cart={cart}
                setCart={setCart}
              />

            ))} </center>
        <div
          style={{
            marginTop: "40px",
            marginBottom: "50px",
            // marginLeft: "45%",
            // marginRight: "55%",
          }}
        >
          <center><ButtonLink color="#002b5b" to="/uploadDemandSec" name="下一步" /></center>
        </div>
      </Container>
    </div>
  );
}

export default UploadDemand;
