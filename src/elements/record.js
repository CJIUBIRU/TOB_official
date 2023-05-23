import { Nav } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { collection, query, onSnapshot, limit, orderBy, where } from "firebase/firestore";
import { db } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";
import Accordion from 'react-bootstrap/Accordion';
import Alert from 'react-bootstrap/Alert';

function Task({ id, merchantTradeDate, paymentDate, paymentStatus, paymentType, totalAmount, uid, tradeNo, merchantTradeNo, donateList }) {
  // const [user] = useAuthState(auth);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  console.log(donateList);
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
      <div>
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              <Card>
                <Card.Body>
                  {
                    (paymentStatus === '已付款')
                      ? (
                        <Card.Text>
                          訂單編號：{merchantTradeNo}<br />
                          訂單成立時間：{merchantTradeDate}<br />
                          交易編號：{tradeNo}<br />
                          付款時間：{paymentDate}<br />
                          付款狀態：{paymentStatus}<br />
                          付款方式：{paymentType}<br />
                          訂單金額：{totalAmount}
                        </Card.Text>
                      )
                      : (
                        <Card.Text>
                          訂單編號：{merchantTradeNo}<br />
                          訂單成立時間：{merchantTradeDate}<br />
                          付款狀態：{paymentStatus}<br />
                          訂單金額：{totalAmount}
                        </Card.Text>
                      )
                  }
                </Card.Body>
              </Card>
            </Accordion.Header>
            <Accordion.Body>
              {donateList.map((item) => (
                <>
                  <Card style={card}>
                    <div style={{ margin: "auto" }}>
                      <Card.Img style={{ width: "180px", height: "180px" }} src={item.pic} />
                    </div>
                    <Card.Body>
                      <div>
                        <Card.Title>
                          物資名稱：<b>{item.name}</b>
                        </Card.Title>
                      </div>
                      <hr></hr>
                      <Card.Text>
                        <div>需求機構：{item.charity}</div>
                        <div>需求數量：10</div>
                        <p>認購數量：{item.count}</p>
                        <p>費用小記：{item.subtotal}</p>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </>
              ))}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </div>
  );
}

function Record() {
  const [user] = useAuthState(auth);
  const [details, setDetails] = useState([]);
  console.log(details);
  const [details2, setDetails2] = useState([]);
  console.log(details2);
  useEffect(() => {
    const q = query(
      collection(db, "donate"),
      where("uid", "==", user.uid),
      where("paymentStatus", "==", "已付款")
    );
    onSnapshot(q, (querySnapshot) => {
      setDetails(
        querySnapshot.docs.map((doc) => ({
          ...doc.data(),
        }))
      );
    });

    const q2 = query(
      collection(db, "donate"),
      where("uid", "==", user.uid),
      where("paymentStatus", "==", "尚未付款")
    );
    onSnapshot(q2, (querySnapshot) => {
      setDetails2(
        querySnapshot.docs.map((doc) => ({
          ...doc.data(),
        }))
      );
    });
  }, [user]);
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gridGap: "10px" }}>
      <div>
        <div>
          <Alert key='success' variant='success'>
            已付款
          </Alert>
          {details.map((item) => (
            <Task
              id={item.id}
              merchantTradeDate={item.merchantTradeDate}
              paymentDate={item.paymentDate}
              paymentStatus={item.paymentStatus}
              paymentType={item.paymentType}
              totalAmount={item.totalAmount}
              uid={item.uid}
              tradeNo={item.tradeNo}
              merchantTradeNo={item.merchantTradeNo}
              donateList={item.donateList}
            />
          ))}
        </div>
      </div>
      <div>
        <div>
          <Alert key='danger' variant='danger'>
            尚未付款
          </Alert>
          {details2.map((item) => (
            <Task
              id={item.id}
              merchantTradeDate={item.merchantTradeDate}
              paymentDate={item.paymentDate}
              paymentStatus={item.paymentStatus}
              paymentType={item.paymentType}
              totalAmount={item.totalAmount}
              uid={item.uid}
              tradeNo={item.tradeNo}
              merchantTradeNo={item.merchantTradeNo}
              donateList={item.donateList}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Record;
