// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "blog-c451c.firebaseapp.com",
  projectId: "blog-c451c",
  storageBucket: "blog-c451c.appspot.com",
  messagingSenderId: "117544782312",
  appId: "1:117544782312:web:deafcc69d8dde0d647bc5d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);