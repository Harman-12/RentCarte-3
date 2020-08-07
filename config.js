import * as firebase from 'firebase'
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDpT11Y0B8QeDXlp71zp0gG9DrljBa5tMI",
    authDomain: "rentcarte-85a2c.firebaseapp.com",
    databaseURL: "https://rentcarte-85a2c.firebaseio.com",
    projectId: "rentcarte-85a2c",
    storageBucket: "rentcarte-85a2c.appspot.com",
    messagingSenderId: "159123578967",
    appId: "1:159123578967:web:414d5aeddcdc5d211e8312",
    measurementId: "G-L679RSFZ0B"
  };

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
export default db;