import { auth, firestore } from "@/config/firebase";
import { AuthContextType, UserType } from "@/types";
import { useRouter } from "expo-router";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import React, { createContext, useContext, useEffect } from "react";

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [user, setUser] = React.useState<any>(null);
  const router =useRouter();

  useEffect(()=>{
    const unsub = onAuthStateChanged(auth, firebaseUser=>{
      if (firebaseUser) {
        const userData: UserType = {
          uid: firebaseUser.uid,
          email: firebaseUser.email || null,
          name: firebaseUser.displayName || null,
          image: firebaseUser.photoURL || null,
        };
        setUser(userData);
        updateUserData(firebaseUser.uid);
        router.replace('/(tabs)')
      } else {
        setUser(null);
        router.replace('/(auth)/welcome');
      }
    });
    return () => {
      unsub();
    }
  },[])


  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return { success: true, message: "Login successful" };
    } catch (error: any) {
      let msg =error.message;
      console.log('Error Message:',msg);
      if( msg.includes("(auth/invalid-credential)"))msg = "Invalid credentials. Please check your email and password.";
      if( msg.includes("(auth/invalid-email)"))msg = "Invalid credentials. Please check your email.";
      return {
        success: false,msg
      };
    }
  };

  const register = async (email: string, password: string, name: string) => {
    try {
      let response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await setDoc(doc(firestore, "users", response?.user?.uid), {
        email,
        name,
        uid: response?.user?.uid,
      });
      return { success: true, message: "Registration successful" };
    } catch (error: any) {
      let msg =error.message;
      console.log('Error Message:',msg);
      if( msg.includes("(auth/invalid-credential)"))msg = "Invalid credentials. Please check your email and password.";
      if( msg.includes("(auth/invalid-email)"))msg = "Invalid credentials. Please check your email.";
      if( msg.includes("(auth/email-already-in-use)"))msg = "E-Mail already in use. Please signup with new email.";
      return {
        success: false,msg
      };
    }
  };

  const updateUserData = async (uid: string) => {
    try {
      const docRef = doc(firestore, "users", uid);
      const docSnapshot = await getDoc(docRef);
      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        const userData: UserType = {
          uid: data.uid,
          email: data.email || null,
          name: data.name || null,
          image: data.image || null,
        };
        setUser({ ...userData });
      }
    } catch (error: any) {
      console.error("Update user data error:", error);
      throw new Error("Failed to update user data");
    }
  };

  const contextValue: AuthContextType = {
    user,
    setUser,
    login,
    register,
    updateUserData,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  )
};

export const useAuth = ():AuthContextType => {
    const context= useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}