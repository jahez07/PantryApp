// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const apiKey = process.env.firebase_api_key;

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: apiKey,
  authDomain: "pantryapp-252c3.firebaseapp.com",
  projectId: "pantryapp-252c3",
  storageBucket: "pantryapp-252c3.appspot.com",
  messagingSenderId: "941642895099",
  appId: "1:941642895099:web:db45effb5cbb2f2d336a5e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export { app, firebaseConfig };
