//打rcc+ENTER
import React from "react";
// import "../navLink.css";
import Slider from "react-slick";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import Product from "../elements/product";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";
import {
  collection,
  query,
  onSnapshot,
  where,
  select,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../utils/firebase";
import News from "../elements/newsAdmin";
import NewsCharity from "../elements/newsCharity";
import Notes from "../elements/notesAdmin";
import NotesCharity from "../elements/notesCharity";
import HomeImg from "../img/home.jpg";
import MyProduct from "../elements/myProduct";
import { Card } from "react-bootstrap";
import QrCodeList from "../elements/qrCodeList";
import ManagerProveList from "../elements/managerProveList";
import AllGoodsList from "../elements/allGoodsList";
import "../App.css";

function Task({ id, email, level }) {
  const [user] = useAuthState(auth);
  const report1 = {
    width: "100%",
    height: "550px",
    textAlign: "center",
    lineHeight: "280px",
    backgroundColor: "#FEF1E6",
    objectFit: "cover",
  };
  const report2 = {
    height: "300px",
    textAlign: "center",
    lineHeight: "280px",
    backgroundColor: "#FEF1E6",
    fontSize: "18px",
    margin: "5px",
  };

  const [donateRecord, setDonateRecord] = useState(null);
  console.log(donateRecord);
  useEffect(() => {
    let donateRecordTmp = [];
    const q = query(
      collection(db, "donate"),
      where("uid", "==", user.uid),
      where("paymentStatus", "==", "已付款")
    );
    onSnapshot(q, (querySnapshot) => {
      querySnapshot.docs.forEach((doc) => {
        donateRecordTmp.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      const recordIDs = donateRecordTmp.map((record) =>
        record.donateList.map((item) => item.charity)
      );
      const flattenIDs = recordIDs.reduce((acc, cur) => [...acc, ...cur], []);
      const idCounts = flattenIDs.reduce((counts, id) => {
        counts[id] = (counts[id] || 0) + 1;
        return counts;
      }, {});

      const topIDs = Object.entries(idCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map((entry) => entry[0]);
      setDonateRecord(topIDs);
    });
  }, [user]);

  const [charityData, setCharityData] = useState([]);
  // 預設資料
  const [charityData2, setCharityData2] = useState([
    {
      id: "001",
      name: "社團法人臺中市響響輔助科技協會",
      photo:
        "https://firebasestorage.googleapis.com/v0/b/donation-platform-54f2b.appspot.com/o/Photo%2F%E7%A4%BE%E5%9C%98%E6%B3%95%E4%BA%BA%E8%87%BA%E4%B8%AD%E5%B8%82%E9%9F%BF%E9%9F%BF%E8%BC%94%E5%8A%A9%E7%A7%91%E6%8A%80%E5%8D%94%E6%9C%83.png?alt=media&token=ca1b5491-0bd0-4424-95e1-e4b5c537c0a2",
    },
    {
      id: "002",
      name: "財團法人高雄市私立星星兒社會福利基金會",
      photo: "https://firebasestorage.googleapis.com/v0/b/donation-platform-54f2b.appspot.com/o/Photo%2F%E7%A4%BE%E5%9C%98%E6%B3%95%E4%BA%BA%E5%85%A8%E7%90%83%E5%B0%8F%E7%B4%85%E5%B8%BD%E5%8D%94%E6%9C%83.png?alt=media&token=d497d429-e175-470a-a182-bec5ef1718e7",
    },
  ]);
  console.log(charityData);
  useEffect(() => {
    let fetchedCharityData = [];
    if (donateRecord) {
      // 使用 forEach 方法遍歷 logData，依序查詢 Firestore 資料
      donateRecord.forEach((name) => {
        // console.log(id);
        const docRef = query(
          collection(db, "charity"),
          where("info.name", "==", name)
        );
        onSnapshot(docRef, (querySnapshot) => {
          querySnapshot.docs.map((doc) => fetchedCharityData.push(doc.data()));
          setCharityData(fetchedCharityData);
        });
      });
    }
  }, [donateRecord]);

  return (
    <div style={{ marginTop: "80px" }}>
      {!user && (
        <Container>
          <div style={{ backgroundColor: "#ffffff" }}>
            <div style={{ height: "70px" }}></div>
            <div>
              <Slider
                {...{
                  dots: true,
                  infinite: true,
                  speed: 500,
                  slidesToShow: 1,
                  slidesToScroll: 1,
                  autoplay: true,
                }}
              >
                <div>
                  <h4
                    style={{
                      height: "300px",
                      textAlign: "center",
                      lineHeight: "280px",
                      backgroundColor: "#FEF1E6",
                    }}
                  >
                    推播1
                  </h4>
                </div>
                <div>
                  <h4
                    style={{
                      height: "300px",
                      textAlign: "center",
                      lineHeight: "280px",
                      backgroundColor: "#FEF1E6",
                    }}
                  >
                    推播2
                  </h4>
                </div>
                <div>
                  <h4
                    style={{
                      height: "300px",
                      textAlign: "center",
                      lineHeight: "280px",
                      backgroundColor: "#FEF1E6",
                    }}
                  >
                    推播3
                  </h4>
                </div>
                <div>
                  <h4
                    style={{
                      height: "300px",
                      textAlign: "center",
                      lineHeight: "280px",
                      backgroundColor: "#FEF1E6",
                    }}
                  >
                    推播4
                  </h4>
                </div>
                <div>
                  <h4
                    style={{
                      height: "300px",
                      textAlign: "center",
                      lineHeight: "280px",
                      backgroundColor: "#FEF1E6",
                    }}
                  >
                    推播5
                  </h4>
                </div>
                <div>
                  <h4
                    style={{
                      height: "300px",
                      textAlign: "center",
                      lineHeight: "280px",
                      backgroundColor: "#FEF1E6",
                    }}
                  >
                    推播6
                  </h4>
                </div>
              </Slider>
            </div>

            <div style={{ margin: "40px 0px 30px 0px" }}>
              <h5 style={{ color: "#002B5B", fontWeight: "bold" }}>最新消息</h5>
              <Slider
                {...{
                  infinite: true,
                  speed: 500,
                  slidesToShow: 3,
                  slidesToScroll: 1,
                  autoplay: true,
                }}
              >
                <div>
                  <h4
                    style={{
                      height: "300px",
                      textAlign: "center",
                      lineHeight: "280px",
                      backgroundColor: "#FEF1E6",
                      fontSize: "18px",
                      margin: "5px",
                    }}
                  >
                    消息1
                  </h4>
                </div>
                <div>
                  <h4
                    style={{
                      height: "300px",
                      textAlign: "center",
                      lineHeight: "280px",
                      backgroundColor: "#FEF1E6",
                      fontSize: "18px",
                      margin: "5px",
                    }}
                  >
                    消息2
                  </h4>
                </div>
                <div>
                  <h4
                    style={{
                      height: "300px",
                      textAlign: "center",
                      lineHeight: "280px",
                      backgroundColor: "#FEF1E6",
                      fontSize: "18px",
                      margin: "5px",
                    }}
                  >
                    消息3
                  </h4>
                </div>
                <div>
                  <h4
                    style={{
                      height: "300px",
                      textAlign: "center",
                      lineHeight: "280px",
                      backgroundColor: "#FEF1E6",
                      fontSize: "18px",
                      margin: "5px",
                    }}
                  >
                    消息4
                  </h4>
                </div>
                <div>
                  <h4
                    style={{
                      height: "300px",
                      textAlign: "center",
                      lineHeight: "280px",
                      backgroundColor: "#FEF1E6",
                      fontSize: "18px",
                      margin: "5px",
                    }}
                  >
                    消息5
                  </h4>
                </div>
                <div>
                  <h4
                    style={{
                      height: "300px",
                      textAlign: "center",
                      lineHeight: "280px",
                      backgroundColor: "#FEF1E6",
                      fontSize: "18px",
                      margin: "5px",
                    }}
                  >
                    消息6
                  </h4>
                </div>
              </Slider>
            </div>

            <div style={{ margin: "40px 0px 30px 0px" }}>
              <h5 style={{ color: "#002B5B", fontWeight: "bold" }}>
                機構需求物資
              </h5>
              <Slider
                {...{
                  infinite: true,
                  speed: 500,
                  slidesToShow: 3,
                  slidesToScroll: 1,
                  autoplay: true,
                }}
              >
                <div>
                  <Product />
                </div>
                <div>
                  <Product />
                </div>
                <div>
                  <Product />
                </div>
                <div>
                  <Product />
                </div>
                <div>
                  <Product />
                </div>
                <div>
                  <Product />
                </div>
              </Slider>
            </div>

            <div style={{ margin: "40px 0px 30px 0px" }}>
              <h5 style={{ color: "#002B5B", fontWeight: "bold" }}>聯絡我們</h5>
              <div style={{ paddingTop: "5px" }}>
                <div
                  style={{
                    width: "100%",
                    height: "250px",
                    backgroundColor: "#FEF1E6",
                    textAlign: "center",
                    lineHeight: "230px",
                    fontWeight: "bold",
                  }}
                >
                  基本資訊
                </div>
              </div>
            </div>
          </div>
        </Container>
      )}
      {email === user.email && level === "member" && (
        <div style={{ backgroundColor: "#ffffff" }}>
          <div style={{ height: "70px" }}></div>
          <div style={{ backgroundColor: "#fef1e6" }}>
            <Slider
              {...{
                dots: true,
                infinite: true,
                speed: 500,
                slidesToShow: 1,
                slidesToScroll: 1,
                autoplay: true,
              }}
            >
              {charityData.length >= 1
                ? charityData.map((item, index) => (
                  <div key={index}>
                    <center>
                      <img
                        className="report1"
                        src={item.file?.img?.photo}
                        alt={item.info?.name}
                      />
                    </center>
                  </div>
                ))
                : charityData2.map((item, index) => (
                  <div key={index}>
                    <center>
                      <img className="report1" src={item.photo} alt={item.name} />
                    </center>
                  </div>
                ))}
            </Slider>
          </div>
          <Container>
            <div style={{ margin: "40px 0px 30px 0px" }}>
              <div style={{ padding: "20px 0px 30px 0px" }}>
                <h5 style={{ fontWeight: "bold" }}>機構需求物資</h5>
                <div>
                  <Product />
                </div>
              </div>
            </div>
          </Container>
        </div>
      )}
      {email === user.email && level === "admin" && (
        <Container style={{ marginBottom: "50px" }}>
          <div
            className="adminHome"
          >
            <div>
              <Card style={{ borderLeft: "3.5px solid #069a8e" }}>
                <Card.Header style={{ color: "#069a8e", fontWeight: "bold" }}>
                  申請資料審核
                </Card.Header>
                <Card.Body>
                  <ManagerProveList />
                </Card.Body>
              </Card>
            </div>
            <div>
              <Card style={{ borderLeft: "3.5px solid #069a8e" }}>
                <Card.Header style={{ color: "#069a8e", fontWeight: "bold" }}>
                  物資一覽表
                </Card.Header>
                <Card.Body>
                  <div style={{ marginLeft: "-20px" }}>
                    <AllGoodsList />
                  </div>
                </Card.Body>
              </Card>
            </div>
          </div>
        </Container>
      )}
      {email === user.email && level === "charity" && (
        <Container style={{ marginBottom: "50px" }}>
          <div
            style={{
              marginTop: "100px",
              textAlign: "center",
            }}
          >
            <a
              href="#我的需求"
              style={{
                color: "white",
                backgroundColor: "#002b5b",
                textDecoration: "none",
                fontWeight: "bold",
                padding: "10px 20px 10px 20px",
                borderRadius: "30px",
                marginRight: "20px",
              }}
            >
              我的需求
            </a>
            /
            <a
              href="#我的兌換條碼"
              style={{
                color: "white",
                backgroundColor: "#002b5b",
                textDecoration: "none",
                fontWeight: "bold",
                padding: "10px 20px 10px 20px",
                borderRadius: "30px",
                marginLeft: "20px",
              }}
            >
              我的兌換條碼
            </a>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr",
                gridGap: "20px",
                marginTop: "30px",
              }}
            >
              <div>
                <Card style={{ borderLeft: "3.5px solid #002b5b" }}>
                  <Card.Header
                    style={{
                      color: "#002b5b",
                      fontWeight: "bold",
                      backgroundColor: "var(--bs-card-cap-bg)",
                      textAlign: "left",
                    }}
                  >
                    <a name="我的需求">我的需求</a>
                  </Card.Header>
                  <Card.Body>
                    <MyProduct />
                  </Card.Body>
                </Card>
              </div>
              <div>
                <Card style={{ borderLeft: "3.5px solid #002b5b" }}>
                  <Card.Header
                    style={{
                      color: "#002b5b",
                      fontWeight: "bold",
                      backgroundColor: "var(--bs-card-cap-bg)",
                      textAlign: "left",
                    }}
                  >
                    <a name="我的兌換條碼">我的兌換條碼</a>
                  </Card.Header>
                  <Card.Body>
                    <QrCodeList />
                  </Card.Body>
                </Card>
              </div>
            </div>
            <div></div>
          </div>
        </Container>
      )}
    </div>
  );
}

function NavbarComp() {
  const [user] = useAuthState(auth);
  const [details, setDetails] = useState([]);
  // console.log(details);
  useEffect(() => {
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    onSnapshot(q, (querySnapshot) => {
      setDetails(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, [user]);
  return (
    <div>
      {/* <h1 style={{textAlign: "center", marginTop: "350px"}}>首頁</h1> */}
      {details.map((item) => (
        <Task
          id={item.id}
          key={item.id}
          level={item.data.level}
          email={item.data.email}
        />
      ))}
    </div>
  );
}

export default NavbarComp;
