import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyBgYeEeDfHt0gD3D8oDLJJ80Lx_YgrNbvY",
  authDomain: "driveclone-ec9fe.firebaseapp.com",
  projectId: "driveclone-ec9fe",
  storageBucket: "driveclone-ec9fe.appspot.com",
  messagingSenderId: "283860835747",
  appId: "1:283860835747:web:b8073d9ad1fb6b22814e16",
  measurementId: "G-6K80DBEDR9",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const storage = firebase.storage();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, storage, auth, provider }