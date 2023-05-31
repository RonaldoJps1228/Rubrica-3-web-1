import app from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'


const firebaseConfig = {
  apiKey: "AIzaSyBU8pYRLLXUa-R2CMRitDkEBHe1tBAsIJ8",
  authDomain: "rubrica3-web-i.firebaseapp.com",
  projectId: "rubrica3-web-i",
  storageBucket: "rubrica3-web-i.appspot.com",
  messagingSenderId: "16268073437",
  appId: "1:16268073437:web:428d5cb5eeb9349b0e3e34",
  measurementId: "G-06N4B7M56L"
};

// Initialize Firebase
app.initializeApp(firebaseConfig);

const db=app.firestore()
const auth=app.auth()
export {db,auth}