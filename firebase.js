import {getApp, getApps} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDjBOcqsBoSmWisqMc4r08G7O_zEBMGtrs',
  authDomain: 'clone-a4ba7.firebaseapp.com',
  projectId: 'clone-a4ba7',
  storageBucket: 'clone-a4ba7.appspot.com',
  messagingSenderId: '612534419147',
  appId: '1:612534419147:web:0e8f28e689b22cf202254e',
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();

export default db;
