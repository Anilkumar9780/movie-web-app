import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCQO54mF23vydDmc-QT94MTS5fTEMH5q_g",
    authDomain: "login-page-4b91f.firebaseapp.com",
    projectId: "login-page-4b91f",
    storageBucket: "login-page-4b91f.appspot.com",
    messagingSenderId: "608966408159",
    appId: "1:608966408159:web:f190927fb546816d96f66a"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage();
export const db = getFirestore(app);
