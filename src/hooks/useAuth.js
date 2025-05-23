// src/hooks/useAuth.js
// (Anda bisa membuat folder 'hooks' jika belum ada)

import { useState, useEffect, useCallback } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, logout as firebaseLogout } from "../assets/js/firebase";

const useAuth = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setIsLoadingAuth(false);
      console.log("Auth State Changed: ", user ? user.uid : "null");
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = useCallback(async () => {
    console.log("Attempting to log out...");
    await firebaseLogout();
  }, []);

  return { currentUser, isLoadingAuth, handleLogout };
};

export default useAuth;
