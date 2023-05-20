import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyAPbleT4vXpJ7DdsCFp_RijjhzGd4lRJHs",
  authDomain: "donation-platform-54f2b.firebaseapp.com",
  databaseURL: "https://donation-platform-54f2b-default-rtdb.firebaseio.com",
  projectId: "donation-platform-54f2b",
  storageBucket: "donation-platform-54f2b.appspot.com",
  messagingSenderId: "229918689081",
  appId: "1:229918689081:web:ae5f56b680c524fd128ae8",
};

const firebase = initializeApp(firebaseConfig);
export const db = getFirestore(firebase);
export const auth = getAuth(firebase);
export const storage = getStorage(firebase);
export default firebase;
