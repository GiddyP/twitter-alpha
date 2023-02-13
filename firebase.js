// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAEhlR9G474JodW2gBifMyIsgUjGGV6Zg4",
    authDomain: "twitter-clone-yt-d9c31.firebaseapp.com",
    projectId: "twitter-clone-yt-d9c31",
    storageBucket: "twitter-clone-yt-d9c31.appspot.com",
    messagingSenderId: "951359614152",
    appId: "1:951359614152:web:1f861633ec8fb5c76d09fd"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export default app;
export { db, storage };
