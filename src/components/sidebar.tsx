'use client'
import {useState}from 'react'
import { useAuth } from "@/context/providers/AuthContext"; // Ajusta la ruta si es necesario


export function LayoutContent({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth(); // Consumimos el estado de autenticación

  // 1. Mientras Firebase verifica si hay un usuario, puedes mostrar un spinner o pantalla de carga
  if (loading) {
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
      <Sidebar /> 
      
      {/* Contenido principal de la app de gimnasio */}
      <main className="flex-1 p-6 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}

// Usamos lucide-react para los íconos, simula los de tu captura
import { LayoutDashboard, Users, Calendar, Building2, ClipboardList, BarChart3, Settings } from 'lucide-react';

// 1. Definimos un tipo para nuestros ítems del menú (TypeScript structural typing)
interface MenuItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const Sidebar = () => {
  // 2. Estado para saber cuál es la pestaña activa actualmente
  const [activeTab, setActiveTab] = useState<string>('dashboard');

  // 3. Array de configuración con las opciones que vimos en tu captura
  const menuItems: MenuItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'usuarios', label: 'Usuarios', icon: Users },
    { id: 'reservas', label: 'Reservas', icon: Calendar },
    { id: 'establecimientos', label: 'Establecimientos', icon: Building2 },
    { id: 'planes', label: 'Planes', icon: ClipboardList },
    { id: 'reportes', label: 'Reportes', icon: BarChart3 },
    { id: 'configuracion', label: 'Configuración', icon: Settings },
  ];

  return (
    <div className="w-64 h-screen bg-[#0d1117] text-gray-400 flex flex-col border-r border-gray-800 p-4">
      {/* Logo de la App */}
      <div className="px-4 py-6 flex items-center gap-2">
        <span className="text-x font-bold text-white tracking-wider">BreakingTrainningPro<span className="text-amber-500">🤸</span></span>
      </div>

      {/* Lista de Navegación */}
      <nav className="flex-1 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          // 4. Verificamos si este ítem en particular es el que está activo
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)} // 5. Al hacer clic, actualizamos el estado
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200
                ${isActive 
                  ? 'bg-amber-500/10 text-amber-500 border-l-4 border-amber-500 bg-opacity-10 pl-3' 
                  : 'hover:bg-gray-800/50 hover:text-gray-200'
                }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-amber-500' : 'text-gray-500'}`} />
              {item.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
};