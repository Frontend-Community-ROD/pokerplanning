// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAlksXoZovZ5DSU-IptSy9gym1jleiUM-c",
  authDomain: "pokerplanning-eb45f.firebaseapp.com",
  projectId: "pokerplanning-eb45f",
  storageBucket: "pokerplanning-eb45f.appspot.com",
  messagingSenderId: "1050419247436",
  appId: "1:1050419247436:web:ecbb2010cced0db6b677e9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
export const database = getDatabase(app);