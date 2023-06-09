// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: 'AIzaSyBlBu54n6be6jUTffcPdBvvc570luJSFvE',
//   authDomain: 'beefsoup-2bb29.firebaseapp.com',
//   projectId: 'beefsoup-2bb29',
//   storageBucket: 'beefsoup-2bb29.appspot.com',
//   messagingSenderId: '1011535272634',
//   appId: '1:1011535272634:web:342769c211fbfbe5154083',
//   measurementId: 'G-GF3F00GCQD',
// }
const firebaseConfig = {
  apiKey: 'AIzaSyC5VxAW8Fraj4KWPOelrmjBzKtfaGYdqs0',
  authDomain: 'beefsoup2-96ce6.firebaseapp.com',
  projectId: 'beefsoup2-96ce6',
  storageBucket: 'beefsoup2-96ce6.appspot.com',
  messagingSenderId: '200153596142',
  appId: '1:200153596142:web:93d053f8f43c34d78b33ff',
  measurementId: 'G-GYSY04XM11',
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)
auth.languageCode = 'ko'
export default firebase
