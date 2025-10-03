import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";

const NotFound = () => {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
    setIsVisible(true);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className={`text-center transition-all duration-700 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>

        {/* Animação SVG */}
        <div className="relative mb-8">
          <svg
            className="w-64 h-64 mx-auto"
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="100" cy="100" r="80" stroke="#4F46E5" strokeWidth="8" strokeDasharray="15 10" className="animate-pulse" />
            <path
              d="M60 60L140 140M140 60L60 140"
              stroke="#EC4899"
              strokeWidth="8"
              strokeLinecap="round"
              className="animate-bounce"
            />
            <circle cx="100" cy="100" r="40" fill="#4F46E5" fillOpacity="0.1" className="animate-ping" />
          </svg>
        </div>

        {/* Conteúdo Principal */}
        <div className="space-y-6">
          <h1 className="text-9xl font-black bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            404
          </h1>

          <h2 className="text-3xl font-bold text-white mb-2">
            Página não encontrada
          </h2>

          <p className="text-gray-300 text-lg max-w-md mx-auto leading-relaxed">
            Ops! A página <span className="text-purple-300 font-mono">{location.pathname}</span> que você está procurando não existe ou foi movida.
          </p>

          {/* Botões de Ação */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
            <Link
              to="/"
              className="group relative px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl font-semibold text-white shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-purple-500/25 transform"
            >
              <span className="relative z-10">Voltar para Home</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>

            <button
              onClick={() => window.history.back()}
              className="px-8 py-4 border-2 border-gray-600 text-gray-300 rounded-xl font-semibold transition-all duration-300 hover:border-purple-500 hover:text-white hover:bg-purple-500/10"
            >
              Voltar Anterior
            </button>
          </div>

          {/* Informação adicional */}
          <div className="mt-8 p-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
            <p className="text-gray-400 text-sm">
              Se você acredita que isso é um erro, entre em contato com o suporte.
            </p>
          </div>
        </div>

        {/* Elementos decorativos */}
        <div className="absolute top-10 left-10 w-4 h-4 bg-blue-400 rounded-full animate-bounce"></div>
        <div className="absolute top-20 right-20 w-6 h-6 bg-purple-400 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-3 h-3 bg-pink-400 rounded-full animate-bounce delay-300"></div>
      </div>
    </div>
  );
};

export default NotFound;