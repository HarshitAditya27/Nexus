// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "nexus-7e23c.firebaseapp.com",
  projectId: "nexus-7e23c",
  storageBucket: "nexus-7e23c.appspot.com",
  messagingSenderId: "942067488862",
  appId: "1:942067488862:web:678d19ad97bb3903f63ccf",
  measurementId: "G-C6D9JSKVY7",
};

let app;
let db;

if (typeof window !== "undefined") {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  const analytics = getAnalytics(app);
}

export { app, db };

/*
 messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
 */
