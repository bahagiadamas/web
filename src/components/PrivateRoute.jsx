// src/components/PrivateRoute.jsx
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, ADMIN_UID } from "../assets/js/firebase";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children, requireAdmin = false }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasCheckedAuth, setHasCheckedAuth] = useState(false);

  // Debugging logs
  console.log("--- PrivateRoute Initialized ---");
  console.log("  User (UID):", user ? user.uid : "null");
  console.log("  Has Checked Auth:", hasCheckedAuth);
  console.log("---------------------------");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      console.log(
        "onAuthStateChanged callback fired! Firebase User Received:",
        firebaseUser ? firebaseUser.uid : "null"
      );
      setUser(firebaseUser);
      setLoading(false);
      setHasCheckedAuth(true);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  if (loading || !hasCheckedAuth) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        Checking access...
      </div>
    );
  }
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  if (requireAdmin && (!user.uid || !ADMIN_UID.includes(user.uid.trim()))) {
    return <Navigate to="/" replace />;
  }

  console.log("PrivateRoute: Acess GRANTED");
  return children;
}
