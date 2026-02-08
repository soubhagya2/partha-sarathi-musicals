import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Mail,
  ArrowLeft,
  AlertCircle,
  Music,
  CheckCircle2,
} from "lucide-react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fffaf5]">
      <Header />
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-[2.5rem] shadow-xl shadow-orange-900/5 border border-amber-100 p-8 lg:p-12 relative overflow-hidden">
            <div className="relative z-10">
              {!isSubmitted ? (
                <>
                  <div className="flex justify-center mb-8">
                    <div className="size-16 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-600">
                      <Music className="size-8" />
                    </div>
                  </div>
                  <h1 className="font-helper text-3xl text-center font-semibold text-amber-900 mb-2">
                    Reset Password
                  </h1>
                  <p className="font-ui text-center text-amber-800/60 mb-8 text-sm">
                    Enter your email and we'll send you instructions to reset
                    your password.
                  </p>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <label className="font-ui text-xs font-bold text-amber-900/40 uppercase tracking-widest ml-1">
                        Email Address
                      </label>
                      <div className="relative group">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-amber-400 group-focus-within:text-orange-500 transition-colors" />
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-amber-50 bg-amber-50/30 focus:bg-white focus:border-orange-500 outline-none transition-all font-ui text-sm"
                          placeholder="maestro@example.com"
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-amber-950 text-white py-4 rounded-2xl font-bold text-sm hover:bg-orange-600 transition-all shadow-lg shadow-amber-950/20"
                    >
                      Send Reset Link
                    </button>
                  </form>
                </>
              ) : (
                <div className="text-center py-4">
                  <div className="flex justify-center mb-6">
                    <div className="size-20 rounded-full bg-green-50 flex items-center justify-center text-green-500">
                      <CheckCircle2 className="size-10" />
                    </div>
                  </div>
                  <h2 className="font-helper text-3xl font-semibold text-amber-900 mb-3">
                    Check Your Email
                  </h2>
                  <p className="font-ui text-amber-800/60 text-sm leading-relaxed mb-8">
                    We've sent a password reset link to <br />
                    <span className="font-bold text-amber-950">{email}</span>
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="text-orange-600 font-bold text-sm hover:underline"
                  >
                    Didn't receive it? Try again
                  </button>
                </div>
              )}
              <div className="mt-8 pt-8 border-t border-amber-50 text-center">
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 text-sm font-bold text-amber-900/40 hover:text-orange-600 transition-colors"
                >
                  <ArrowLeft className="size-4" /> Back to Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default ForgotPassword;
