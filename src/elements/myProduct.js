import React, { useState, useEffect } from "react";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { faQrcode } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Card from "react-bootstrap/Card";
// import img from "../img/tablet.jpg";
import {
  collection,
  query,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";
import { Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../App.css";

function Task({
  availability,
  charity,
  description,
  name,
  photo,
  quantity,
  received,
  state,
  store,
  uid,
  id,
  pic,
}) {
  const [user] = useAuthState(auth);

  const contentStyle = {
    textAlign: "left",
    letterSpacing: "2px",
  };
  const editIconStyle = {
    backgroundColor: "#f6c23e",
    height: "40px",
    width: "40px",
    fontSize: "17px",
    borderRadius: "50%",
    textAlign: "center",
    color: "white",
    border: "none",
    lineHeight: "35px",
  };
  const trashIconStyle = {
    backgroundColor: "#e74a3b",
    height: "40px",
    width: "40px",
    fontSize: "17px",
    borderRadius: "50%",
    textAlign: "center",
    color: "white",
    lineHeight: "38px",
    border: "none",
  };
  const uploadMyDemand = (item) => {
    localStorage.setItem("good", JSON.stringify(item));
  };

  const handleDelete = async (id) => {
    const taskDocRef = doc(db, "demand", id);
    try {
      alert("已下架需求。");
      await deleteDoc(taskDocRef);
    } catch (err) {
      alert(err);
    }
  };
  return (
    <div>
      {user.uid === uid && (
        <Card className="productGrid">
          <div>
            <Card.Img className="productImgGrid" variant="top" src={pic} />
          </div>
          <div>
            <Card.Body style={contentStyle}>
              <Card.Title>
                物資名稱：<b>{name}</b>
              </Card.Title>
              <hr></hr>
              <Card.Text style={{ color: "#6C6C6C" }}>
                需求機構：{charity}
                <br />
                需求數量：{quantity}
                <br />
                需求說明：{description}
                <br />
                物資提供商家：
                {/* <a style={demandHrefStyle} href="#"> */}
                {store}
                {/* </a> */}
                <br />
                目前可領取／已領取數量：{availability}／{received}
                {/* <br /> */}
                {/* 目前數量：{received} */}
              </Card.Text>
            </Card.Body>
          </div>
          <div>
            <center>
            <table style={{paddingBottom: "0px"}}>
              <tr>
                <td>
                  <Nav.Link
                    style={editIconStyle}
                    as={Link}
                    to="/updateMyDemand"
                    onClick={(e) =>
                      uploadMyDemand({
                        id: id,
                        quantity: quantity,
                        description: description,
                        availability: availability,
                        charity: charity,
                        name: name,
                        photo: photo,
                        received: received,
                        state: state,
                        store: store,
                        uid: uid,
                        pic: pic,
                      })
                    }
                  >
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </Nav.Link>
                </td>
                <td style={{width: "3px"}}></td>
                <td>

                  <Nav.Link style={trashIconStyle} onClick={() => handleDelete(id)}>
                    <FontAwesomeIcon icon={faTrashCan} />
                  </Nav.Link>
                  </td>
              </tr>
            </table>
            </center>
          </div>
        </Card>
      )}
    </div>
  );
}

function MyProduct() {
  const [details, setDetails] = useState([]);
  useEffect(() => {
    const q = query(collection(db, "demand"));
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
      <Container>
        {details.map((item) => (
          <Task
            id={item.id}
            key={item.id}
            availability={item.data.availability}
            charity={item.data.charity}
            description={item.data.description}
            name={item.data.name}
            photo={item.data.photo}
            quantity={item.data.quantity}
            received={item.data.received}
            state={item.data.state}
            store={item.data.store}
            uid={item.data.uid}
            pic={item.data.pic}
          />
        ))}
      </Container>
    </div>
  );
}

export default MyProduct;
