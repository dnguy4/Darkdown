// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore} from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBfr0dBsuDCO64iUAbGTG58ROseJF0yf0o",
  authDomain: "darkdown-44b5e.firebaseapp.com",
  projectId: "darkdown-44b5e",
  storageBucket: "darkdown-44b5e.appspot.com",
  messagingSenderId: "241526773904",
  appId: "1:241526773904:web:44e518a85c8a9bcf95e015"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// initalize components
export const auth = getAuth(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();
export const storage = getStorage(app);