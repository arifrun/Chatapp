
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyC1tyHVlOJGwJarMG99ooJGNsKh7YYHlb8",
  authDomain: "chatapp-50fdd.firebaseapp.com",
  databaseURL: "https://chatapp-50fdd-default-rtdb.firebaseio.com",
  projectId: "chatapp-50fdd",
  storageBucket: "chatapp-50fdd.appspot.com",
  messagingSenderId: "1019259562947",
  appId: "1:1019259562947:web:7fb108a67757473993ab76"
};


const app = initializeApp(firebaseConfig);
export default firebaseConfig;
