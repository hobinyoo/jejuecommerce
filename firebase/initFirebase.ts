// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBlBu54n6be6jUTffcPdBvvc570luJSFvE',
  authDomain: 'beefsoup-2bb29.firebaseapp.com',
  projectId: 'beefsoup-2bb29',
  storageBucket: 'beefsoup-2bb29.appspot.com',
  messagingSenderId: '1011535272634',
  appId: '1:1011535272634:web:342769c211fbfbe5154083',
  measurementId: 'G-GF3F00GCQD',
}
// const firebaseConfig = {
//   apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
//   authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
//   measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
// }

//!getApps().length 확인은 Next.js가 어플리케이션을 리로드 할 때 실수로 SDK를 다시 초기화 하는 것을 방지
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
export const db = getFirestore(app)
export const auth = getAuth(app)
export const storage = getStorage(app)
auth.languageCode = 'ko'
