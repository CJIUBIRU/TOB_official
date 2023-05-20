import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
// import img from "../img/tablet.jpg";
import "../App.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { collection, query, onSnapshot, where } from "firebase/firestore";
import { db } from "../utils/firebase";
import "../App.css";

function DemandStep2({ id, name, store, user, demandList, setDemandList, pic, price }) {
  const card = {
    marginBottom: "20px",
    marginLeft: "10%",
    marginRight: "10%",
    padding: "5px",
    color: "#002B5B",
    width: "80%",
    // display: "flex",
    // flexDirection: "row",
  };
  const contentStyle = {
    textAlign: "left",
    marginLeft: "30px",
    letterSpacing: "2px",
  };
  const demandHrefStyle = {
    color: "#90AACB",
  };
  const goodsImgStyle = {
    marginTop: "40px",
    width: "150px",
    height: "150px",
  };
  const inputStyle = {
    border: "1.5px solid #90AACB",
    width: "15%",
    height: "30px",
    textAlign: "center",
  };
  const inputSecStyle = {
    border: "1.5px solid #90AACB",
    width: "75%",
    height: "30px",
  };
  const btnDashStyle = {
    backgroundColor: "#002B5B",
    width: "30px",
    height: "30px",
    paddingTop: "0px",
    textAlign: "left",
    border: "none",
    borderRadius: "100px",
    marginLeft: "3px",
    marginRight: "3px",
  };
  const btnAddStyle = {
    backgroundColor: "#002B5B",
    width: "30px",
    height: "30px",
    paddingTop: "0px",
    textAlign: "left",
    border: "none",
    borderRadius: "100px",
    marginLeft: "3px",
    marginRight: "3px",
    paddingLeft: "9px",
  };

  const [count, setCount] = useState(1);
  const [demandInfo, setDemandInfo] = useState("");

  function handleChange(e) {
    e.preventDefault();
    let value = Number(e.target.value);
    if (value <= 0 || value === "-") {
      setCount(0);
      value = 0;
    } else setCount(value);
    handleData(value, demandInfo);
  }

  function handlePlus() {
    let value = count + 1;
    setCount(value);
    handleData(value, demandInfo);
  }

  function handleMinus() {
    if (count > 1) {
      let value = count - 1;
      setCount(value);
      handleData(value, demandInfo);
    }
  }

  function handleDemendInfo(e) {
    let demandInfoValue = e.target.value;
    setDemandInfo(demandInfoValue);
    handleData(count, demandInfoValue);
  }

  // 抓charity DB data
  const [charityData, setCharityData] = useState();
  // console.log(charityData);
  useEffect(() => {
    let userEmail = JSON.parse(localStorage.getItem("email"));
    const q = query(
      collection(db, "charity"),
      where("info.mail", "==", userEmail)
    );
    onSnapshot(q, (querySnapshot) => {
      setCharityData(
        querySnapshot.docs.map((doc) => ({
          name: doc.data().info.name,
          category: doc.data().info.details.category
        }))
      );
    });
  }, []);

  // 更新 chairyName
  // useEffect(() => {
  //   if (charityData) {
  //     setCharityName2(charityData[0].data.info.name);
  //   } else {
  //     setCharityName2("");
  //   }
  // }, [charityData]);

  function handleData(value, demandInfoValue) {
    if (value > 0 && demandInfoValue !== "") {
      if (demandList.some((e) => e.id === id)) {
        // 存在前一個相同id的資料
        let newDemandList = demandList.filter((e) => {
          return e.id !== id;
        });
        newDemandList.push({
          id,
          name,
          store,
          pic,
          price,
          count: value,
          demandInfo: demandInfoValue,
          charityName: charityData[0].name,
          charityCategory: charityData[0].category
        });
        setDemandList(newDemandList);
        localStorage.setItem("demandList", JSON.stringify(newDemandList));
      } else {
        // 不存在前一個相同id的資料
        demandList.push({
          id,
          name,
          store,
          pic,
          price,
          count: value,
          demandInfo: demandInfoValue,
          charityName: charityData[0].name,
          charityCategory: charityData[0].category
        });
        localStorage.setItem("demandList", JSON.stringify(demandList));
      }
    }
  }

  return (
    <div>

      <Card style={card} onChange={handleData}>
        <div className="grid_demand">
          <div>
            <center>
              <Card.Img
                style={goodsImgStyle}
                variant="top"
                src={pic}
              />
            </center>
          </div>

          <div>
            <Card.Body style={contentStyle}>
              <Card.Title>
                <b>{name}</b>
              </Card.Title>
              <hr></hr>
              <Card.Text style={{ color: "#6C6C6C" }}>
                需求機構：<b>{charityData ? charityData[0].name : ""}</b>
                <br />
                <br />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    lineHeight: "30px",
                  }}
                >
                  需求數量：
                  <Button
                    style={btnDashStyle}
                    variant="primary"
                    onClick={handleMinus}
                  >
                    -
                  </Button>
                  <Form.Control
                    type="text"
                    style={inputStyle}
                    value={count}
                    onChange={handleChange}
                  />
                  <Button
                    style={btnAddStyle}
                    variant="primary"
                    onClick={handlePlus}
                  >
                    +
                  </Button>
                </div>
                <br />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    lineHeight: "30px",
                  }}
                >
                  需求說明：
                  <Form.Control
                    style={inputSecStyle}
                    value={demandInfo}
                    placeholder="請輸入需求說明..."
                    onChange={(e) => handleDemendInfo(e)}
                  />
                </div>
                <br />
                物資提供商家：
                <a style={demandHrefStyle} href="#">
                  {store}
                </a>
              </Card.Text>
            </Card.Body>
          </div>
        </div>
      </Card >

    </div >
  );
}

export default DemandStep2;
