// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore/lite'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBP4RIAcQ2Gz-r6oA9MozmV9hUE03Shy68",
  authDomain: "journal-app-a708d.firebaseapp.com",
  projectId: "journal-app-a708d",
  storageBucket: "journal-app-a708d.appspot.com",
  messagingSenderId: "965906175939",
  appId: "1:965906175939:web:4418b7f9f5f52e39118f76",
};

// Initialize Firebase
export const fireBaseApp = initializeApp(firebaseConfig);
export const fireBaseAuth = getAuth(fireBaseApp);
export const fireBaseDB  = getFirestore(fireBaseApp)
