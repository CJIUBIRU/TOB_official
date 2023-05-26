import { Col, Container, Row } from "react-bootstrap";
import React, { useState, useEffect } from "react";
// import ListGroup from "react-bootstrap/ListGroup";
import Pagination from "react-bootstrap/Pagination";
import "../App.css";
import TitleSec from "../elements/titleSec";
import TitleStep from "../elements/titleStep";
import FromSelect from "../elements/fromSelect";
import Search from "../elements/search";
import ProductStep1 from "../elements/productStep1";
import ButtonLink from "../elements/button";
import PaginationList from "../elements/paginationList";
import NavbarMember from "../elements/navbarMember";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";
import NavbarHome from "../elements/navbarHome";
import { collection, query, onSnapshot, where } from "firebase/firestore";
import { db } from "../utils/firebase";
import Step from "@mui/material/Step";
import Stepper from "@mui/material/Stepper";
import StepLabel from "@mui/material/StepLabel";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const DonateList = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [user] = useAuthState(auth);
  const [searchName, setSearchName] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  const [donateCart, setDonateCart] = useState([]);
  const [finalCharityList, setFinalCharityList] = useState();
  console.log(finalCharityList);


  const handleSearchChange = (value) => {
    setSearchName(value);
  };

  const donPageStyle = {
    marginTop: "70px",
  };
  const [details, setDetails] = useState([]);
  useEffect(() => {
    let q = collection(db, "demand");
    //搜尋過濾第三步
    if (searchCategory) {
      q = query(q, where("category", "==", searchCategory));
    }

    if (searchName) {
      q = query(q, where("charity", ">=", searchName));
    }

    onSnapshot(q, (querySnapshot) => {
      const filteredDocs = querySnapshot.docs.filter((doc) => doc.data().quantity > 0);
      setDetails(
        filteredDocs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, [searchCategory, searchName]);

  useEffect(() => {
    let charityList = [];
    let donateList2 = [];
    const q2 = query(collection(db, "charity"), where("info.status", "==", "已啟用"));
    onSnapshot(q2, (querySnapshot) => {
      querySnapshot.docs.forEach((doc) => {
        const { info } = doc.data();
        charityList.push({ name: info.name, count: 0 });
      })

      const q3 = query(collection(db, "donate"), where("paymentStatus", "==", "已付款"));
      onSnapshot(q3, (querySnapshot) => {
        querySnapshot.docs.forEach((doc) => {
          const { donateList } = doc.data();
          donateList2.push(donateList);
        })

        let newCharityList = [];

        // 初始化 newCharityList
        for (const item of charityList) {
          newCharityList.push({
            name: item.name,
            count: 0
          });
        }

        // 更新 newCharityList 中的次數
        for (const list of donateList2) {
          for (const item of list) {
            const charityName = item.charity;
            const foundCharity = newCharityList.find((charity) => charity.name === charityName);
            if (foundCharity) {
              foundCharity.count++;
            }
          }
        }

        // 按照 count sorting
        newCharityList.sort((a, b) => b.count - a.count);

        setFinalCharityList(newCharityList);
      });
    });
  }, []);



  return (
    <div>
      {user ? <NavbarMember /> : <NavbarHome />}
      <div style={donPageStyle}>
        <TitleSec name="認購物資列表" color="#F4D19B" />
        <Container>
          <TitleStep name="STEP1&nbsp;-&nbsp;選擇認購物資" />
          <Stepper alternativeLabel style={{ margin: "30px 0px 30px 0px" }}>
            <Step key={2}>
              <StepLabel>選擇認購物資</StepLabel>
            </Step>
            <Step key={3}>
              <StepLabel>填寫資料</StepLabel>
            </Step>
            <Step key={4}>
              <StepLabel>確認資料</StepLabel>
            </Step>
            <Step key={5}>
              <StepLabel>付款</StepLabel>
            </Step>
          </Stepper>
          <div style={{ display: "grid", gridTemplateColumns: "50%  50%" }}>
            <div>
              <Form.Select
                style={{ width: "60%", marginLeft: "38%" }}
                value={searchCategory}
                onChange={(e) => setSearchCategory(e.target.value)}
              >
                <option value="">請選擇類別</option>
                <option value="綜合性服務">綜合性服務</option>
                <option value="兒童青少年">兒童青少年</option>
                <option value="婦女福利">婦女福利</option>
                <option value="老人福利">老人福利</option>
                <option value="身心障礙福利">身心障礙福利</option>
                <option value="家庭福利">家庭福利</option>
                <option value="健康醫療">健康醫療</option>
                <option value="心理衛生">心理衛生</option>
                <option value="社區規劃">社區規劃</option>
                <option value="環境保護">環境保護</option>
                <option value="國際合作交流">國際合作交流</option>
                <option value="教育與科學">教育與科學</option>
                <option value="文化藝術">文化藝術</option>
                <option value="人權和平">人權和平</option>
                <option value="消費者紀錄">消費者紀錄</option>
                <option value="性別平等">性別平等</option>
                <option value="政府單位">政府單位</option>
                <option value="動物保護">動物保護</option>
              </Form.Select>
            </div>
            <div>
              <Form.Control
                style={{ width: "60%", marginLeft: "2%" }}
                type="text"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                placeholder="搜尋機構名稱"
              />
            </div>
          </div>
          {user && (
            <center>
              <Button style={{ backgroundColor: "#f58d59", border: "none", borderRadius: "30px", fontWeight: "bold", marginTop: "35px" }} variant="primary" onClick={handleShow}>
                機構認購次數統計
              </Button>
            </center>
          )}

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>機構認購次數統計</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>認購時，不妨多看看排名較低的合作機構唷！</p>
              <hr />
              {finalCharityList &&
                finalCharityList.map((item, index) => (
                  <p key={index}>{index + 1}. {item.name}</p>
                ))
              }
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                關閉
              </Button>
              {/* <Button variant="primary" onClick={handleClose}>
                Save Changes
              </Button> */}
            </Modal.Footer>
          </Modal>
          <br></br>
          {details
            .filter((item) => {
              if (searchCategory && item.data.category !== searchCategory) {
                return false;
              }
              if (searchName && !item.data.charity.includes(searchName)) {
                return false;
              }
              return true;
            })
            .map((item, index) => (
              <ProductStep1
                key={index}
                id={item.id}
                name={item.data.name}
                pic={item.data.pic}
                store={item.data.store}
                quantity={item.data.quantity}
                received={item.data.received}
                charity={item.data.charity}
                description={item.data.description}
                price={item.data.price}
                donateCart={donateCart}
                setDonateCart={setDonateCart}
              />
            ))}
          {user ? (
            <center style={{ margin: "30px" }}>
              <ButtonLink to="/donateListSec" name="下一步" color="#f58d59" />
            </center>
          ) : (

            <center>
              <button
                style={{
                  color: "#ffffff",
                  backgroundColor: "lightgray",
                  border: "none",
                  borderRadius: "30px",
                  fontSize: "16px",
                  width: "180px",
                  textAlign: "center",
                  height: "35px",
                  fontWeight: "bold",
                  marginBottom: "50px",
                  marginTop: "30px"
                }}
              >
                登入後可進行下一步
              </button>
            </center>
          )}
        </Container>
      </div>
    </div>
  );
};

export default DonateList;