//打rcc+ENTER
import React, { useState, useEffect } from "react";
import "../App.css";
import Slider from "react-slick";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import Product from "../elements/product";
import {
  collection,
  query,
  onSnapshot,
  limit,
  orderBy,
  where,
} from "firebase/firestore";
import { db } from "../utils/firebase";
import HomePage from "../img/homePage.png"

function NavbarComp() {
  const bodyStyle = {
    backgroundColor: "#ffffff",
  };
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };
  const settingsSec = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
  };
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
  const titleSec = {
    fontWeight: "bold",
  };

  // 推播分析：瀏覽紀錄
  const [charityData, setCharityData] = useState([]);
  const [charityData2, setCharityData2] = useState([]);
  // console.log(charityData2);

  useEffect(() => {
    let fetchedCharityData = [];
    let fetchedCharityData2 = [];
    let openData = [];
    let counter = 0;

    const q = query(
      collection(db, "clickLog"),
      orderBy("clickCount", "desc"),
      limit(6)
    );
    onSnapshot(q, (querySnapshot) => {
      querySnapshot.docs.map((doc) => {
        const id = doc.id;
        const docRef = query(collection(db, "charity"), where("uid", "==", id));
        onSnapshot(docRef, (querySnapshot) => {
          querySnapshot.docs.map((doc) => {
            fetchedCharityData.push(doc.data());
            counter++;
            if (counter === 6) {
              setCharityData(fetchedCharityData);
            }
            return console.log("OK");
          });
        });
        return console.log("OK");
      });
    });

    const q2 = query(
      collection(db, "govDonate"),
      orderBy("donateCount", "desc"),
      limit(3)
    );
    onSnapshot(q2, (querySnapshot) => {
      querySnapshot.docs.map((doc) => openData.push(doc.data()));
      console.log(openData);
      let tag = openData.reduce((acc, cur) => {
        // 將所有類別合併成一個陣列
        const category = cur.category;
        acc.push(...category);
        return acc;
      }, []);

      // 移除重複的項目
      tag = [...new Set(tag)];
      const q = query(collection(db, "charity"));
      onSnapshot(q, (querySnapshot) => {
        querySnapshot.docs.map((doc) => fetchedCharityData2.push(doc.data()));
        const filteredData = fetchedCharityData2.filter((item) =>
          tag.includes(item.info.details.category)
        );
        setCharityData2(filteredData);
      });
    });
  }, []);

  return (
    <div style={{ marginTop: "75px" }}>
      {/* <div><img src={HomePage} alt="HomePage"></img></div> */}
      <div style={bodyStyle}>
        <div style={{ height: "70px" }}></div>
        <div style={{ backgroundColor: "#fef1e6" }}>
          <Slider {...settings}>
            {charityData2.map((item, index) => (
              <div key={index}>
                <center>
                  <img
                    style={report1}
                    src={item.file?.img?.photo}
                    alt={item.info?.name}
                  />
                </center>
              </div>
            ))}
          </Slider>
        </div>
        <img style={{ width: "100%", marginTop: "35px" }} src={HomePage} alt="bgPhoto" />

        <div>
          <Container>
            <div
              style={{
                margin: "40px 0px 0px 0px",
                padding: "20px 0px 30px 0px",
              }}
            >
              <h5 style={titleSec}>最新消息</h5>
              <Slider {...settingsSec}>
                {charityData.length === 6
                  ? charityData.map((item, index) => (
                    <div key={index}>
                      <img
                        style={report2}
                        src={item.file?.img?.photo}
                        alt={item.info?.name}
                      />
                    </div>
                  ))
                  : Array(3)
                    .fill()
                    .map((_, index) => (
                      <div key={index}>
                        <h4 style={report2}>Loading...</h4>
                      </div>
                    ))}
              </Slider>
            </div>
          </Container>
        </div>
        <div style={{ backgroundColor: "white" }}>
          <Container>
            <div style={{ padding: "20px 0px 30px 0px" }}>
              <h5 style={titleSec}>機構需求物資</h5>
              <div>
                <Product />
              </div>
            </div>
          </Container>
        </div>
      </div>
    // </div>
  );
}

export default NavbarComp;
