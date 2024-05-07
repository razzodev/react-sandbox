// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FB_API,
  // apiKey: process.env.FB_API,
  authDomain: "react-sandbox-2968a.firebaseapp.com",
  projectId: "react-sandbox-2968a",
  storageBucket: "react-sandbox-2968a.appspot.com",
  messagingSenderId: "253393430579",
  appId: "1:253393430579:web:a77d080450999948ed1b46",
  measurementId: "G-SGZNK1M68N",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const analytics = getAnalytics(app);
