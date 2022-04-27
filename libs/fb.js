//lib/firebase.js
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

//Shouldn't be here, but it's a quick fix for now
const clientCredentials = {
  apiKey: "AIzaSyAkrlempNlWrPiAN9lTQc2sJCz8Racz0fA",
  authDomain: "unge-drabanter.firebaseapp.com",
  projectId: "unge-drabanter",
  storageBucket: "unge-drabanter.appspot.com",
  messagingSenderId: "646661723754",
  appId: "1:646661723754:web:29ad4854e76564bfbf1c13",
};

if (!firebase.apps.length) {
  firebase.initializeApp(clientCredentials);
}
var storage = firebase.storage();

export { storage };
export default firebase;
