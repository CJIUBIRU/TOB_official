import React, { useState, useEffect } from "react";
import "../App.css";
import Container from "react-bootstrap/Container";
import NavbarMember from "../elements/navbarMember";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import TagType from "../elements/tagType";
import { collection, query, onSnapshot, where } from "firebase/firestore";
import { db } from "../utils/firebase";

import TitleSec from "../elements/titleSec";
// import CharityCard from '../elements/charityCard';
import Form from 'react-bootstrap/Form';
import NavbarHome from "../elements/navbarHome";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";

function CharityCard({ id, category, name, mail, tel, logo }) {
  // CharityDetail
  const charityDetailData = (item) => {
    localStorage.setItem("CharityDetail", JSON.stringify(item));
  };

  const btnStyle = {
    color: "#ffffff",
    backgroundColor: "#F58D59",
    borderRadius: "30px",
    fontSize: "16px",
    width: "120px",
    textAlign: "center",
    height: "35px",
    fontWeight: "bold",
    border: "none",
  };
  const imgStyle = {
    width: "150px",
    height: "120px",
    margin: "30px",
    borderRadius: "10px",
  };
  const nameStyle = {
    fontWeight: "bold",
    // color: "#002B5B",
    textAlign: "center",
    paddingBottom: "10px",
  };
  const dataStyle = {
    textAlign: "center",
    left: "50%",
  };

  return (
    <div style={{ display: "inline-block", margin: "10px" }}>
      <Card>
        <div style={{ textAlign: "center" }}>
          <Card.Img style={imgStyle} variant="top" src={logo} />
        </div>

        <Card.Body>
          <TagType name={category} />
          <div style={{ height: "160px" }}>
            <Card.Title style={nameStyle}>{name}</Card.Title>
            <Card.Text style={dataStyle}>
              <p>
                <FontAwesomeIcon icon={faEnvelope} />：{mail}
              </p>
              <p>
                <FontAwesomeIcon icon={faPhone} />：{tel}
              </p>
            </Card.Text>
          </div>
          <div className="charityBtn">
            <div></div>
            <div>
              <Button
                style={btnStyle}
                as={Link}
                to="/charityDetail"
                onClick={(e) => charityDetailData({ name: name })}
                variant="primary"
                name="了解更多"
              >
                了解更多
              </Button>
            </div>
            <div></div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

function Charity() {
  const [user] = useAuthState(auth);

  const [details, setDetails] = useState([]);

  //搜尋過濾第一步
  const [searchCategory, setSearchCategory] = useState("");
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    let q = query(
      collection(db, "charity"),
      where("info.status", "==", "已啟用")
    );
    //搜尋過濾第三步
    if (searchCategory) {
      q = query(q, where("info.details.category", "==", searchCategory));
    }

    if (searchName) {
      q = query(q, where("info.name", ">=", searchName));
    }
    onSnapshot(q, (querySnapshot) => {
      setDetails(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, [searchCategory, searchName]);
  return (
    <div>
      {user && <NavbarMember />}
      {!user && <NavbarHome />}
      <TitleSec name="合作機構一覽表" color="#F4D19B" />
      <Container>
        {/* , display: "flex", flexDirection: "row" */}
        <div>
          {/* 搜尋過濾第二步 */}

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
                style={{ width: "60%", marginLeft: "2%"  }}
                type="text"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                placeholder="搜尋機構名稱"
              />
            </div>
          </div><br></br>
          <div className="charityStyle">
            {/* 搜尋過濾第四步 */}
            {details
              .filter((item) => {
                if (searchCategory && item.data.info.details.category !== searchCategory) {
                  return false;
                }
                if (searchName && !item.data.info.name.includes(searchName)) {
                  return false;
                }
                return true;
              })
              .map((item, index) => (
                <CharityCard
                  key={index}
                  id={item.id}
                  name={item.data.info.name}
                  category={item.data.info.details.category}
                  mail={item.data.info.mail}
                  tel={item.data.info.tel}
                  logo={item.data.file.img.logo}
                />
              ))}

          </div>
        </div>
      </Container>
    </div>
  );
}

export default Charity;
