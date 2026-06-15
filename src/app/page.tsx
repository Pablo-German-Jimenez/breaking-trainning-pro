"use client";

import Image from "next/image";
import { useState,useEffect } from "react"; // Corregido: useState limpio
import { auth, googleProvider } from "./lib/firebase";
import { signInWithPopup } from "firebase/auth";
import { useAuth } from "@/context/providers/AuthContext";
import {useRouter} from "next/navigation"

export default function Home() {
  // Traemos los datos globales de autenticación de tu contexto
  const { user, authLoading: authLoading } = useAuth();
  const router = useRouter();
  // Estados locales exclusivos para el formulario manual
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localLoading, setLocalLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(()=>{
    if(!authLoading&&user){
      router.push("/usuarioadministrador");
    }
  },[user,authLoading,router])
  // Manejo del formulario tradicional
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLocalLoading(true);

    // Tu simulación actual de carga
    setTimeout(() => {
      setLocalLoading(false);
    }, 2000);
  };

  // Función para autenticar con Google (usando tu lógica original)
  const handleGoogleSignIn = async () => {
    setError(null);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      console.log("¡Usuario conectado exitosamente!", user);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Ocurrió un error al iniciar sesión con Google.");
    }
  };

  // 1. Si Firebase está verificando si hay una sesión guardada, mostramos un loader
  if (authLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-zinc-950">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-orange-500 border-t-transparent"></div>
      </div>
    );
  }

  // 2. CASO PRIVADO: Si el usuario SÍ inició sesión, mostramos la plataforma del gimnasio
  if (user) {
    router.push("/usuarioadministrador")
  }
  // 3. CASO PÚBLICO: Si NO hay usuario, dejamos tu formulario exacto
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl">
        
        {/* Header con tu Logo */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-32 h-32 bg-amber-500/20 rounded-full flex items-center justify-center overflow-hidden border border-amber-500/30 mb-4">
            <Image
              src="/tirandoaltabarra.png"
              alt="Logo"
              width={220}
              height={220}
              className="object-cover"
            />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white">Breaking Trainning Pro</h1>
          <p className="text-sm text-zinc-400 mt-1">Crea tu cuenta para comenzar</p>
        </div>

        {/* Formulario Tradicional */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-1.5">
              Nombre Completo
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Break Boy Linkin"
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-1.5">
              Correo Electrónico
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="BreakBoyLinkin@BreakingMail.com"
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-1.5">
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500 transition-colors"
            />
          </div>

          {error && <p className="text-xs text-red-500 mt-1">{error}</p>}

          <button
            type="submit"
            disabled={localLoading}
            className="w-full bg-orange-500 text-black font-semibold rounded-lg py-2.5 text-sm hover:bg-orange-600 transition-colors disabled:opacity-50"
          >
            {localLoading ? "Cargando..." : "Crear Cuenta"}
          </button>
        </form>

        {/* Separador */}
        <div className="relative flex py-4 items-center text-xs text-zinc-600 uppercase tracking-wider">
          <div className="flex-grow border-t border-zinc-800"></div>
          <span className="flex-shrink mx-3">O continúacon</span>
          <div className="flex-grow border-t border-zinc-800"></div>
        </div>

        {/* Botón de Google integrado con tu función */}
        <button
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center gap-2 bg-zinc-950 border border-zinc-800 rounded-lg py-2.5 text-sm font-semibold text-white hover:bg-zinc-900 transition-colors"
        >
          <span>Registrarse con Google</span>
        </button>

      </div>
    </main>
  );
}