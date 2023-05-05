import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarMember from "../elements/navbarMember";
import NavbarCharity from "../elements/navbarCharity";
import NavbarAdmin from "../elements/navbarAdmin";
import NavbarHome from "../elements/navbarHome";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";
import HomeYesUser from "./HomeYesUser";
import HomeNoUser from "./HomeNoUser";
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "../utils/firebase";
import { useNavigate } from "react-router";

function Task({ id, email, level, name }) {
  const navigate = useNavigate("");
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [user] = useAuthState(auth);
  if (!user) {
    navigate("/signIn");
  }
  return (
    <div>
      {user.email === email && level === "member" && <NavbarMember />}
      {user.email === email && level === "member" && <HomeYesUser />}
      {user.email === email && level === "charity" && <NavbarCharity />}
      {user.email === email && level === "charity" && <HomeYesUser />}
      {user.email === email && level === "admin" && <NavbarAdmin />}
      {user.email === email && level === "admin" && <HomeYesUser />}
    </div>
  );
}
function NavbarComp() {
  const [details, setDetails] = useState([]);
  useEffect(() => {
    const q = query(collection(db, "users"));
    onSnapshot(q, (querySnapshot) => {
      setDetails(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);
  const [user, loading] = useAuthState(auth);
  if (loading)
    return (
      <h3
        style={{
          textAlign: "center",
          color: "#002b5b",
          fontWeight: "bold",
          height: "0px",
          lineHeight: "65px",
        }}
      >
        網頁載入中...
      </h3>
    );
  return (
    <div>
      {details.map((item) => (
        <Task
          id={item.id}
          key={item.id}
          level={item.data.level}
          email={item.data.email}
          name={item.data.name}
        />
      ))}
      {!user && <NavbarHome />}
      {!user && <HomeNoUser />}
    </div>
  );
}

export default NavbarComp;
