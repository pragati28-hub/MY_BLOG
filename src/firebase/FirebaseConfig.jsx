// src/firebase/FirebaseConfig.jsx
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { createContext, useContext, useState, useEffect } from "react";

const firebaseConfig = {
  apiKey: "AIzaSyA5KyNPF9OhRCmv03no7gg6l3m9YoDLKJ8",
  authDomain: "my-react-blog-7416c.firebaseapp.com",
  projectId: "my-react-blog-7416c",
  storageBucket: "my-react-blog-7416c.appspot.com",
  messagingSenderId: "102286656783",
  appId: "1:102286656783:web:cafaace1004ef83ed82a7a",
  measurementId: "G-FST3FBGRBP"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

const FirebaseAppContext = createContext();

export function FirebaseAppContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return (
    <FirebaseAppContext.Provider value={{ db, auth, storage, user, loading }}>
      {children}
    </FirebaseAppContext.Provider>
  );
}

export function useFirebaseAppContext() {
  return useContext(FirebaseAppContext);
}
