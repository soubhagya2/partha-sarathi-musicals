import { useEffect } from "react";
import {  useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { Music } from "lucide-react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { ResetPasswordForm } from "../components/layout/ResetPasswordForm";

function ResetPassword() {
  const navigate = useNavigate();
  const { isLoaded, isSignedIn, isLoading } = useAuthContext();

  // Redirect if already logged in
  useEffect(() => {
    if (isLoaded && isSignedIn && !isLoading) {
      navigate("/");
    }
  }, [isLoaded, isSignedIn, isLoading, navigate]);

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
        <div className="w-full max-w-2xl">
          <div className="bg-white rounded-3xl shadow-md border border-amber-100 overflow-hidden">
            <div className="grid lg:grid-cols-12">
              {/* Left Side - Reset Password Form (5 Columns) */}
              <div className="lg:col-span-5 p-6 lg:p-10 flex flex-col justify-center bg-white">
                <ResetPasswordForm />
              </div>

              {/* Right Side - Image (7 Columns) */}
              <div className="hidden lg:block lg:col-span-7 relative bg-amber-950 min-h-137.5">
                <img
                  src="https://images.unsplash.com/photo-1526374965328-7f5ae4e8e413?w=800&q=80"
                  alt="Reset password"
                  className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-overlay"
                />
                <div className="absolute inset-0 bg-linear-to-t from-amber-950 via-transparent to-amber-950/20" />
                <div className="relative h-full flex flex-col justify-end p-10 text-white">
                  <div className="space-y-2">
                    <div className="h-1 w-10 bg-orange-500 rounded-full mb-4" />
                    <h2 className="font-helper text-3xl font-bold leading-tight tracking-tight">
                      Reset Your Password
                    </h2>
                    <p className="text-amber-100/70 text-sm font-medium leading-relaxed">
                      Create a new, secure password for your account. Make sure
                      it's different from your previous passwords and difficult
                      to guess.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default ResetPassword;
