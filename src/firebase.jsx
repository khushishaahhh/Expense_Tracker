import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDgNCvWG50CifBPFJtQLgxLpfj_NiGbTs4",
  authDomain: "expensetracker-79c35.firebaseapp.com",
  projectId: "expensetracker-79c35",
  storageBucket: "expensetracker-79c35.appspot.com",
  messagingSenderId: "1014138783564",
  appId: "1:1014138783564:web:63c61f339e082ff645f1e9",
  databaseURL: "https://expensetracker-79c35-default-rtdb.firebaseio.com",
};

const app = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(app);
const getF = getFirestore(app);
const db = getDatabase(app);
export { app, firebaseAuth, db };
