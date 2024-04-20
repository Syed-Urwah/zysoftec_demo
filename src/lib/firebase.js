// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAqFH09uz4h-9Jtkb1gFASxhgEwQJu1wkI",
  authDomain: "local-fc8a1.firebaseapp.com",
  projectId: "local-fc8a1",
  storageBucket: "local-fc8a1.appspot.com",
  messagingSenderId: "617100427701",
  appId: "1:617100427701:web:15b8f80bede85f46f259fc",
  databaseURL: "https://local-fc8a1-default-rtdb.firebaseio.com/",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);