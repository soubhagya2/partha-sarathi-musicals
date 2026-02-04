import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Lock, Mail, ArrowRight, ShieldAlert } from "lucide-react";
import Header from "../components/layout/Header";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Admin authentication logic would go here
    navigate("/admin/dashboard");
  };

  return (
    <div className="h-screen flex flex-col bg-white overflow-hidden">
      <Header />
      <main className="flex-1 flex overflow-hidden">
        {/* Left Side: Login Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12 bg-red-50/30">
          <div className="w-full max-w-md">
            <div className="bg-white rounded-[2rem] shadow-xl shadow-red-900/5 border border-red-100 p-8 lg:p-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="size-12 rounded-xl bg-red-950 flex items-center justify-center text-white">
                  <ShieldAlert className="size-6" />
                </div>
                <div>
                  <h1 className="font-brand text-2xl text-red-950">
                    Admin Portal
                  </h1>
                  <p className="font-ui text-xs text-red-800/60 font-bold uppercase tracking-widest">
                    Restricted Access
                  </p>
                </div>
              </div>

              <form onSubmit={handleLogin} className="space-y-5">
                <div className="space-y-1.5">
                  <label className="font-ui text-xs font-bold text-red-900/40 uppercase tracking-widest ml-1">
                    Admin Email
                  </label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-red-400 group-focus-within:text-red-950 transition-colors" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="admin@parthasarathi.com"
                      className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-red-50 bg-red-50/50 focus:bg-white focus:border-red-950 outline-none transition-all font-ui text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-ui text-xs font-bold text-red-900/40 uppercase tracking-widest ml-1">
                    Password
                  </label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-red-400 group-focus-within:text-red-950 transition-colors" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-red-50 bg-red-50/50 focus:bg-white focus:border-red-950 outline-none transition-all font-ui text-sm"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-red-950 text-white py-4 rounded-xl font-ui font-bold text-sm shadow-lg shadow-red-950/20 hover:bg-black transition-all flex items-center justify-center gap-2 group"
                >
                  Login to Dashboard
                  <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>

              <div className="mt-6 text-center">
                <Link
                  to="/login"
                  className="text-[10px] font-bold text-red-900/40 hover:text-red-950 uppercase tracking-widest transition-colors"
                >
                  Customer Login
                </Link>
              </div>

              <p className="mt-8 text-center text-[10px] font-bold text-red-800/40 uppercase tracking-[0.2em]">
                Authorized Personnel Only
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Brand Image */}
        <div className="hidden lg:block lg:w-1/2 relative">
          <img
            src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&q=80"
            alt="Admin Office"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-red-950/40 mix-blend-multiply"></div>
        </div>
      </main>
    </div>
  );
};

export default AdminLogin;
