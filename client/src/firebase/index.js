// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCD_hCB3gy4VGzm79KtsiyFHdoISk1sYtY",
    authDomain: "best-36121.firebaseapp.com",
    projectId: "best-36121",
    storageBucket: "best-36121.appspot.com",
    messagingSenderId: "697189745554",
    appId: "1:697189745554:web:15a5e1bfd2859c61dbb74b",
    measurementId: "G-NL2T79XXGX"
};

export const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firebase

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(firebaseApp);

export { storage };