// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import router from "./router";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBIFctODh72nl0sO1Ez-7g1WCStAn2zRFk",
  authDomain: "forest-alert-0.firebaseapp.com",
  projectId: "forest-alert-0",
  storageBucket: "forest-alert-0.appspot.com",
  messagingSenderId: "151400820006",
  appId: "1:151400820006:web:149aa33c187e62e7eee5e7",
};

// Initialize Firebase
//const app = initializeApp(firebaseConfig);

var firebaseStore;
var firebaseAuth;
var FieldPath;
var FieldValue;
function initFirebase() {
  firebase.initializeApp(firebaseConfig);
  firebaseStore = firebase.firestore();
  firebaseAuth = firebase.auth();
  FieldPath = firebase.firestore.FieldPath;
  FieldValue = firebase.firestore.FieldValue;
}

export { initFirebase, firebaseAuth, firebaseStore, FieldPath, FieldValue };
export default firebase;