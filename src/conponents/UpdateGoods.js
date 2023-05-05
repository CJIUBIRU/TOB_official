import React, { useState, useEffect } from "react";
import { db, storage } from "../utils/firebase";
import Navbar from "../elements/navbarAdmin";
import TitleSec from "../elements/titleSec";
import { Card, FormControl } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import {
  doc,
  collection,
  updateDoc,
  onSnapshot,
  query,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router";
import Form from "react-bootstrap/Form";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import ProgressBar from "react-bootstrap/ProgressBar";

function UpdateGoods() {
  const navigate = useNavigate("");
  const [user] = useAuthState(auth);
  const [tasks, setTasks] = useState([]);
  if (!user) {
    navigate("/signIn");
  }
  //上傳圖片
  const [progress, setProgress] = useState(0);
  const [urlID, setUrlID] = useState("");
  console.log(urlID);
  const formHandler = (e) => {
    e.preventDefault();
    const file = e.target[0].files[0];
    uploadFiles(file);
    console.log(file.name);
  };
  const uploadFiles = (file) => {
    if (!file) return;
    const storageRef = ref(storage, `/goods/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(prog);
      },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          return setUrlID(url);
        });
      }
    );
  };
  //圖片結束
  let good = JSON.parse(localStorage.getItem("good"));

  const [values, setValues] = useState({
    name: good.name,
    store: good.store,
    price: good.price,
    pic: good.pic,
  });

  const handleChange = (e) => {
    setValues((values) => ({
      ...values,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const taskDocRef = doc(db, "supply", good.id);
    console.log(taskDocRef);
    console.log(good.id);
    try {
      await updateDoc(taskDocRef, {
        pic: urlID,
        name: values.name,
        store: values.store,
        price: values.price,
      });
      alert("修改成功");
      navigate("/allGoods");
    } catch (err) {
      console.log(err);
      // alert("資料更新有誤：", err)
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

  const stepBtnStyle = {
    color: "#ffffff",
    backgroundColor: "#069A8E",
    borderRadius: "30px",
    fontSize: "16px",
    width: "120px",
    textAlign: "center",
    height: "35px",
    fontWeight: "bold",
    margin: "35px auto 0px auto",
    border: "none"
  };
  return (
    <div>
      <Navbar />
      <div style={{marginTop: "-80px"}}>
      <TitleSec name="修改物資資訊" color="#7BBFBA"/>
      </div>
      {/* <TitleStep name="STEP2 - 填寫商品資訊" /> */}

      <Container>
        <div style={{ textAlign: "center" }}>
          <Row style={{ marginTop: "35px" }}>
            <Col>
              <Card  style={{ width: "60%", marginLeft: "20%", marginBottom: "20px" }}>
                <form onSubmit={formHandler}>
                  <FormControl
                    style={{ margin: "35px auto 0% auto", width: "80%" }}
                    type="file"
                    accept=".jpg, .png, .jpeg"
                    name = "pic"
                  />
                  <button style={stepBtnStyle} type="submit">
                    上傳&nbsp;
                    <FontAwesomeIcon icon={faCloudArrowUp} />
                  </button>
                  <ProgressBar
                    style={{ margin: "35px auto 0% auto", width: "80%" }}
                    now={progress}
                    label={`${progress}%`}
                  />
                </form>
                <div style={{ margin: "25px" }}>
                
                    <p style={{ lineHeight: "25px" }}>
                      
                    ※檔案格式：以照片上傳，需保證照片清晰、色調正常，JPG檔、PNG檔均可。
                     
                    </p>
               
                </div>
              <form onSubmit={handleSubmit}>
                  <FormControl
                    style={{ margin: "35px auto 0% auto", width: "80%" }}
                    placeholder="輸入物資名稱（如：【春風】超細柔抽取式衛生紙110抽24包）"
                    onChange={handleChange}
                    type="text"
                    name="name"
                    value={values.name}
                  />
                  <Form.Select
                    style={{ margin: "35px auto 0% auto", width: "80%" }}
                    required
                    onChange={handleChange}
                  >
                    <option value={values.store}>{values.store}</option>
                    {tasks.map((task) => (
                      <option value={task.data.name}>{task.data.name}</option>
                    ))}
                  </Form.Select>

                  <FormControl
                    style={{ margin: "35px auto 0% auto", width: "80%" }}
                    placeholder="輸入商品金額"
                    onChange={handleChange}
                    type="text"
                    name="price"
                    value={values.price}
                  />
              
                  <button
                    type="submit"
                    style={{
                      color: "#ffffff",
                      backgroundColor: "#069A8E",
                      borderRadius: "30px",
                      fontSize: "16px",
                      width: "120px",
                      textAlign: "center",
                      height: "35px",
                      fontWeight: "bold",
                      margin: "35px auto 35px auto",
                      border: "none"
                    }}
                  >
                    送出修改
                  </button>
                  {/* )} */}
                </form>
              </Card>
            </Col>
          </Row>
      
        </div>
      </Container>
    </div>
  );
}

export default UpdateGoods;
