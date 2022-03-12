import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDCnfMOptabxC5rTUhMrA_mnMUxDGSw9wM",
  authDomain: "contact-app-94906.firebaseapp.com",
  projectId: "contact-app-94906",
  storageBucket: "contact-app-94906.appspot.com",
  messagingSenderId: "956817931122",
  appId: "1:956817931122:web:474f8e0668f403de8b3beb",
  measurementId: "G-CYTRFL2ZXY",
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
export const db = getFirestore(app);
