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
  updateDoc
} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCeX8475vJ2bH15poHCdrszhVY1EuJy0eg",
  authDomain: "projeto-tcc-26b77.firebaseapp.com",
  databaseURL: "https://projeto-tcc-26b77-default-rtdb.firebaseio.com",
  projectId: "projeto-tcc-26b77",
  storageBucket: "projeto-tcc-26b77.appspot.com",
  messagingSenderId: "796988753366",
  appId: "1:796988753366:web:a6ccd0f99aab39345a5077"
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
  updateDoc
}