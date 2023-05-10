import { Nav } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { collection, query, onSnapshot, limit, orderBy } from "firebase/firestore";
import { db } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";
import Accordion from 'react-bootstrap/Accordion';

function Task({ id, merchantTradeDate, paymentDate, paymentStatus, paymentType, totalAmount, uid, tradeNo, merchantTradeNo }) {
  const [user] = useAuthState(auth);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const card = {
    marginBottom: "20px",
    marginLeft: "10px",
    marginRight: "10px",
    padding: "45px 40px 10px 40px",
    color: "#002B5B",
  };
  const contentStyle = {
    marginTop: "15px",
    textAlign: "center",
  };
  const demandHrefStyle = {
    color: "#90AACB",
  };
  const goodsImgStyle = {
    width: "200px",
    marginLeft: "15%",
    marginRight: "75%",
  };
  const cardText = {
    color: "#6C6C6C",
    textAlign: "left",
    marginLeft: "3px",
  };
  return (
    <div>
      {uid === user.uid && tradeNo && (
        <div>
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                <Card>
                  <Card.Body>
                    <Card.Text>
                      訂單編號：{merchantTradeNo}<br />
                      訂單成立時間：{merchantTradeDate}<br />
                      交易編號：{tradeNo}<br />
                      付款時間：{paymentDate}<br />
                      付款狀態：{paymentStatus}<br />
                      付款方式：{paymentType}<br />
                      訂單金額：{totalAmount}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Accordion.Header>
              <Accordion.Body>

              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      )}
    </div>
  );
}

function Task2({ id, merchantTradeDate, paymentDate, paymentStatus, paymentType, totalAmount, uid, tradeNo, merchantTradeNo }) {
  const [user] = useAuthState(auth);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const card = {
    marginBottom: "20px",
    marginLeft: "10px",
    marginRight: "10px",
    padding: "45px 40px 10px 40px",
    color: "#002B5B",
  };
  const contentStyle = {
    marginTop: "15px",
    textAlign: "center",
  };
  const demandHrefStyle = {
    color: "#90AACB",
  };
  const goodsImgStyle = {
    width: "200px",
    marginLeft: "15%",
    marginRight: "75%",
  };
  const cardText = {
    color: "#6C6C6C",
    textAlign: "left",
    marginLeft: "3px",
  };
  return (
    <div>
      {uid === user.uid && !tradeNo && (
        <div style={{marginBottom: "10px"}}>
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                <Card>
                  <Card.Body>
                    <Card.Text>
                      訂單編號：{merchantTradeNo}<br />
                      訂單成立時間：{merchantTradeDate}<br />
                      付款狀態：{paymentStatus}<br />
                      訂單金額：{totalAmount}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Accordion.Header>
              <Accordion.Body>

              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      )}
    </div>
  );
}

function Record() {
  const [details, setDetails] = useState([]);
  useEffect(() => {
    const q = query(collection(db, "donate"), orderBy("merchantTradeDate", "desc"));
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
    <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gridGap: "10px" }}>
      <div>
        <div>
          {details.map((item) => (
            <Task
              id={item.id}
              merchantTradeDate={item.data.merchantTradeDate}
              paymentDate={item.data.paymentDate}
              paymentStatus={item.data.paymentStatus}
              paymentType={item.data.paymentType}
              totalAmount={item.data.totalAmount}
              uid={item.data.uid}
              tradeNo={item.data.tradeNo}
              merchantTradeNo={item.data.merchantTradeNo}
            />
          ))}
        </div>
      </div>
      <div>
        <div>
          {details.map((item) => (
            <Task2
              id={item.id}
              merchantTradeDate={item.data.merchantTradeDate}
              paymentDate={item.data.paymentDate}
              paymentStatus={item.data.paymentStatus}
              paymentType={item.data.paymentType}
              totalAmount={item.data.totalAmount}
              uid={item.data.uid}
              tradeNo={item.data.tradeNo}
              merchantTradeNo={item.data.merchantTradeNo}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Record;
