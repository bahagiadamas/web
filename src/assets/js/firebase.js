import { initializeApp } from "firebase/app";
import {
  collection,
  getDocs,
  getFirestore,
  orderBy,
  query,
} from "firebase/firestore";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCHNhYJJZuy1_1kPhh2dGQSC46gIrINYlk",
  authDomain: "bahagiadamas.firebaseapp.com",
  projectId: "bahagiadamas",
  storageBucket: "bahagiadamas.firebasestorage.app",
  messagingSenderId: "22737524500",
  appId: "1:22737524500:web:e9ab011c0790db4df4d401",
  measurementId: "G-D71F2HWTQ7",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const signInWithGoogle = () => signInWithPopup(auth, provider);
const logout = () => signOut(auth);
const ADMIN_UID = [
  "Dz1UtNSZcRdE1GAHKhotC7Li4Al2",
  "Ha55NDmzPRTjeSrx3vTd0pcsh9a2",
];

async function getData(collectionName, orderByField = null) {
  try {
    let q;
    if (orderByField) {
      q = query(collection(db, collectionName), orderBy(orderByField, "asc"));
    } else {
      q = query(collection(db, collectionName));
    }
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return data;
  } catch (error) {
    console.error(`Failed to fetch ${collectionName}:`, error);
    return [];
  }
}

export {
  db,
  auth,
  provider,
  signInWithGoogle,
  logout,
  onAuthStateChanged,
  ADMIN_UID,
  getData,
};
