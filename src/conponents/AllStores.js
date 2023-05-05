import React, { useState, useEffect } from "react";
import Navbar from "../elements/navbarAdmin";
import TitleSec from "../elements/titleSec";
import Card from "react-bootstrap/Card";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { Container } from "react-bootstrap";
import {
  collection,
  query,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../utils/firebase";
import { Link } from "react-router-dom";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router";

function Stores({ id, name, phone, address, num }) {
  const uploadStoreData = (item) => {
    localStorage.setItem("store", JSON.stringify(item));
  };
  const editIconStyle = {
    backgroundColor: "#f6c23e",
    height: "40px",
    marginLeft: "10px",
    width: "40px",
    fontSize: "16px",
    borderRadius: "50%",
    textAlign: "center",
    color: "white",
    border: "none",
    lineHeight: "25px",
  };
  const trashIconStyle = {
    backgroundColor: "#e74a3b",
    height: "40px",
    marginLeft: "10px",
    width: "40px",
    fontSize: "16px",
    borderRadius: "50%",
    textAlign: "center",
    color: "white",
    border: "none",
  };
  const handleDelete = async (id) => {
    const taskDocRef = doc(db, "stores", id);
    try {
      alert("刪除成功。");
      await deleteDoc(taskDocRef);
    } catch (err) {
      alert(err);
    }
  };

  return (
    <>
      <tr>
        <th scope="row" data-th="#" >{num}</th>
        <td data-th="店家名稱" >{name}</td>

        <td data-th="修改資訊／撤銷" >
          <Button
            style={editIconStyle}
            variant="primary"
            as={Link}
            to="/updateStores"
            onClick={(e) =>
              uploadStoreData({
                id: id,
                name: name,
                address: address,
                phone: phone,
              })
            }
          >
            <FontAwesomeIcon icon={faPenToSquare} />
          </Button>
          <Button
            style={trashIconStyle}
            variant="primary"
            type="submit"
            onClick={() => handleDelete(id)}
          >
            <FontAwesomeIcon icon={faTrashCan} />
          </Button>
        </td>
      </tr>
    </>
  );
}

function UploadGoods() {
  const navigate = useNavigate("");
  const [user] = useAuthState(auth);
  if (!user) {
    navigate("/signIn");
  }
  const [details, setDetails] = useState([]);
  const cardStyle = {
    width: "90%",
    color: "black",
    left: "50%",
    marginTop: "35px",
    transform: `translate(${-50}%, ${-5}%)`,
    paddingTop: "10px",
    paddingBottom: "10px",
    paddingLeft: "10px",
    paddingRight: "10px",
    letterSpacing: "1px",
  };

  useEffect(() => {
    const q = query(collection(db, "stores"));
    onSnapshot(q, (querySnapshot) => {
      setDetails(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);

  return (
    <div>
      <Navbar />
      <div style={{marginTop: "-80px"}}>
        <TitleSec name="合作店家一覽表" color="#7BBFBA" />
      </div>
      <br />
      <Container>
        <div style={{ textAlign: "center" }}>
          <Card style={cardStyle}>
            <Card.Body>
              <Table striped bordered hover responsive className="table-rwd">
                <thead>
                  <tr class="tr-only-hide">
                    <th scope="col">#</th>
                    <th scope="col">店家名稱</th>

                    <th scope="col">修改資訊／撤銷</th>
                  </tr>
                </thead>
                <tbody>
                  {details.map((item, index) => (
                    <Stores
                      key={index}
                      id={item.id}
                      name={item.data.name}
                      phone={item.data.phone}
                      address={item.data.address}
                      num={index + 1}
                    />
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </div>
  );
}

export default UploadGoods;
