"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/providers/AuthContext";
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { auth } from '@/app/lib/firebase';
import Sidebar from "@/components/sidebar";

export default function AdminDashboard() {
  const { user, authLoading } = useAuth();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Proteger la ruta: Si no está cargando y no hay usuario, mandarlo a la raíz
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/');
    }
  }, [user, authLoading, router]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/');
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  // Mientras Firebase comprueba la sesión, mostramos una pantalla de carga limpia
  if (authLoading || !user) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-zinc-400">
        <div className="animate-pulse font-medium">Cargando panel de control...</div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex bg-zinc-950 text-white overflow-x-hidden">
      
      {/* 1. SIDEBAR DESPLEGABLE */}
      <div 
        className={`fixed top-0 left-0 h-full w-64 bg-zinc-900 border-r border-zinc-800 z-50 transition-transform duration-300 ease-in-out transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar />
        <button 
          onClick={() => setIsSidebarOpen(false)}
          className="absolute top-4 right-4 text-zinc-400 hover:text-white text-xs bg-zinc-800 px-2 py-1 rounded"
        >
          ✕ Cerrar
        </button>
      </div>

      {/* OVERLAY (Fondo oscuro al abrir menú) */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* 2. CONTENIDO PRINCIPAL */}
      <div className="flex-1 p-4 md:p-8 space-y-6 transition-all duration-300">
        
        {/* ENCABEZADO */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-zinc-800 pb-5">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-white p-2.5 rounded-xl flex items-center justify-center transition-colors"
            >
              ☰
            </button>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Panel de Administración 👋</h1>
              <p className="text-sm text-zinc-400">
                Bienvenido de vuelta, <span className="text-orange-500 font-medium">{user?.displayName || "Administrador"}</span>
              </p>
            </div>
          </div>

          <button 
            className="self-start sm:self-center rounded-xl bg-red-950/40 hover:bg-red-900/60 text-red-400 border border-red-900/50 px-4 py-2.5 text-sm font-medium transition-colors" 
            onClick={handleLogout}
          >
            Cerrar sesión
          </button>
        </div>

        {/* SECCIÓN DE MÉTRICAS DEL GIMNASIO */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          
          {/* Tarjeta 1 */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 space-y-2">
            <p className="text-sm font-medium text-zinc-400">Alumnos Activos</p>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-bold tracking-tight">124</span>
              <span className="text-xs font-medium text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full">+4% este mes</span>
            </div>
          </div>

          {/* Tarjeta 2 */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 space-y-2">
            <p className="text-sm font-medium text-zinc-400">Clases Dictadas Hoy</p>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-bold tracking-tight">6</span>
              <span className="text-xs font-medium text-zinc-500">2 pendientes</span>
            </div>
          </div>

          {/* Tarjeta 3 */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 space-y-2">
            <p className="text-sm font-medium text-zinc-400">Capacidad del Turno</p>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-bold tracking-tight">65%</span>
              <span className="text-xs font-medium text-orange-500 bg-orange-500/10 px-2 py-0.5 rounded-full">Hora pico</span>
            </div>
          </div>

          {/* Tarjeta 4 */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 space-y-2">
            <p className="text-sm font-medium text-zinc-400">Ingresos Mensuales</p>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-bold tracking-tight">$3,420</span>
              <span className="text-xs font-medium text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full">Meta 85%</span>
            </div>
          </div>

        </div>

        {/* ACCIONES RÁPIDAS Y CONTROL DE CLASES */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Tabla de Alumnos Recientes (Ocupa 2 columnas en pantallas grandes) */}
          <div className="lg:col-span-2 rounded-2xl border border-zinc-800 bg-zinc-900 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold tracking-tight">Asistencias del Turno Actual</h2>
              <button className="text-xs text-orange-500 hover:underline font-medium">+ Registrar Alumno</button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-zinc-400">
                <thead className="text-xs uppercase text-zinc-500 border-b border-zinc-800">
                  <tr>
                    <th className="py-3 px-2">Alumno</th>
                    <th className="py-3 px-2">Plan</th>
                    <th className="py-3 px-2">Estado</th>
                    <th className="py-3 px-2 text-right">Acción</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/60">
                  <tr>
                    <td className="py-3 px-2 font-medium text-white">Pablo Germán Jiménez</td>
                    <td className="py-3 px-2">Pase Libre</td>
                    <td className="py-3 px-2"><span className="text-emerald-400 bg-emerald-400/10 px-2 py-0.5 text-xs rounded-md">Al día</span></td>
                    <td className="py-3 px-2 text-right"><button className="text-zinc-500 hover:text-white">✕</button></td>
                  </tr>
                  <tr>
                    <td className="py-3 px-2 font-medium text-white">Lucas Benítez</td>
                    <td className="py-3 px-2">3 Veces x Semana</td>
                    <td className="py-3 px-2"><span className="text-emerald-400 bg-emerald-400/10 px-2 py-0.5 text-xs rounded-md">Al día</span></td>
                    <td className="py-3 px-2 text-right"><button className="text-zinc-500 hover:text-white">✕</button></td>
                  </tr>
                  <tr>
                    <td className="py-3 px-2 font-medium text-white">Martina Sola</td>
                    <td className="py-3 px-2">Pase Libre</td>
                    <td className="py-3 px-2"><span className="text-red-400 bg-red-400/10 px-2 py-0.5 text-xs rounded-md">Vencido</span></td>
                    <td className="py-3 px-2 text-right"><button className="text-orange-500 text-xs font-medium hover:underline">Cobrar</button></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Panel Lateral del Estado de Clases de Hoy */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 space-y-4">
            <h2 className="text-lg font-bold tracking-tight">Próximas Clases</h2>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-950 border border-zinc-800">
                <div>
                  <p className="text-sm font-semibold text-white">Crossfit - Avanzado</p>
                  <p className="text-xs text-zinc-500">Instructor: Lucas M.</p>
                </div>
                <span className="text-xs bg-orange-500/10 text-orange-400 border border-orange-500/20 px-2 py-1 rounded-lg">19:00 hs</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-950 border border-zinc-800">
                <div>
                  <p className="text-sm font-semibold text-white">Funcional / HIIT</p>
                  <p className="text-xs text-zinc-500">Instructora: Sofía R.</p>
                </div>
                <span className="text-xs bg-zinc-800 text-zinc-400 px-2 py-1 rounded-lg">20:15 hs</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-950 border border-zinc-800">
                <div>
                  <p className="text-sm font-semibold text-white">Boxeo Recreativo</p>
                  <p className="text-xs text-zinc-500">Instructor: Damián K.</p>
                </div>
                <span className="text-xs bg-zinc-800 text-zinc-400 px-2 py-1 rounded-lg">21:30 hs</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}