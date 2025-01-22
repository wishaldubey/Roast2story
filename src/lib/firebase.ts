import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
   apiKey: "AIzaSyAfmE8iYRDBbyPThpN1NSa89BoD-7mnSTc",
  authDomain: "wireframe-eeaef.firebaseapp.com",
  projectId: "wireframe-eeaef",
  storageBucket: "wireframe-eeaef.firebasestorage.app",
  messagingSenderId: "143012416687",
  appId: "1:143012416687:web:7d0a015542aa7a7311985a",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);