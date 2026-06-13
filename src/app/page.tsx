"use client";

import Image from "next/image";
import { useState } from "react";
// Importación relativa directa según tu estructura de carpetas visible en image_81009c.png
import { auth, googleProvider } from "./lib/firebase"; 
import { signInWithPopup } from "firebase/auth";

export default function Home() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Simulación actual de carga
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  // Función para autenticar con Google
  const handleGoogleSignIn = async () => {
    setError(null);
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      console.log("¡Usuario conectado exitosamente!", user);
      // Aquí puedes redirigir al usuario o guardar su sesión
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Ocurrió un error al iniciar sesión con Google.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl">
        
        {/* Header */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-32 h-32 bg-amber-500/20 rounded-full flex items-center justify-center overflow-hidden border border-amber-500/30">
            <Image
              src='/tirandoaltabarra.png'
              alt="Logo"
              width={220}
              height={220}
              
            />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white">Breaking Trainning Pro</h1>
          <p className="text-sm text-zinc-400 mt-1">Crea tu cuenta para comenzar</p>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-1.5">
              Nombre Completo
            </label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Break Boy Linkin"
              className="w-full bg-zinc-950 border border-zinc-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 rounded-lg px-3 py-2 text-sm text-white placeholder-zinc-600 outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-1.5">
              Correo Electrónico
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="BreakBoyLinkin@BreakingMail.com"
              className="w-full bg-zinc-950 border border-zinc-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 rounded-lg px-3 py-2 text-sm text-white placeholder-zinc-600 outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-1.5">
              Contraseña
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-zinc-950 border border-zinc-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 rounded-lg px-3 py-2 text-sm text-white placeholder-zinc-600 outline-none transition-colors"
            />
          </div>

          {error && (
            <p className="text-red-500 text-xs mt-1 bg-red-500/10 border border-red-500/20 rounded-lg p-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-500 hover:bg-amber-600 disabled:bg-zinc-800 disabled:text-zinc-500 text-zinc-950 font-bold py-2.5 rounded-lg transition-colors mt-2 flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
          >
            {loading ? <span>Procesando...</span> : "Crear Cuenta"}
          </button>
        </form>

        {/* Separador */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-zinc-800"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-zinc-900 px-2 text-zinc-500 tracking-wider">O continúa con</span>
          </div>
        </div>

        {/* Botón de Google */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-full bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 disabled:border-zinc-900 disabled:bg-zinc-950 text-white font-medium py-2.5 rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed shadow-sm"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
            <g transform="matrix(1, 0, 0, 1, 0, 0)">
              <path d="M21.35,11.1H12v2.7h5.38c-0.24,1.28 -0.96,2.37 -2.04,3.1v2.6h3.29c1.92,-1.77 3.02,-4.38 3.02,-7.4c0,-0.34 -0.03,-0.68 -0.1,-1H21.35z" fill="#4285F4" />
              <path d="M12,20.5c2.3,0 4.23,-0.76 5.64,-2.07l-3.29,-2.6c-0.91,0.61 -2.08,0.97 -3.29,0.97 -2.23,0 -4.12,-1.51 -4.79,-3.54H2.86v2.68C4.26,18.73 7.88,20.5 12,20.5z" fill="#34A853" />
              <path d="M7.21,13.26a5.13,5.13 0 0 1 0,-3.15V7.43H2.86a8.99,8.99 0 0 0 0,8.51l4.35,-3.43z" fill="#FBBC05" />
              <path d="M12,6.74c1.25,0 2.37,0.43 3.25,1.27l2.43,-2.43C16.22,4.24 14.29,3.5 12,3.5c-4.12,0 -7.74,1.77 -9.14,4.53l4.35,3.43C5.88,8.25 7.77,6.74 12,6.74z" fill="#EA4335" />
            </g>
          </svg>
          <span>Registrarse con Google</span>
        </button>

      </div>
    </main>
  );
}