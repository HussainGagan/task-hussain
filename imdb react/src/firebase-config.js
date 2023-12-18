import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBF1LSiFBPPcOsx-odyXMlR6FbsRMvhfww",
  authDomain: "imdb-clone-fdd4c.firebaseapp.com",
  projectId: "imdb-clone-fdd4c",
  storageBucket: "imdb-clone-fdd4c.appspot.com",
  messagingSenderId: "1042518394682",
  appId: "1:1042518394682:web:ea29b96fed99b245c9b203",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export const provider = new GoogleAuthProvider();
