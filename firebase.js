// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDUF-MeLhmkzuCntXdt1a3wtTVgBgXcByg",
  authDomain: "nimbus-ecommerce.firebaseapp.com",
  projectId: "nimbus-ecommerce",
  storageBucket: "nimbus-ecommerce.firebasestorage.app",
  messagingSenderId: "390794281076",
  appId: "1:390794281076:web:03b4a82870c90ad1499121",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
