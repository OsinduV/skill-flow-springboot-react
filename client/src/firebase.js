// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_OSINDU_FIREBASE_API_KEY,
  authDomain: "skill-flow-36660.firebaseapp.com",
  projectId: "skill-flow-36660",
  storageBucket: "skill-flow-36660.firebasestorage.app",
  messagingSenderId: "263548857177",
  appId: "1:263548857177:web:501e1cd5c5f0128205ba48"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);