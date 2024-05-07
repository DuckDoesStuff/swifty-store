// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBEfMrhhsaxZ20hhFYPXXPP7k_48qJqa1I",
  authDomain: "swift-90970.firebaseapp.com",
  projectId: "swift-90970",
  storageBucket: "swift-90970.appspot.com",
  messagingSenderId: "544107985186",
  appId: "1:544107985186:web:a2a6723b0de3fd082ecd7b",
  measurementId: "G-XDF3LMWSHB",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
