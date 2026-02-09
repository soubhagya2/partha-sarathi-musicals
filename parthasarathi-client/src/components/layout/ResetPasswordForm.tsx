import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  Lock,
  ArrowRight,
  Loader2,
  CheckCircle2,
  Eye,
  EyeOff,
  ArrowLeft,
} from "lucide-react";
import { useNavigate, useLocation, Link } from "react-router-dom";

interface ResetPasswordFormProps {
  email?: string;
  otp?: string;
}

export const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({
  email: propEmail,
  otp: propOtp,
}) => {
  const { resetPassword, error, clearError } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const email = propEmail || location.state?.email || "";
  const otp = propOtp || location.state?.otp || "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [localError, setLocalError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState<
    "weak" | "medium" | "strong"
  >("weak");

  const validatePassword = (pwd: string) => {
    const hasUpperCase = /[A-Z]/.test(pwd);
    const hasLowerCase = /[a-z]/.test(pwd);
    const hasNumber = /\d/.test(pwd);
    const hasSpecialChar = /[!@#$%^&*]/.test(pwd);
    const isLongEnough = pwd.length >= 8;

    const score =
      Number(hasUpperCase) +
      Number(hasLowerCase) +
      Number(hasNumber) +
      Number(hasSpecialChar) +
      Number(isLongEnough);

    if (score <= 2) return "weak";
    if (score <= 3) return "medium";
    return "strong";
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pwd = e.target.value;
    setPassword(pwd);
    setPasswordStrength(validatePassword(pwd));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError("");
    clearError();

    if (!email || !otp) {
      setLocalError("Missing email or verification code");
      return;
    }

    if (password !== confirmPassword) {
      setLocalError("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      setLocalError("Password must be at least 8 characters");
      return;
    }

    setIsSubmitting(true);
    try {
      await resetPassword(email, otp, password);
      setIsSuccess(true);
      setTimeout(() => navigate("/login"), 3000);
    } catch (err: any) {
      setLocalError(err.message || "Failed to reset password");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!email || !otp) {
    return (
      <div className="w-full max-w-md mx-auto p-8 bg-white rounded-2xl border border-amber-100 shadow-2xl text-center">
        <p className="text-red-600 mb-4">
          Invalid reset link. Please request a new password reset.
        </p>
        <Link
          to="/forgot-password"
          className="inline-flex items-center gap-2 font-ui font-bold text-orange-600 hover:text-orange-700 transition-colors"
        >
          <ArrowLeft className="size-4" />
          Forgot Password
        </Link>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="w-full max-w-md mx-auto p-8 bg-white rounded-2xl border border-amber-100 shadow-2xl text-center animate-in fade-in zoom-in duration-300">
        <div className="size-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
          <CheckCircle2 className="size-8 text-green-600" />
        </div>
        <h2 className="font-brand text-3xl italic text-amber-900 mb-3">
          Password Reset!
        </h2>
        <p className="font-ui text-sm text-amber-800/60 mb-8 leading-relaxed">
          Your password has been successfully updated. Redirecting to login...
        </p>
        <Link
          to="/login"
          className="inline-flex items-center gap-2 font-ui font-bold text-orange-600 hover:text-orange-700 transition-colors"
        >
          Go to Login Now
        </Link>
      </div>
    );
  }

  const displayError = localError || error;

  return (
    <div className="w-full max-w-md mx-auto p-8 bg-white rounded-2xl border border-amber-100 shadow-2xl">
      <div className="text-center mb-8">
        <h2 className="font-brand text-3xl italic text-amber-900 mb-2">
          Set New Password
        </h2>
        <p className="font-ui text-sm text-amber-800/60">
          Choose a strong password for your account.
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
            New Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-amber-600/40" />
            <input
              type={showPassword ? "text" : "password"}
              required
              className="w-full pl-10 pr-12 py-3 bg-amber-50/30 border border-amber-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all placeholder:text-amber-900/20"
              placeholder="••••••••"
              value={password}
              onChange={handlePasswordChange}
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
          {password && (
            <div className="text-xs font-bold uppercase tracking-widest ml-1">
              <span
                className={
                  passwordStrength === "strong"
                    ? "text-green-600"
                    : passwordStrength === "medium"
                      ? "text-amber-600"
                      : "text-red-600"
                }
              >
                Strength: {passwordStrength}
              </span>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <label className="font-ui text-xs font-bold uppercase tracking-widest text-amber-900/40 ml-1">
            Confirm Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-amber-600/40" />
            <input
              type={showPassword ? "text" : "password"}
              required
              className="w-full pl-10 pr-12 py-3 bg-amber-50/30 border border-amber-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all placeholder:text-amber-900/20"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
          disabled={
            isSubmitting ||
            !password ||
            password !== confirmPassword ||
            password.length < 8
          }
          className="w-full bg-orange-600 text-white py-4 rounded-xl font-ui font-bold flex items-center justify-center gap-2 hover:bg-orange-700 hover:shadow-xl hover:shadow-orange-600/30 active:scale-[0.98] transition-all disabled:opacity-70 disabled:active:scale-100"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="size-5 animate-spin" />
              Resetting...
            </>
          ) : (
            <>
              Reset Password <ArrowRight className="size-4" />
            </>
          )}
        </button>
      </form>

      <p className="mt-6 text-center text-xs text-amber-800/40 uppercase font-bold tracking-widest">
        <Link
          to="/forgot-password"
          className="text-orange-600 hover:underline transition-colors"
        >
          Request another reset
        </Link>
      </p>
    </div>
  );
};
