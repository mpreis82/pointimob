// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyBqQShGbFltLp1s5BWPAAS2OEbxwJexaeY",
  authDomain: "imob-1536788993377.firebaseapp.com",
  databaseURL: "https://imob-1536788993377.firebaseio.com",
  projectId: "imob-1536788993377",
  storageBucket: "imob-1536788993377.appspot.com",
  messagingSenderId: "427504840613",
  appId: "1:427504840613:web:a671cf545a4760e26b024c"
};

const FirebaseApp = initializeApp(firebaseConfig);

const Firestore = getFirestore(FirebaseApp)

const Storage = getStorage(FirebaseApp)

export { FirebaseApp, Firestore, Storage }