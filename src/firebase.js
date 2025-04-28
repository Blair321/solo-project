// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAOKMzTqK_9ksvQFcg-DukYarXIE1noAh0",
  authDomain: "barbell-buddy-e675f.firebaseapp.com",
  projectId: "barbell-buddy-e675f",
  storageBucket: "barbell-buddy-e675f.firebasestorage.app",
  messagingSenderId: "713126474597",
  appId: "1:713126474597:web:cbd0d6bd153d7abf44678c",
  measurementId: "G-SDC58B6BXS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);