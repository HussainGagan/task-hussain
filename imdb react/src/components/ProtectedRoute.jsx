/* eslint-disable react/prop-types */
import { useRecoilState } from "recoil";
import { userState } from "../recoilState";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase-config";
import Spinner from "./Spinner";

function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [currentUser, setUser] = useRecoilState(userState);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      console.log(currentUser);
      setLoading(false);
      setUser({
        email: currentUser.email,
        name: currentUser.displayName,
        uid: currentUser.uid,
      });
    });

    return () => {
      unsub();
    };
  }, [setUser]);

  if (loading) {
    return <Spinner />;
  }

  if (Object.keys(currentUser).length === 0) {
    return <Navigate to="/login" />;
  }
  return children;
}

export default ProtectedRoute;
