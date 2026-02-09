import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Mail, Lock, ArrowRight, Loader2, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { GoogleLoginButton } from "./GoogleLoginButton";

export const LoginForm: React.FC = () => {
  const { login, error, clearError } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const displayError = localError || error;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError("");
    clearError();
    setIsSubmitting(true);
    try {
      await login({ email, password });
      // AuthContext will redirect based on user role
      navigate("/");
    } catch (err: any) {
      setLocalError(err.message || "Invalid email or password");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-8 bg-white rounded-2xl border border-amber-100 shadow-2xl">
      <div className="text-center mb-8">
        <h2 className="font-brand text-3xl italic text-amber-900 mb-2">
          Welcome Back
        </h2>
        <p className="font-ui text-sm text-amber-800/60">
          Sign in to your musical journey
        </p>
      </div>

      {displayError && (
        <div className="mb-6 p-3 bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl animate-in slide-in-from-top-2 duration-200">
          {displayError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <label className="font-ui text-xs font-bold uppercase tracking-widest text-amber-900/40 ml-1">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-amber-600/40" />
            <input
              type="email"
              required
              className="w-full pl-10 pr-4 py-3 bg-amber-50/30 border border-amber-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all placeholder:text-amber-900/20"
              placeholder="maestro@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="font-ui text-xs font-bold uppercase tracking-widest text-amber-900/40 ml-1">
              Password
            </label>
            <a
              href="/forgot-password"
              className="text-xs font-bold text-orange-600 hover:text-orange-700 transition-colors"
            >
              Forgot?
            </a>
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-amber-600/40" />
            <input
              type={showPassword ? "text" : "password"}
              required
              className="w-full pl-10 pr-12 py-3 bg-amber-50/30 border border-amber-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all placeholder:text-amber-900/20"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-amber-600/40 hover:text-orange-600 transition-colors"
            >
              {showPassword ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !email || !password}
          className="w-full bg-orange-600 text-white py-4 rounded-xl font-ui font-bold flex items-center justify-center gap-2 hover:bg-orange-700 hover:shadow-xl hover:shadow-orange-600/30 active:scale-[0.98] transition-all disabled:opacity-70 disabled:active:scale-100"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="size-5 animate-spin" />
              Signing in...
            </>
          ) : (
            <>
              Sign In <ArrowRight className="size-4" />
            </>
          )}
        </button>
      </form>

      <div className="mt-6 relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-amber-100"></div>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-amber-900/40 font-bold tracking-widest">
            Or with
          </span>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        <GoogleLoginButton label="Continue with Google" />
      </div>

      <p className="mt-8 text-center text-xs text-amber-800/60 font-ui">
        Don't have an account?{" "}
        <a
          href="/register"
          className="font-bold text-orange-600 hover:text-orange-700 transition-colors"
        >
          Join us today
        </a>
      </p>
    </div>
  );
};
