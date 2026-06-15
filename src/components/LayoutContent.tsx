"use client";

import { useAuth } from "@/context/providers/AuthContext"; // Ajusta la ruta si es necesario


export function LayoutContent({ children }: { children: React.ReactNode }) {
  const { user, authLoading } = useAuth(); // Consumimos el estado de autenticación

  // 1. Mientras Firebase verifica si hay un usuario, puedes mostrar un spinner o pantalla de carga
  if (authLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-zinc-950 text-white">
        <p>Cargando panel...</p>
      </div>
    );
  }

  // 2. Si NO hay usuario, renderizamos SOLO el contenido (Pantalla de Login)
  if (!user) {
    return <main className="w-full h-screen">{children}</main>;
  }

  // 3. Si SÍ hay usuario, mostramos el layout completo con el Sidebar
  return (
    <div className="flex min-h-screen bg-zinc-900 text-white">
      {/* Tu componente Sidebar de la carpeta components */}
   
      
      {/* Contenido principal de la app de gimnasio */}
      <main className="flex-1 p-6 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}