// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBL_4I4gFHLF6w-16QwhO1H5xhyYBopLb8",
  authDomain: "landingpagetemplategenerator.firebaseapp.com",
  projectId: "landingpagetemplategenerator",
  storageBucket: "landingpagetemplategenerator.firebasestorage.app",
  messagingSenderId: "393360919316",
  appId: "1:393360919316:web:eff08163ad4f77b6865001",
  measurementId: "G-SJ24Y42CSM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;
