import { initializeApp } from "firebase/app";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId,
};



// const firebaseConfig = {
//   apiKey: "AIzaSyDeiS4kiFlW2AUwPyXrhvN16hWoOY5OJjs",
//   authDomain: "blood-aid-now.firebaseapp.com",
//   projectId: "blood-aid-now",
//   storageBucket: "blood-aid-now.firebasestorage.app",
//   messagingSenderId: "675520499222",
//   appId: "1:675520499222:web:65f01658bcb98343496f37",
// };
// console.log("🚀 ~ firebaseConfig:", firebaseConfig)

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
