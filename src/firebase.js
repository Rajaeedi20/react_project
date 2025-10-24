// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBe0B9xIg9rs7h6zu2fKPnRJFswZ3E2nFg",
  authDomain: "skyglobe-1c161.firebaseapp.com",
  projectId: "skyglobe-1c161",
  storageBucket: "skyglobe-1c161.firebasestorage.app",
  messagingSenderId: "170822943225",
  appId: "1:170822943225:web:c12f4b6a297dc2f05cbd28",
  measurementId: "G-W6891R8G66"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
