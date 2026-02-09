import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { ShieldAlert, Zap, Music } from "lucide-react";
import Header from "../components/layout/Header";
import { LoginForm } from "../components/layout/LoginForm";

const SuperAdminLogin = () => {
  const navigate = useNavigate();
  const { isLoaded, isSignedIn, role, isLoading } = useAuthContext();

  // Redirect if already logged in
  useEffect(() => {
    if (isLoaded && isSignedIn && !isLoading && role) {
      if (role === "SUPER_ADMIN") {
        navigate("/super-admin/dashboard");
      } else if (role === "ADMIN") {
        navigate("/admin/dashboard");
      } else if (role === "SUPPORT") {
        navigate("/support/dashboard");
      } else {
        navigate("/");
      }
    }
  }, [isLoaded, isSignedIn, isLoading, role, navigate]);

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="text-center">
          <Music className="size-12 text-red-600 animate-spin mx-auto mb-4" />
          <p className="text-white font-bold">Accessing Terminal...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-slate-950 overflow-hidden">
      <Header variant="dark" />
      <main className="flex-1 flex overflow-hidden">
        {/* Left Side: Login Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12 bg-slate-900">
          <div className="w-full max-w-md">
            <div className="bg-slate-800 rounded-4xl shadow-2xl shadow-black border border-slate-700 p-8 lg:p-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="size-12 rounded-xl bg-red-600 flex items-center justify-center text-white shadow-lg shadow-red-900/50">
                  <Zap className="size-6" />
                </div>
                <div>
                  <h1 className="font-helper text-2xl font-semibold text-white">
                    Terminal Access
                  </h1>
                  <p className="font-ui text-xs text-red-500 font-bold uppercase tracking-widest">
                    Super Admin Level
                  </p>
                </div>
              </div>

              <LoginForm />

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
            <div className="h-full w-full bg-[radial-gradient(#ff0000_1px,transparent_1px)] bg-size-[20px_20px]"></div>
          </div>
          <div className="relative h-full flex items-center justify-center p-20">
            <div className="space-y-6">
              <div className="size-24 rounded-3xl bg-red-600/10 border border-red-600/20 flex items-center justify-center text-red-600">
                <ShieldAlert className="size-12" />
              </div>
              <h2 className="font-helper text-5xl font-semibold text-white leading-tight">
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
