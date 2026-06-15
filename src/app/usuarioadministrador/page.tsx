"use client";
import {useState} from 'react';
import Sidebar from '@/components/sidebar'
import { useAuth } from "@/context/providers/AuthContext";
import {useRouter}from 'next/navigation'
import{signOut} from 'firebase/auth'
import {auth} from '@/app/lib/firebase'

export default function AdminDashboard() {
  const { user } = useAuth();
const router = useRouter();


const [isSidebarOpen,setIsSidebarOpen]=useState(false)


  const handleLogout=async()=>{
    await signOut(auth);
    router.push('/');
  }

  return (
   <div className="relative min-h-screen flex bg-zinc-950 text-white overflow-x-hidden">
    
    {/* 1. EL SIDEBAR (Capa flotante/Solapa desplegable) */}
    <div 
      className={`fixed top-0 left-0 h-full w-64 bg-zinc-900 border-r border-zinc-800 z-50 transition-transform duration-300 ease-in-out transform ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* Tu componente Sidebar real */}
      <Sidebar />

      {/* Botón opcional para cerrar el menú desde adentro */}
      <button 
        onClick={() => setIsSidebarOpen(false)}
        className="absolute top-4 right-4 text-zinc-400 hover:text-white text-xs bg-zinc-800 px-2 py-1 rounded"
      >
        ✕ Cerrar
      </button>
    </div>

    {/* 2. FONDO OSCURO (Overlay) para cerrar el sidebar haciendo clic afuera */}
    {isSidebarOpen && (
      <div 
        className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        onClick={() => setIsSidebarOpen(false)}
      />
    )}

    {/* 3. CONTENIDO PRINCIPAL DEL DASHBOARD */}
    <div className="flex-1 p-6 space-y-6 animate-fade-in transition-all duration-300">
      
      {/* LA SOLAPA / BOTÓN PARA ABRIR EL SIDEBAR */}
      <div className="flex items-center gap-4 border-b border-zinc-800 pb-4">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="bg-zinc-800 hover:bg-zinc-700 text-white p-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors"
        >
          ☰ <span className="hidden sm:inline">Menú</span>
        </button>

        {/* Encabezado del Dashboard (Tu título original) */}
        <div className="flex-1 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white">
              Panel de Administración 👋
            </h1>
            <p className="text-sm text-zinc-400">
              Bienvenido, <span className="text-orange-500">{user?.displayName || "Admin"}</span>.
            </p>
          </div>

          <button 
            className="self-end md:self-center rounded bg-red-500 hover:bg-red-600 text-white px-4 py-2 text-sm font-medium transition-colors" 
            onClick={handleLogout}
          >
            Cerrar sesión
          </button>
        </div>
      </div>

      {/* Tarjetas de Métricas del Gym (Tu código actual de las líneas 35 en adelante) */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* ... Tus divs de Alumnos Activos, Clases de Hoy, Capacidad del Turno se quedan aquí adentro igual ... */}
      </div>

    </div>
  </div>
  );
}