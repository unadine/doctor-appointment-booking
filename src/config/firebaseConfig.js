import {getAuth} from "firebase/auth";
import { initializeApp } from "firebase/app";
import {getFirestore,collection} from "@firebase/firestore";

const firebaseConfig = {

    apiKey: "AIzaSyBcZiXI6u67UxPo3Vfh_5xbFNYKt6SIIjs",
    authDomain: "appointmrnt-booking.firebaseapp.com",
    projectId: "appointmrnt-booking",
    storageBucket: "appointmrnt-booking.appspot.com",
    messagingSenderId: "27934787409",
    appId: "1:27934787409:web:10731fd8203bdc3eaef570",
    measurementId: "G-NLNDDFCB2P"
  
  };
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);

export const usersCollectionRef = collection(db, "users");
export const appointmentsCollectionRef = collection(db,"appointments");