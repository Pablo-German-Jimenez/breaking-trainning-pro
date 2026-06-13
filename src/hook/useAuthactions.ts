import { useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../app/lib/firebase";

export function useAuthActions() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Registro: Crea el usuario en Auth y su perfil con rol en Firestore
  const registerWithEmail = async (email: string, password: string, fullName: string) => {
    setLoading(true);
    setError(null);
    try {
      // 1. Crear usuario en Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // 2. Crear el documento del usuario en la colección 'users' de Firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        fullName,
        email,
        role: "client",       // Rol por defecto para los que se registran en la web
        credits: 0,           // Sistema de créditos inicializado en 0
        membership: "none",   // Estado de membresía premium
        createdAt: new Date().toISOString(),
      });

    } catch (err: any) {
      setError(err.message || "Ocurrió un error al registrarse");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Login tradicional
  const loginWithEmail = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      setError(err.message || "Credenciales incorrectas");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { registerWithEmail, loginWithEmail, setError, loading };
}