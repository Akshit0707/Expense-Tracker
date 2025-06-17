// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeAuth } from "firebase/auth";
import { getReactNativePersistence } from "@firebase/auth";
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAypzysd8T5EUDh1vpPIgUoksfwixMcoJQ",
  authDomain: "expense-tracker-a8ef7.firebaseapp.com",
  projectId: "expense-tracker-a8ef7",
  storageBucket: "expense-tracker-a8ef7.firebasestorage.app",
  messagingSenderId: "256961647379",
  appId: "1:256961647379:web:c3b903900d074cd55140e6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth= initializeAuth(app,{
    persistence: getReactNativePersistence(AsyncStorage),

});

export const firestore= getFirestore(app);