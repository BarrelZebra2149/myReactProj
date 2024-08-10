// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import "firebase/compat/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
console.log(process.env.REACT_APP_API_KEY);

const firebaseConfig = {
    apiKey: "AIzaSyBjMoYJsRwRVaJ5pbVoZounoX9jJofXPEk",
    authDomain: "myreact-9a0a8.firebaseapp.com",
    projectId: "myreact-9a0a8",
    storageBucket: "myreact-9a0a8.appspot.com",
    messagingSenderId: "483978841595",
    appId: "1:483978841595:web:145cbeb1d00dfc77688f5e",
    measurementId: "G-GVN4PMD5KP"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const firebaseInstance = firebase;
export const authService = firebase.auth();
export const dbService = firebase.firestore();
export const storageService = firebase.storage();