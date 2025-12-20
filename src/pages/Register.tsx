// src/pages/Register.tsx
import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, Mail, Lock, Package, ArrowRight, Sparkles, Check, User, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { register as registerApi } from "@/services/AuthService";

const Register = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const [acceptTerms, setAcceptTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  const passwordOk = useMemo(() => password.length >= 6, [password]);
  const matchOk = useMemo(() => password === confirmPassword, [password, confirmPassword]);

  const canSubmit = useMemo(() => {
    return (
      name.trim().length >= 2 &&
      email.trim().length > 3 &&
      passwordOk &&
      matchOk &&
      acceptTerms &&
      !loading
    );
  }, [name, email, passwordOk, matchOk, acceptTerms, loading]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    setLoading(true);
    try {
      // IMPORTANTE: não envie "role" no cadastro público
      await registerApi({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        password,
      });

      toast({
        title: "Conta criada com sucesso",
        description: "Agora faça login para acessar a plataforma.",
      });

      navigate("/login");
    } catch (err: any) {
      const status = err?.response?.status;
      const apiMsg = err?.response?.data?.message || err?.response?.data;

      toast({
        variant: "destructive",
        title: "Falha ao criar conta",
        description:
          status === 409
            ? "Já existe uma conta com este e-mail."
            : apiMsg
              ? String(apiMsg)
              : "Não foi possível cadastrar. Verifique a API (VITE_API_URL) e tente novamente.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex relative overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-50 via-purple-50/30 to-pink-50/30 -z-10"></div>

      {/* Lado esquerdo */}
      <div className="hidden lg:flex lg:w-[45%] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600"></div>

        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-cyan-400/40 via-transparent to-transparent"></div>
          <div className="absolute bottom-0 right-0 w-full h-full bg-gradient-to-tl from-pink-400/40 via-transparent to-transparent"></div>
        </div>

        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-300/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-fuchsia-300/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }}></div>
        </div>

        <div className="relative z-10 flex flex-col justify-between p-12 xl:p-16 text-white w-full">
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

          <div className="space-y-8 max-w-lg">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-xl rounded-full border border-white/20">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">Cadastro rápido e seguro</span>
            </div>

            <h2 className="text-5xl xl:text-6xl font-bold leading-[1.1] tracking-tight">
              Comece grátis
              <br />
              <span className="bg-gradient-to-r from-white via-purple-100 to-pink-100 bg-clip-text text-transparent">
                em menos de 1 minuto
              </span>
            </h2>

            <p className="text-xl text-white/80 leading-relaxed font-light max-w-md">
              Crie sua conta e acesse a plataforma. Você poderá ajustar permissões depois via administrador.
            </p>

            <div className="space-y-3 pt-4">
              {["Cadastro gratuito", "Senha protegida (BCrypt)", "Acesso por token JWT"].map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3 text-white/90">
                  <Check className="w-5 h-5 text-emerald-400" strokeWidth={3} />
                  <span className="text-sm font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-6">
              <div className="space-y-1">
                <div className="text-3xl font-bold">LGPD</div>
                <div className="text-xs text-white/60 font-medium">Conformidade</div>
              </div>
              <div className="w-px h-12 bg-white/20"></div>
              <div className="space-y-1">
                <div className="text-3xl font-bold">BCrypt</div>
                <div className="text-xs text-white/60 font-medium">Senha segura</div>
              </div>
              <div className="w-px h-12 bg-white/20"></div>
              <div className="space-y-1">
                <div className="text-3xl font-bold">JWT</div>
                <div className="text-xs text-white/60 font-medium">Autenticação</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lado direito - Form */}
      <div className="w-full lg:w-[55%] flex items-center justify-center p-8 relative">
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

          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-purple-500/10 border border-white/20 p-10 xl:p-12">
            <div className="mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-violet-100 to-fuchsia-100 rounded-full mb-4">
                <div className="w-1.5 h-1.5 bg-violet-600 rounded-full animate-pulse"></div>
                <span className="text-xs font-bold text-violet-700">CRIAR CONTA</span>
              </div>
              <h2 className="text-4xl xl:text-5xl font-bold text-slate-900 mb-3 tracking-tight">
                Conta gratuita
              </h2>
              <p className="text-slate-600 text-lg">
                Preencha os dados para criar seu acesso
              </p>
            </div>

            <form onSubmit={handleRegister} className="space-y-6">
              {/* Nome */}
              <div className="space-y-2.5">
                <Label className="text-slate-700 font-bold text-sm tracking-wide">NOME</Label>
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-2xl opacity-0 group-focus-within:opacity-100 blur transition-opacity duration-300"></div>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-violet-600 transition-colors duration-300" />
                    <Input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Seu nome"
                      className="pl-12 h-14 text-base border-2 border-slate-200 rounded-2xl focus:border-violet-600 focus:ring-4 focus:ring-violet-600/10 transition-all duration-300 bg-white/50 focus:bg-white shadow-sm hover:shadow-md"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2.5">
                <Label className="text-slate-700 font-bold text-sm tracking-wide">EMAIL</Label>
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-2xl opacity-0 group-focus-within:opacity-100 blur transition-opacity duration-300"></div>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-violet-600 transition-colors duration-300" />
                    <Input
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

              {/* Telefone (opcional) */}
              <div className="space-y-2.5">
                <Label className="text-slate-700 font-bold text-sm tracking-wide">TELEFONE (OPCIONAL)</Label>
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-2xl opacity-0 group-focus-within:opacity-100 blur transition-opacity duration-300"></div>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-violet-600 transition-colors duration-300" />
                    <Input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="(00) 00000-0000"
                      className="pl-12 h-14 text-base border-2 border-slate-200 rounded-2xl focus:border-violet-600 focus:ring-4 focus:ring-violet-600/10 transition-all duration-300 bg-white/50 focus:bg-white shadow-sm hover:shadow-md"
                    />
                  </div>
                </div>
              </div>

              {/* Senha */}
              <div className="space-y-2.5">
                <Label className="text-slate-700 font-bold text-sm tracking-wide">SENHA</Label>
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-2xl opacity-0 group-focus-within:opacity-100 blur transition-opacity duration-300"></div>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-violet-600 transition-colors duration-300" />
                    <Input
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
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
                <p className={`text-xs ${passwordOk ? "text-emerald-600" : "text-slate-500"}`}>
                  Mínimo de 6 caracteres.
                </p>
              </div>

              {/* Confirmar Senha */}
              <div className="space-y-2.5">
                <Label className="text-slate-700 font-bold text-sm tracking-wide">CONFIRMAR SENHA</Label>
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-2xl opacity-0 group-focus-within:opacity-100 blur transition-opacity duration-300"></div>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-violet-600 transition-colors duration-300" />
                    <Input
                      type={showPassword2 ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••••"
                      className="pl-12 pr-14 h-14 text-base border-2 border-slate-200 rounded-2xl focus:border-violet-600 focus:ring-4 focus:ring-violet-600/10 transition-all duration-300 bg-white/50 focus:bg-white shadow-sm hover:shadow-md"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword2(!showPassword2)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-all duration-300 p-1.5 hover:bg-slate-100 rounded-lg"
                    >
                      {showPassword2 ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
                <p className={`text-xs ${matchOk ? "text-emerald-600" : "text-rose-600"}`}>
                  {matchOk ? "Senhas conferem." : "As senhas precisam ser iguais."}
                </p>
              </div>

              {/* Termos */}
              <div className="flex items-start justify-between pt-2">
                <div className="flex items-start space-x-2.5">
                  <Checkbox
                    checked={acceptTerms}
                    onCheckedChange={(checked) => setAcceptTerms(!!checked)}
                    className="border-2 border-slate-300 data-[state=checked]:bg-gradient-to-br data-[state=checked]:from-violet-600 data-[state=checked]:to-fuchsia-600 data-[state=checked]:border-transparent w-5 h-5 mt-0.5"
                  />
                  <div className="text-sm text-slate-700 font-semibold leading-relaxed">
                    Concordo com os termos e política de privacidade
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                disabled={!canSubmit}
                className="w-full h-14 bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 hover:from-violet-700 hover:via-purple-700 hover:to-fuchsia-700 text-white font-bold text-base rounded-2xl transition-all duration-300 shadow-xl shadow-purple-500/30 hover:shadow-2xl hover:shadow-purple-500/40 hover:scale-[1.02] active:scale-[0.98] mt-4 group"
              >
                {loading ? (
                  <span className="flex items-center gap-3">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Criando...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    Criar conta
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                )}
              </Button>
            </form>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-4 bg-white/80 text-slate-500 font-medium">OU</span>
              </div>
            </div>

            <div className="text-center space-y-4">
              <p className="text-sm text-slate-600">
                Já tem conta?{" "}
                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className="bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent font-bold hover:from-violet-700 hover:to-fuchsia-700 transition-all duration-300"
                >
                  Fazer login
                </button>
              </p>
              <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
                <Lock className="w-3 h-3" />
                <span>Seus dados estão protegidos e criptografados</span>
              </div>
            </div>
          </div>

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

export default Register;
