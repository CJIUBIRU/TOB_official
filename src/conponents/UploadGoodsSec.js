import React, { useState, useEffect } from "react";
import { db } from "../utils/firebase";
import Navbar from "../elements/navbarAdmin";
import TitleSec from "../elements/titleSec";
import { Card, FormControl } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import {
  doc,
  collection,
  query,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import TitleStep from "../elements/titleStep";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";
import { useNavigate, useLocation } from "react-router";
//import { v4 as uuidv4 } from "uuid";
import Form from "react-bootstrap/Form";
// import { Stepper } from "react-form-stepper";
import Step from '@mui/material/Step';
import Stepper from '@mui/material/Stepper';
import StepLabel from '@mui/material/StepLabel';

function UploadGoods() {
  const navigate = useNavigate("");
  const [user] = useAuthState(auth);
  const [tasks, setTasks] = useState([]);
  if (!user) {
    navigate("/signIn");
  }
  const location = useLocation();
  const { fromID, fromURL } = location.state;

  //console.log(fromID);
  //console.log(fromURL);

  const [name, setName] = useState("");
  const [store, setStore] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");

  // const [user] = useAuthState(auth);

  const taskDocRef = doc(db, "supply", fromID);

  const handleSubmit = async (e) => {
    //let uuid = uuidv4();
    e.preventDefault();
    try {
      //console.log("start");
      await updateDoc(taskDocRef, {
        name: name,
        store: store,
        price: price,
        pic: fromURL,
        category: category
      });
      //console.log('end');
      navigate("/uploadGoodsSuccess");
    } catch (err) {
      console.log(err);
    }
  };

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

  const subBtnStyle = {
    color: "#ffffff",
    backgroundColor: "#069A8E",
    borderRadius: "30px",
    fontSize: "16px",
    width: "120px",
    textAlign: "center",
    height: "35px",
    fontWeight: "bold",
    margin: "0px auto 35px auto",
    border: "none"
  };
  return (
    <div>
      <Navbar />
      <div style={{ marginTop: "-80px" }}>
        <TitleSec name="上架物資" color="#7BBFBA" />
      </div>
      <Container style={{ marginBottom: "15px" }}>
        <Stepper activeStep={1} alternativeLabel>

          <Step key={2}>
            <StepLabel>上傳圖片</StepLabel>
          </Step>
          <Step key={3}>
            <StepLabel>填寫商品資訊</StepLabel>
          </Step>
          <Step key={4}>
            <StepLabel>完成</StepLabel>
          </Step>

        </Stepper>
      </Container>
      <TitleStep color="#069A8E" name="STEP2 - 填寫商品資訊" />
      <br />
      <Container>
        <div style={{ textAlign: "center" }}>
          <Row>
            <Col>
              <form onSubmit={handleSubmit}>
                <Card
                  style={{
                    width: "60%",
                    marginLeft: "20%",
                    marginBottom: "10%"
                  }}
                >
                  <FormControl
                    style={{ margin: "35px auto 0% auto", width: "80%" }}
                    placeholder="輸入物資名稱（如：【春風】超細柔抽取式衛生紙110抽24包）"
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    value={name}
                  />
                  {/* <FormControl
                    style={{ margin: "30px 30px 0 30px", width: "90%" }}
                    placeholder="輸入合作店家（之後改成下拉式選單）"
                    onChange={(e) => setStore(e.target.value)}
                    type="text"
                    value={store}
                  /> */}

                  <Form.Select
                    style={{ margin: "35px auto 0% auto", width: "80%" }}
                    required
                    onChange={(e) => setStore(e.target.value)}
                  >
                    <option value="">請選擇合作店家</option>
                    {tasks.map((task) => (
                      <option value={task.data.name}>{task.data.name}</option>
                    ))}
                  </Form.Select>
                  <Form.Select
                    style={{ margin: "35px auto 0% auto", width: "80%" }}
                    required
                    onChange={(e) => setCategory(e.target.value)}
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
                  <FormControl
                    style={{ margin: "35px auto 35px auto", width: "80%" }}
                    placeholder="輸入商品金額"
                    onChange={(e) => setPrice(e.target.value)}
                    type="text"
                    value={price}
                  />
                  {name && price && store && (
                    <button type="submit" style={subBtnStyle}>
                      送出
                    </button>
                  )}
                </Card>
                {/* <div
                  style={{
                    marginLeft: "44.3%",
                    marginTop: "80px",
                    width: "auto",
                  }}
                >

                </div> */}
                {/* {name && price && store && (
                  <button type="submit" style={subBtnStyle}>
                    送出
                  </button>
                  )} */}
              </form>
            </Col>
          </Row>

          {/* {name && price && store && (
            <div
              style={{
                marginLeft: "45.5%",
                marginTop: "80px",
                width: "auto",
                marginBottom: "50px",
              }}
            >
              <ButtonLink
                as={Link}
                to="/uploadGoodsSuccess"
                name="下一步"
              ></ButtonLink>
            </div>
          )} */}
        </div>
      </Container>
    </div>
  );
}

export default UploadGoods;
