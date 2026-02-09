import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  Mail,
  ArrowRight,
  Loader2,
  CheckCircle2,
  ArrowLeft,
} from "lucide-react";
import { Link } from "react-router-dom";

export const ForgotPasswordForm: React.FC = () => {
  const { forgotPassword, error, clearError } = useAuth();
  const [email, setEmail] = useState("");
  const [localError, setLocalError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError("");
    clearError();
    setIsSubmitting(true);
    try {
      await forgotPassword(email);
      setIsSuccess(true);
    } catch (err: any) {
      setLocalError(err.message || "Failed to send reset email");
    } finally {
      setIsSubmitting(false);
    }
  };

  const displayError = localError || error;

  if (isSuccess) {
    return (
      <div className="w-full max-w-md mx-auto p-8 bg-white rounded-2xl border border-amber-100 shadow-2xl text-center animate-in fade-in zoom-in duration-300">
        <div className="size-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
          <CheckCircle2 className="size-8 text-green-600" />
        </div>
        <h2 className="font-brand text-3xl italic text-amber-900 mb-3">
          Check your email
        </h2>
        <p className="font-ui text-sm text-amber-800/60 mb-8 leading-relaxed">
          We've sent password reset instructions to{" "}
          <span className="font-bold text-amber-950 block mt-1">{email}</span>
        </p>
        <div className="space-y-3">
          <p className="font-ui text-xs text-amber-800/60">
            Don't see it? Check your spam folder or request a new reset link.
          </p>
          <button
            onClick={() => {
              setEmail("");
              setIsSuccess(false);
            }}
            className="w-full px-4 py-2 text-sm font-bold text-orange-600 hover:text-orange-700 transition-colors"
          >
            Try another email
          </button>
        </div>
        <Link
          to="/login"
          className="inline-flex items-center gap-2 font-ui font-bold text-amber-700/60 hover:text-orange-600 transition-colors mt-6"
        >
          <ArrowLeft className="size-4" />
          Back to Login
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto p-8 bg-white rounded-2xl border border-amber-100 shadow-2xl">
      <div className="text-center mb-8">
        <h2 className="font-brand text-3xl italic text-amber-900 mb-2">
          Reset Password
        </h2>
        <p className="font-ui text-sm text-amber-800/60">
          Enter your email to receive password reset instructions
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

        <button
          type="submit"
          disabled={isSubmitting || !email}
          className="w-full bg-orange-600 text-white py-4 rounded-xl font-ui font-bold flex items-center justify-center gap-2 hover:bg-orange-700 hover:shadow-xl hover:shadow-orange-600/30 active:scale-[0.98] transition-all disabled:opacity-70 disabled:active:scale-100"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="size-5 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              Send Reset Link <ArrowRight className="size-4" />
            </>
          )}
        </button>
      </form>

      <div className="mt-8 pt-6 border-t border-amber-100 text-center">
        <p className="font-ui text-sm text-amber-800/60 mb-4">
          Remember your password?
        </p>
        <Link
          to="/login"
          className="inline-flex items-center gap-2 font-ui font-bold text-orange-600 hover:text-orange-700 transition-colors"
        >
          <ArrowLeft className="size-4" />
          Back to Login
        </Link>
      </div>
    </div>
  );
};
