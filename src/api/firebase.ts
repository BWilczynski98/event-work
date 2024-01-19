/* eslint-disable @typescript-eslint/no-unused-vars */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCgOxpVTw64yUaf3S4jmOkBRaFT1GxgzR0",
  authDomain: "ilona-web.firebaseapp.com",
  projectId: "ilona-web",
  storageBucket: "ilona-web.appspot.com",
  messagingSenderId: "12425807836",
  appId: "1:12425807836:web:ff3065d0bed53b5abef119",
  measurementId: "G-RYNFM7ETVK",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
