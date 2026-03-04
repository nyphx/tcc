// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { 
  getFirestore, 
  collection, 
  addDoc,
  getDocs,
  getDoc,
  query, 
  where,
  doc,
  deleteDoc,
  updateDoc,
  onSnapshot
} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: " ",
  authDomain: " ",
  databaseURL: " ",
  projectId: " ",
  storageBucket: " ",
  messagingSenderId: " ",
  appId: " "
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export {
  app,
  db,
  getFirestore, 
  collection, 
  addDoc,
  getDocs,
  getDoc,
  query, 
  where,
  doc,
  deleteDoc,
  updateDoc,
  onSnapshot
}
