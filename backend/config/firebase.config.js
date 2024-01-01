// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC6b9SV6RFY8DP8n1mfH_UGGFf_EuTSOAk",
  authDomain: "voyage-hacks.firebaseapp.com",
  projectId: "voyage-hacks",
  storageBucket: "voyage-hacks.appspot.com",
  messagingSenderId: "409756639569",
  appId: "1:409756639569:web:e3d11ce74333d7d640b370",
  measurementId: "G-SPFLWPWCKN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
