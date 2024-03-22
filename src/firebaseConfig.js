
import { initializeApp } from "firebase/app"; 
import { getDatabase } from "firebase/database"; 
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAQm_tpmm5RDQKj9O5erKEqQCPMam6lVrA",
  authDomain: "chatapp-3721a.firebaseapp.com",
  projectId: "chatapp-3721a",
  storageBucket: "chatapp-3721a.appspot.com",
  messagingSenderId: "593277113304",
  appId: "1:593277113304:web:2158d32b8a86e9c0e418ad"
};

const app = initializeApp(firebaseConfig); 
const auth = getAuth(app);
const database = getDatabase(app); 

export default  auth;