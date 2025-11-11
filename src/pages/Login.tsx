// src/pages/Login.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, Mail, Lock, Package, ArrowRight, Sparkles, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { login as loginApi } from "@/services/AuthService";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await loginApi(email, password);

      toast({
        title: "Login realizado com sucesso!",
        description: `Bem-vindo, ${data.name}`,
      });

      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userEmail", data.email);
      localStorage.setItem("authToken", data.token);

      if (rememberMe) {
        localStorage.setItem("rememberMe", "true");
      } else {
        localStorage.removeItem("rememberMe");
      }

      navigate("/usuarios");
    } catch (err: any) {
      const status = err?.response?.status;
      toast({
        variant: "destructive",
        title: "Falha no login",
        description:
          status === 401
            ? "Credenciais inválidas."
            : "Não foi possível autenticar. Verifique a URL (VITE_API_URL) e se a API está rodando.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex relative overflow-hidden">
      {/* Background animado global */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-50 via-purple-50/30 to-pink-50/30 -z-10"></div>

      {/* Lado esquerdo - Ultra Premium */}
      <div className="hidden lg:flex lg:w-[45%] relative overflow-hidden">
        {/* Background com múltiplas camadas */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600"></div>

        {/* Mesh gradient overlay */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-cyan-400/40 via-transparent to-transparent"></div>
          <div className="absolute bottom-0 right-0 w-full h-full bg-gradient-to-tl from-pink-400/40 via-transparent to-transparent"></div>
        </div>

        {/* Elementos flutuantes decorativos */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-300/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-fuchsia-300/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        {/* Conteúdo */}
        <div className="relative z-10 flex flex-col justify-between p-12 xl:p-16 text-white w-full">
          {/* Logo Premium */}
          <div className="space-y-1">
            <div className="flex items-center gap-3 mb-12">
              <div className="relative group">
                <div className="absolute inset-0 bg-white/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                <div className="relative w-14 h-14 bg-white/10 backdrop-blur-2xl rounded-2xl flex items-center justify-center border border-white/30 shadow-2xl group-hover:scale-110 transition-transform duration-500">
                  <Package className="w-7 h-7 text-white" strokeWidth={2} />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Depósito do Pit</h1>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <Sparkles className="w-3 h-3 text-yellow-300" />
                  <span className="text-xs text-white/70 font-medium">Premium Edition</span>
                </div>
              </div>
            </div>
          </div>

          {/* Texto central com animação */}
          <div className="space-y-8 max-w-lg">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-xl rounded-full border border-white/20">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">Mais de 1.000 empresas confiam</span>
            </div>

            <h2 className="text-5xl xl:text-6xl font-bold leading-[1.1] tracking-tight">
              Gestão que
              <br />
              <span className="bg-gradient-to-r from-white via-purple-100 to-pink-100 bg-clip-text text-transparent">
                eleva resultados
              </span>
            </h2>

            <p className="text-xl text-white/80 leading-relaxed font-light max-w-md">
              Controle inteligente de estoque com IA.
              Automatize processos e economize até 40% do seu tempo.
            </p>

            {/* Features list */}
            <div className="space-y-3 pt-4">
              {[
                "Relatórios em tempo real",
                "Integração com ERP",
                "Suporte 24/7"
              ].map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3 text-white/90">
                  <Check className="w-5 h-5 text-emerald-400" strokeWidth={3} />
                  <span className="text-sm font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Rodapé com stats */}
          <div className="space-y-4">
            <div className="flex items-center gap-6">
              <div className="space-y-1">
                <div className="text-3xl font-bold">98%</div>
                <div className="text-xs text-white/60 font-medium">Satisfação</div>
              </div>
              <div className="w-px h-12 bg-white/20"></div>
              <div className="space-y-1">
                <div className="text-3xl font-bold">24/7</div>
                <div className="text-xs text-white/60 font-medium">Disponível</div>
              </div>
              <div className="w-px h-12 bg-white/20"></div>
              <div className="space-y-1">
                <div className="text-3xl font-bold">+1k</div>
                <div className="text-xs text-white/60 font-medium">Clientes</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lado direito - Formulário ultra elegante */}
      <div className="w-full lg:w-[55%] flex items-center justify-center p-8 relative">
        {/* Card flutuante com sombra suave */}
        <div className="w-full max-w-md xl:max-w-lg">
          {/* Logo mobile */}
          <div className="lg:hidden mb-10 flex items-center gap-3">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative w-12 h-12 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-xl flex items-center justify-center shadow-lg">
                <Package className="w-6 h-6 text-white" strokeWidth={2} />
              </div>
            </div>
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
                Depósito do Pit
              </span>
              <div className="flex items-center gap-1 mt-0.5">
                <Sparkles className="w-3 h-3 text-yellow-500" />
                <span className="text-xs text-slate-500 font-medium">Premium</span>
              </div>
            </div>
          </div>

          {/* Card principal */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-purple-500/10 border border-white/20 p-10 xl:p-12">
            {/* Header */}
            <div className="mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-violet-100 to-fuchsia-100 rounded-full mb-4">
                <div className="w-1.5 h-1.5 bg-violet-600 rounded-full animate-pulse"></div>
                <span className="text-xs font-bold text-violet-700">ACESSO SEGURO</span>
              </div>
              <h2 className="text-4xl xl:text-5xl font-bold text-slate-900 mb-3 tracking-tight">
                Bem-vindo de volta
              </h2>
              <p className="text-slate-600 text-lg">
                Entre com suas credenciais para continuar
              </p>
            </div>

            {/* Formulário */}
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2.5">
                <Label
                  htmlFor="email"
                  className="text-slate-700 font-bold text-sm tracking-wide"
                >
                  EMAIL
                </Label>
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-2xl opacity-0 group-focus-within:opacity-100 blur transition-opacity duration-300"></div>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-violet-600 transition-colors duration-300" />
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="voce@exemplo.com"
                      className="pl-12 h-14 text-base border-2 border-slate-200 rounded-2xl focus:border-violet-600 focus:ring-4 focus:ring-violet-600/10 transition-all duration-300 bg-white/50 focus:bg-white shadow-sm hover:shadow-md"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2.5">
                <Label
                  htmlFor="password"
                  className="text-slate-700 font-bold text-sm tracking-wide"
                >
                  SENHA
                </Label>
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-2xl opacity-0 group-focus-within:opacity-100 blur transition-opacity duration-300"></div>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-violet-600 transition-colors duration-300" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••"
                      className="pl-12 pr-14 h-14 text-base border-2 border-slate-200 rounded-2xl focus:border-violet-600 focus:ring-4 focus:ring-violet-600/10 transition-all duration-300 bg-white/50 focus:bg-white shadow-sm hover:shadow-md"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-all duration-300 p-1.5 hover:bg-slate-100 rounded-lg"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center space-x-2.5">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(!!checked)}
                    className="border-2 border-slate-300 data-[state=checked]:bg-gradient-to-br data-[state=checked]:from-violet-600 data-[state=checked]:to-fuchsia-600 data-[state=checked]:border-transparent w-5 h-5"
                  />
                  <label
                    htmlFor="remember"
                    className="text-sm text-slate-700 cursor-pointer select-none font-semibold"
                  >
                    Manter conectado
                  </label>
                </div>
                <button
                  type="button"
                  className="text-sm bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent font-bold hover:from-violet-700 hover:to-fuchsia-700 transition-all duration-300"
                >
                  Esqueceu a senha?
                </button>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-14 bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 hover:from-violet-700 hover:via-purple-700 hover:to-fuchsia-700 text-white font-bold text-base rounded-2xl transition-all duration-300 shadow-xl shadow-purple-500/30 hover:shadow-2xl hover:shadow-purple-500/40 hover:scale-[1.02] active:scale-[0.98] mt-8 group"
              >
                {loading ? (
                  <span className="flex items-center gap-3">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Entrando...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    Entrar na plataforma
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                )}
              </Button>
            </form>

            {/* Divisor */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-4 bg-white/80 text-slate-500 font-medium">OU</span>
              </div>
            </div>

            {/* Rodapé */}
            <div className="text-center space-y-4">
              <p className="text-sm text-slate-600">
                Ainda não tem uma conta?{" "}
                <button className="bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent font-bold hover:from-violet-700 hover:to-fuchsia-700 transition-all duration-300">
                  Criar conta gratuita
                </button>
              </p>
              <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
                <Lock className="w-3 h-3" />
                <span>Seus dados estão protegidos e criptografados</span>
              </div>
            </div>
          </div>

          {/* Badge de confiança */}
          <div className="mt-6 flex items-center justify-center gap-6 text-xs text-slate-400">
            <div className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-500" strokeWidth={3} />
              <span>SSL Seguro</span>
            </div>
            <div className="w-px h-4 bg-slate-300"></div>
            <div className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-blue-500" strokeWidth={3} />
              <span>LGPD</span>
            </div>
            <div className="w-px h-4 bg-slate-300"></div>
            <div className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-purple-500" strokeWidth={3} />
              <span>ISO 27001</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;