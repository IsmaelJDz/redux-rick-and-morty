import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore"

// Your web app's Firebase configuration
let firebaseConfig = {
  apiKey: "AIzaSyC0WZnVhIRkyzYDxLuG2YMuS3upsxtIpRs",
  authDomain: "apprickmorthy.firebaseapp.com",
  databaseURL: "https://apprickmorthy.firebaseio.com",
  projectId: "apprickmorthy",
  storageBucket: "apprickmorthy.appspot.com",
  messagingSenderId: "83824394466",
  appId: "1:83824394466:web:a24b35679824655f691ebb"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let db = firebase.firestore().collection('favs')

export function getFavs(uid) {
  return db.doc(uid).get()
    .then(snap => {
      return snap.data().array
    })
}

export function updateDataBase(array, uid) {
  db.doc(uid).set({favoritos: [...array]})
  return db.doc(uid).set({array})
}

export function signOutGoogle() {
  firebase.auth().signOut()
}

export function loginWithGoogle() {
  let provider = new firebase.auth.GoogleAuthProvider();
  return firebase
    .auth()
    .signInWithPopup(provider)
    .then(snap => snap.user);
}