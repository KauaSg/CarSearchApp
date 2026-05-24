import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Alert } from "react-native";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateProfile
} from "firebase/auth";

import { auth, isFirebaseConfigured } from "../service/FirebaseConfig";

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);
  const [authLoading, setAuthLoading] = useState(false);

  useEffect(() => {
    if (!isFirebaseConfigured || !auth) {
      setInitializing(false);
      return undefined;
    }

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setInitializing(false);
    });

    return unsubscribe;
  }, []);

  async function login(email, password) {
    ensureFirebase();
    setAuthLoading(true);
    try {
      await signInWithEmailAndPassword(auth, normalizeEmail(email), password);
    } finally {
      setAuthLoading(false);
    }
  }

  async function register(name, email, password) {
    ensureFirebase();
    setAuthLoading(true);
    try {
      const credential = await createUserWithEmailAndPassword(auth, normalizeEmail(email), password);
      if (name?.trim()) {
        await updateProfile(credential.user, { displayName: name.trim() });
      }
    } finally {
      setAuthLoading(false);
    }
  }

  async function logout() {
    ensureFirebase();
    await signOut(auth);
  }

  async function resetPassword(email) {
    ensureFirebase();
    if (!email?.trim()) {
      Alert.alert("Informe o e-mail", "Digite seu e-mail para receber o link de redefinição.");
      return;
    }
    await sendPasswordResetEmail(auth, normalizeEmail(email));
  }

  const value = useMemo(
    () => ({
      user,
      initializing,
      authLoading,
      isFirebaseConfigured,
      login,
      register,
      logout,
      resetPassword
    }),
    [user, initializing, authLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}

function ensureFirebase() {
  if (!isFirebaseConfigured || !auth) {
    throw new Error("Firebase não configurado. Preencha as variáveis EXPO_PUBLIC_FIREBASE_* no arquivo .env.");
  }
}
