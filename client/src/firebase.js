// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-bd5ab.firebaseapp.com",
  projectId: "mern-blog-bd5ab",
  storageBucket: "mern-blog-bd5ab.appspot.com",
  messagingSenderId: "354506911324",
  appId: "1:354506911324:web:a1947ad60a120be5ec4099"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);