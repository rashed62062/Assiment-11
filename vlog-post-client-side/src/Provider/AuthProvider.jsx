import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  sendPasswordResetEmail, // ✅ Import missing function
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../Auth/firebase.init";

export const AuthContext = createContext(null);

const googleProvider = new GoogleAuthProvider(); // ✅ Fixed variable name

const AuthProvider = ({ children }) => {
  // State definitions
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Register new user
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // User login
  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Google authentication
  const signInGoogleUser = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // Logout user
  const signOutUser = () => {
    setLoading(true);
    return signOut(auth);
  };

  // Update profile (name & photo)
  const update = (name, photoURL) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoURL,
    });
  };

  // Forgot password function
  const forgotPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  // Firebase auth observer
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("Current User:", currentUser);
      setUser(currentUser);
      setLoading(false);
    });
    return () => unSubscribe();
  }, []);

  // Authentication context value
  const AuthInfo = {
    user,
    createUser,
    signInUser,
    signOutUser,
    signInGoogleUser,
    update,
    forgotPassword,
    loading, // ✅ For loading state
  };

  return (
    <AuthContext.Provider value={AuthInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
