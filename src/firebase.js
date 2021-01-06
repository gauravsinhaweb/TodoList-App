import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyARaXKsyZlb44nx_9B4aUN3A7GKTaz_jUY",
  authDomain: "todo-app-da7d9.firebaseapp.com",
  projectId: "todo-app-da7d9",
  storageBucket: "todo-app-da7d9.appspot.com",
  messagingSenderId: "591570575065",
  appId: "1:591570575065:web:0855641849346f79cda8c8",
  measurementId: "G-MWBTYM6G03",
});

const db = firebaseApp.firestore();
export default db;
