"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/providers/AuthContext";
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { auth } from '@/app/lib/firebase';
import Sidebar from "@/components/sidebar";

export default function UsuariosPage() {
  const { user, authLoading } = useAuth();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Protección de ruta
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

  if (authLoading || !user) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-zinc-400">
        <div className="animate-pulse font-medium">Cargando gestión de usuarios...</div>
      </div>
    );
  }

  // Lista estática simulada de alumnos para el gimnasio
  const alumnos = [
    { id: 1, nombre: "Break boy Linkin", correo: "bboy.linkin@fitnesscrew.com", plan: "Pase Libre", estado: "Activo", vencimiento: "10/07/2026" },
    { id: 2, nombre: "Bboy Hong 10", correo: "bboy.hong10@fitnesscrew.com", plan: "3 Veces x Semana", estado: "Activo", vencimiento: "04/07/2026" },
    { id: 3, nombre: "Bgirl Kate", correo: "bgirl.kate@fitnesscrew.com", plan: "Pase Libre", estado: "Vencido", vencimiento: "12/06/2026" },
    { id: 4, nombre: "Bboy Lil Amok", correo: "bboy.lilamok@mail.com", plan: "Pase Diario", estado: "Inactivo", vencimiento: "01/05/2026" },
    { id: 5, nombre: "Bgirl Jazmin", correo: "bgirl.jazmin@mail.com", plan: "Pase Libre", estado: "Activo", vencimiento: "28/07/2026" },
  ];

  // Filtrar alumnos dinámicamente según la barra de búsqueda
  const filteredAlumnos = alumnos.filter(alumno =>
    alumno.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
    alumno.correo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative min-h-screen flex bg-zinc-950 text-white overflow-x-hidden">
      
      {/* SIDEBAR DESPLEGABLE */}
      <div className={`fixed top-0 left-0 h-full w-64 bg-zinc-900 border-r border-zinc-800 z-50 transition-transform duration-300 ease-in-out transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <Sidebar />
        <button onClick={() => setIsSidebarOpen(false)} className="absolute top-4 right-4 text-zinc-400 hover:text-white text-xs bg-zinc-800 px-2 py-1 rounded">✕ Cerrar</button>
      </div>

      {isSidebarOpen && <div className="fixed inset-0 bg-black/60 z-40" onClick={() => setIsSidebarOpen(false)} />}

      {/* CONTENIDO PRINCIPAL */}
      <div className="flex-1 p-4 md:p-8 space-y-6 transition-all duration-300">
        
        {/* ENCABEZADO */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-zinc-800 pb-5">
          <div className="flex items-center gap-3">
            <button onClick={() => setIsSidebarOpen(true)} className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-white p-2.5 rounded-xl transition-colors">☰</button>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Control de Usuarios</h1>
              <p className="text-sm text-zinc-400">Administra las membresías y accesos de los alumnos.</p>
            </div>
          </div>
          <button onClick={handleLogout} className="self-start sm:self-center rounded-xl bg-red-950/40 hover:bg-red-900/60 text-red-400 border border-red-900/50 px-4 py-2.5 text-sm font-medium transition-colors">
            Cerrar sesión
          </button>
        </div>

        {/* CONTADORES RÁPIDOS */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl">
            <p className="text-xs text-zinc-400 font-medium">Total Registrados</p>
            <p className="text-2xl font-bold mt-1">{alumnos.length}</p>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl">
            <p className="text-xs text-zinc-400 font-medium">Membresías Activas</p>
            <p className="text-2xl font-bold mt-1 text-emerald-400">{alumnos.filter(a => a.estado === "Activo").length}</p>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl col-span-2 lg:col-span-1">
            <p className="text-xs text-zinc-400 font-medium">Pagos Vencidos</p>
            <p className="text-2xl font-bold mt-1 text-red-400">{alumnos.filter(a => a.estado === "Vencido").length}</p>
          </div>
        </div>

        {/* SECCIÓN DE BÚSQUEDA Y LISTADO */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 md:p-6 space-y-4">
          
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
            {/* Input de Búsqueda */}
            <input 
              type="text"
              placeholder="Buscar por nombre o correo..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-zinc-950 border border-zinc-800 text-sm text-white px-4 py-2.5 rounded-xl w-full sm:max-w-xs focus:outline-none focus:border-orange-500 transition-colors"
            />
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-medium text-sm px-4 py-2.5 rounded-xl transition-colors whitespace-nowrap">
              + Nuevo Alumno
            </button>
          </div>

          {/* TABLA DE USUARIOS */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-zinc-400">
              <thead className="text-xs uppercase text-zinc-500 border-b border-zinc-800">
                <tr>
                  <th className="py-3 px-2">Alumno</th>
                  <th className="py-3 px-2 hidden md:table-cell">Plan</th>
                  <th className="py-3 px-2">Estado</th>
                  <th className="py-3 px-2 hidden sm:table-cell">Vencimiento</th>
                  <th className="py-3 px-2 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60">
                {filteredAlumnos.map((alumno) => (
                  <tr key={alumno.id} className="hover:bg-zinc-800/20 transition-colors">
                    <td className="py-4 px-2">
                      <p className="font-medium text-white">{alumno.nombre}</p>
                      <p className="text-xs text-zinc-500">{alumno.correo}</p>
                    </td>
                    <td className="py-4 px-2 hidden md:table-cell">{alumno.plan}</td>
                    <td className="py-4 px-2">
                      <span className={`px-2 py-0.5 text-xs rounded-md font-medium ${
                        alumno.estado === "Activo" ? "bg-emerald-500/10 text-emerald-400" :
                        alumno.estado === "Vencido" ? "bg-red-500/10 text-red-400" :
                        "bg-zinc-800 text-zinc-400"
                      }`}>
                        {alumno.estado}
                      </span>
                    </td>
                    <td className="py-4 px-2 hidden sm:table-cell text-zinc-500">{alumno.vencimiento}</td>
                    <td className="py-4 px-2 text-right space-x-2">
                      <button className="text-xs text-zinc-400 hover:text-white transition-colors">Editar</button>
                      <button className="text-xs text-orange-500 hover:underline transition-colors">Historial</button>
                    </td>
                  </tr>
                ))}
                {filteredAlumnos.length === 0 && (
                  <tr>
                    <td colSpan={5} className="text-center py-8 text-zinc-500 text-sm">
                      No se encontraron alumnos con ese nombre o correo.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

        </div>

      </div>
    </div>
  );
}