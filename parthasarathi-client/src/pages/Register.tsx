import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { Music, Lock } from "lucide-react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { RegisterForm } from "../components/layout/RegisterForm";

function Register() {
  const navigate = useNavigate();
  const { isLoaded, isSignedIn, role, isLoading } = useAuthContext();

  // Redirect if already logged in
  useEffect(() => {
    if (isLoaded && isSignedIn && !isLoading && role) {
      // Redirect based on user role synced from backend
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
      <div className="min-h-screen flex items-center justify-center bg-[#fffaf5]">
        <div className="text-center">
          <Music className="size-12 text-orange-600 animate-spin mx-auto mb-4" />
          <p className="text-amber-950 font-bold">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#fffaf5]">
      <Header />
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-5xl">
          <div className="bg-white rounded-3xl shadow-md border border-amber-100 overflow-hidden">
            <div className="grid lg:grid-cols-12">
              <div className="lg:col-span-5 p-6 lg:p-10 flex flex-col justify-center bg-white max-h-[90vh] overflow-y-auto">
                <div className="max-w-md mx-auto w-full">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="size-10 rounded-lg bg-orange-600 flex items-center justify-center text-white">
                      <Music className="size-5" />
                    </div>
                    <div>
                      <h1 className="font-helper text-2xl font-bold text-amber-950 leading-tight">
                        Join Us
                      </h1>
                      <p className="text-sm text-amber-700/60 font-medium">
                        Start your musical journey today
                      </p>
                    </div>
                  </div>

                  <RegisterForm />

                  <div className="mt-8 pt-6 border-t border-amber-50 flex justify-center gap-6">
                    <Link
                      to="/support/login"
                      className="text-[10px] font-bold text-amber-900/40 hover:text-orange-600 uppercase tracking-widest transition-colors"
                    >
                      Support Portal
                    </Link>
                    <Link
                      to="/admin/login"
                      className="text-[10px] font-bold text-amber-900/40 hover:text-orange-600 uppercase tracking-widest transition-colors"
                    >
                      Admin Access
                    </Link>
                  </div>
                </div>
              </div>

              {/* Right Side - Image (5 Columns) */}
              <div className="hidden lg:block lg:col-span-7 relative bg-amber-950 min-h-137.5">
                <img
                  src="https://images.unsplash.com/photo-1514804849526-54fcdc0e1a16?w=800&q=80"
                  alt="Music Studio"
                  className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-overlay"
                />
                <div className="absolute inset-0 bg-linear-to-t from-amber-950 via-transparent to-amber-950/20" />
                <div className="relative h-full flex flex-col justify-end p-10 text-white">
                  <div className="space-y-2">
                    <div className="h-1 w-10 bg-orange-500 rounded-full mb-4" />
                    <h2 className="font-helper text-3xl font-bold leading-tight tracking-tight">
                      Discover Your <br />
                      Musical Passion
                    </h2>
                    <p className="text-amber-100/70 text-sm font-medium leading-relaxed">
                      Join thousands of music enthusiasts. Browse, learn, and
                      connect with instruments and artists.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <p className="font-helper mt-4 text-center text-[10px] font-bold uppercase tracking-widest text-amber-900/30 flex items-center justify-center gap-2">
            <Lock className="size-3" /> Encrypted Secure Access
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Register;
