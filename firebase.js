import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
  update
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyAHAQjn4sTuR9FiGF3ljRrFEMZQjsx-SHg",
  authDomain: "apni-duniya-b53d7.firebaseapp.com",
  databaseURL: "https://apni-duniya-b53d7-default-rtdb.firebaseio.com",
  projectId: "apni-duniya-b53d7",
  storageBucket: "apni-duniya-b53d7.firebasestorage.app",
  messagingSenderId: "178853058918",
  appId: "1:178853058918:web:91dfaa5c5e41446da290a7"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db, ref, push, onValue, remove, update };