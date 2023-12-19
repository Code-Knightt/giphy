import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCd7u4u5hA0koUxk7zj4_gQFEQrfjxrHdU",
  authDomain: "giphy-3e005.firebaseapp.com",
  projectId: "giphy-3e005",
  storageBucket: "giphy-3e005.appspot.com",
  messagingSenderId: "587605431172",
  appId: "1:587605431172:web:64a3c2fff9988d0ce843d1",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
