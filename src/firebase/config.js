import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyC0FEiezlrXqplbE2J1aOaAFrG7bJdVSMk",
  authDomain: "pic-club.firebaseapp.com",
  projectId: "pic-club",
  storageBucket: "pic-club.appspot.com",
  messagingSenderId: "109751013083",
  appId: "1:109751013083:web:a65c7c45422476d22046fe"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
