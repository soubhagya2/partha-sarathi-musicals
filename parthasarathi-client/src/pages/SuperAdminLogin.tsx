import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Lock, Mail, ArrowRight, ShieldAlert, Zap } from "lucide-react";
import Header from "../components/layout/Header";
import axios from "axios";
import { toast } from "sonner";

const SuperAdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        {
          email,
          password,
          role: "SUPER_ADMIN",
        },
      );

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/super-admin/dashboard");
    } catch (error) {
      toast.error("Invalid credentials or insufficient permissions");
    }
  };

  return (
    <div className="h-screen flex flex-col bg-slate-950 overflow-hidden">
      <Header />
      <main className="flex-1 flex overflow-hidden">
        {/* Left Side: Login Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12 bg-slate-900">
          <div className="w-full max-w-md">
            <div className="bg-slate-800 rounded-[2rem] shadow-2xl shadow-black border border-slate-700 p-8 lg:p-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="size-12 rounded-xl bg-red-600 flex items-center justify-center text-white shadow-lg shadow-red-900/50">
                  <Zap className="size-6" />
                </div>
                <div>
                  <h1 className="font-brand text-2xl text-white">
                    Terminal Access
                  </h1>
                  <p className="font-ui text-xs text-red-500 font-bold uppercase tracking-widest">
                    Super Admin Level
                  </p>
                </div>
              </div>

              <form onSubmit={handleLogin} className="space-y-5">
                <div className="space-y-1.5">
                  <label className="font-ui text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">
                    Root Identifier
                  </label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-slate-500 group-focus-within:text-red-500 transition-colors" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="root@parthasarathi.com"
                      className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-slate-700 bg-slate-900 text-white focus:border-red-600 outline-none transition-all font-ui text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-ui text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">
                    Access Key
                  </label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-slate-500 group-focus-within:text-red-500 transition-colors" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-slate-700 bg-slate-900 text-white focus:border-red-600 outline-none transition-all font-ui text-sm"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-red-600 text-white py-4 rounded-xl font-ui font-bold text-sm shadow-lg shadow-red-900/20 hover:bg-red-700 transition-all flex items-center justify-center gap-2 group"
                >
                  Initialize System Control
                  <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>

              <div className="mt-6 text-center">
                <Link
                  to="/login"
                  className="text-[10px] font-bold text-slate-500 hover:text-white uppercase tracking-widest transition-colors"
                >
                  Return to Mainframe
                </Link>
              </div>

              <p className="mt-8 text-center text-[10px] font-bold text-red-900 uppercase tracking-[0.2em] animate-pulse">
                Critical System Access Only
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Visual */}
        <div className="hidden lg:block lg:w-1/2 relative bg-black">
          <div className="absolute inset-0 opacity-20">
            <div className="h-full w-full bg-[radial-gradient(#ff0000_1px,transparent_1px)] [background-size:20px_20px]"></div>
          </div>
          <div className="relative h-full flex items-center justify-center p-20">
            <div className="space-y-6">
              <div className="size-24 rounded-3xl bg-red-600/10 border border-red-600/20 flex items-center justify-center text-red-600">
                <ShieldAlert className="size-12" />
              </div>
              <h2 className="font-brand text-5xl text-white leading-tight">
                System <br />
                Overwatch
              </h2>
              <p className="text-slate-400 font-ui text-lg max-w-sm">
                Manage global permissions, audit logs, and core system
                configurations.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SuperAdminLogin;
