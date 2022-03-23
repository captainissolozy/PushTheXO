
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyAIFhOvtZEw9O3loKbhZVsjZlJ1EEwLqPA",
  authDomain: "pushthexo.firebaseapp.com",
  projectId: "pushthexo",
  storageBucket: "pushthexo.appspot.com",
  messagingSenderId: "151832708111",
  appId: "1:151832708111:web:1974228a1e4aaba8294f7a",
  measurementId: "G-4EEYZMCX78"
};

const app = initializeApp(firebaseConfig);
export default getFirestore()

