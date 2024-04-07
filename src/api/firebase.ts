/* eslint-disable @typescript-eslint/no-unused-vars */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDntzVrigPqllzflhp-D_yYQHF3L4DiZbg",
  authDomain: "projekt-inz-e62e6.firebaseapp.com",
  projectId: "projekt-inz-e62e6",
  storageBucket: "projekt-inz-e62e6.appspot.com",
  messagingSenderId: "424124953670",
  appId: "1:424124953670:web:b006c0d7a7121ba9758647",
  measurementId: "G-X4JWWQED1G",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
