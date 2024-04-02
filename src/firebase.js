// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "food-ordering-app-415312.firebaseapp.com",
  projectId: "food-ordering-app-415312",
  storageBucket: "food-ordering-app-415312.appspot.com",
  messagingSenderId: "15949331581",
  appId: "1:15949331581:web:511abf31594d5526ef0514",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
