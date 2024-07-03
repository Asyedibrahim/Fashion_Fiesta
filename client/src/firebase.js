// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "fashion-fiesta-40210.firebaseapp.com",
  projectId: "fashion-fiesta-40210",
  storageBucket: "fashion-fiesta-40210.appspot.com",
  messagingSenderId: "614137479506",
  appId: "1:614137479506:web:2042e8757422a4e4c4ba8b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);