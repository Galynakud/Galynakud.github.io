
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; 

const firebaseConfig = {
  apiKey: "AIzaSyDjb3Ld-62hDNEHkbasf-5l9XNmAJe1Q3M",
  authDomain: "myprojectauth-fea1a.firebaseapp.com",
  projectId: "myprojectauth-fea1a",
  storageBucket: "myprojectauth-fea1a.firebasestorage.app",
  messagingSenderId: "1045500546310",
  appId: "1:1045500546310:web:54ca2e8b9580e0b7226287"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);  

export { auth, db };  
