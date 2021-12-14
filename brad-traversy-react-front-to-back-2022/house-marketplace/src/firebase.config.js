// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD8iTnidX4eGYfkui1KX9ksi8cAFthdSoc",
    authDomain: "house-marketplace-c1a8e.firebaseapp.com",
    projectId: "house-marketplace-c1a8e",
    storageBucket: "house-marketplace-c1a8e.appspot.com",
    messagingSenderId: "125912900943",
    appId: "1:125912900943:web:f76baaa5bc8f01c572913a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore()