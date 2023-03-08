import React, {useEffect, useState} from "react";
import { auth, db } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Navbar from "../elements/navbar";
import NavbarHome from "../elements/navbarHome";
import TitleSec from "../elements/titleSec";
import { collection, onSnapshot, query, where } from "firebase/firestore";

function Gain() {
  const [user] = useAuthState(auth);


//   useEffect(() => {
//     // let org = JSON.parse(localStorage.getItem("orgData"));
   
//         const q = query(collection(db, "donate"));
//         onSnapshot(q, (querySnapshot) => {
//           querySnapshot.docs.map((doc) =>{
//             console.log('dic', doc.id, doc.data())
//           })
//       });
     
    
// });
  return (
    <div>
      {user && <Navbar />}
      {!user && <NavbarHome />}
      <TitleSec name="成果櫥窗" color="#F4D19B" />
    </div>
  );
}

export default Gain;
