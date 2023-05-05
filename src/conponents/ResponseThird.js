import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "../utils/firebase";

function Task(id, charity, name, merchantTradeDate) {
  const [user] = useAuthState(auth);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return <div>
    
  </div>;
}

function ResponseThird() {
  const navigate = useNavigate("");
  const [user] = useAuthState(auth);
  if (!user) {
    navigate("/signIn");
  }
  const [details, setDetails] = useState([]);
  useEffect(() => {
    const q = query(collection(db, "donate"));
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
      {details.map((item) => (
        <Task
          id={item.id}
          key={item.id}
          charity={item.charity}
          name={item.name}
          merchantTradeDate={item.merchantTradeDate}
        />
      ))}
    </div>
  );
}

export default ResponseThird;
