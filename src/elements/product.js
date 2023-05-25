import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "./button";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";
import { collection, query, onSnapshot, limit } from "firebase/firestore";
import { db } from "../utils/firebase";
import "../App.css";

function Task({ id, name, charity, quantity, description, store, price, pic }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [user] = useAuthState(auth);
  const card = {
    marginBottom: "20px",
    marginLeft: "10px",
    marginRight: "10px",
    padding: "45px 40px 10px 40px",
    height: "auto",
    display: "grid",
    gridTemplateColumns: "1fr",
  };
  return (
    <div>
      <Card style={card}>
        <div style={{margin: "auto"}}>
          <Card.Img style={{ width: "180px", height: "180px" }} src={pic} />
        </div>
        <Card.Body>
          <div>
            <Card.Title>
              物資名稱：<b>{name}</b>
            </Card.Title>
          </div>
          <hr></hr>
          <Card.Text>
            <div>需求機構：{charity}</div>
            <div>需求數量：10</div>
            <div>需求說明：{description}</div>
            <div>物資提供商家：{store}</div>
            <div>單價：${price}</div>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

function Product() {
  const [details, setDetails] = useState([]);
  useEffect(() => {
    const q = query(collection(db, "demand"), limit(6));
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
      <div className="cardPageGrid">
        {details.map((item) => (
          <Task
            id={item.id}
            name={item.data.name}
            charity={item.data.charity}
            quantity={item.data.quantity}
            description={item.data.description}
            store={item.data.store}
            price={item.data.price}
            pic={item.data.pic}
          />
        ))}
      </div>
    </div>
  );
}

export default Product;
