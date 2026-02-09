import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { ShieldAlert, Music } from "lucide-react";
import Header from "../components/layout/Header";
import { LoginForm } from "../components/layout/LoginForm";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { isLoaded, isSignedIn, role, isLoading } = useAuthContext();

  // Redirect if already logged in
  useEffect(() => {
    if (isLoaded && isSignedIn && !isLoading && role) {
      // Redirect based on user role
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
      <div className="min-h-screen flex items-center justify-center bg-red-50/30">
        <div className="text-center">
          <Music className="size-12 text-red-600 animate-spin mx-auto mb-4" />
          <p className="text-red-950 font-bold">Loading Admin Portal...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-white overflow-hidden">
      <Header variant="light" />
      <main className="flex-1 flex overflow-hidden">
        {/* Left Side: Login Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12 bg-red-50/30">
          <div className="w-full max-w-md">
            <div className="bg-white rounded-4xl shadow-xl shadow-red-900/5 border border-red-100 p-8 lg:p-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="size-12 rounded-xl bg-red-950 flex items-center justify-center text-white">
                  <ShieldAlert className="size-6" />
                </div>
                <div>
                  <h1 className="font-helper text-2xl font-semibold text-red-950">
                    Admin Portal
                  </h1>
                  <p className="font-ui text-xs text-red-800/60 font-bold uppercase tracking-widest">
                    Restricted Access
                  </p>
                </div>
              </div>

              <LoginForm />

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
