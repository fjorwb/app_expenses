import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"

const firebaseConfig = {
apiKey: "AIzaSyCY8EVzct0UM-nRXp4OCN0_xgHvMRwVOeU",
  authDomain: "app-react-expenses-27fb5.firebaseapp.com",
  projectId: "app-react-expenses-27fb5",
  storageBucket: "app-react-expenses-27fb5.appspot.com",
  messagingSenderId: "763269835860",
  appId: "1:763269835860:web:76ada048b3586c8f0891c1"
};

initializeApp(firebaseConfig)

const auth = getAuth();
const db = getFirestore();

export {auth, db};
