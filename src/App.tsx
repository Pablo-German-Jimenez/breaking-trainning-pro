import  Sidebar  from './components/sidebar';

function App() {
  return (
    <div className="flex bg-[#070a0e] min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8 text-white">
        {/* Acá irá el contenido del dashboard más adelante */}
        <h1 className="text-2xl font-bold">Contenido Principal</h1>
      </main>
    </div>
  );
}

export default App;