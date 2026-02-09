import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  Mail,
  Lock,
  User,
  ArrowRight,
  Loader2,
  Eye,
  EyeOff,
} from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { GoogleLoginButton } from "./GoogleLoginButton";

export const RegisterForm: React.FC = () => {
  const { register, error, clearError } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [localError, setLocalError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState<
    "weak" | "medium" | "strong"
  >("weak");

  const displayError = localError || error;

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
    setFormData({ ...formData, password: pwd });
    setPasswordStrength(validatePassword(pwd));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError("");
    clearError();

    if (formData.password !== confirmPassword) {
      setLocalError("Passwords do not match");
      return;
    }

    if (formData.password.length < 8) {
      setLocalError("Password must be at least 8 characters");
      return;
    }

    setIsSubmitting(true);
    try {
      await register(formData);
      navigate("/verify-email", { state: { email: formData.email } });
    } catch (err: any) {
      setLocalError(err.message || "Registration failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-8 bg-white rounded-2xl border border-amber-100 shadow-2xl">
      <div className="text-center mb-8">
        <h2 className="font-brand text-3xl italic text-amber-900 mb-2">
          Join the Symphony
        </h2>
        <p className="font-ui text-sm text-amber-800/60">
          Create your account to start shopping
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
            Full Name
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-amber-600/40" />
            <input
              type="text"
              required
              className="w-full pl-10 pr-4 py-3 bg-amber-50/30 border border-amber-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all placeholder:text-amber-900/20"
              placeholder="Ravi Shankar"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>
        </div>

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
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="font-ui text-xs font-bold uppercase tracking-widest text-amber-900/40 ml-1">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-amber-600/40" />
            <input
              type={showPassword ? "text" : "password"}
              required
              className="w-full pl-10 pr-12 py-3 bg-amber-50/30 border border-amber-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all placeholder:text-amber-900/20"
              placeholder="Create a strong password"
              value={formData.password}
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
          {formData.password && (
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
              placeholder="Confirm password"
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
            !formData.name ||
            !formData.email ||
            !formData.password ||
            formData.password !== confirmPassword ||
            formData.password.length < 8
          }
          className="w-full bg-orange-600 text-white py-4 rounded-xl font-ui font-bold flex items-center justify-center gap-2 hover:bg-orange-700 hover:shadow-xl hover:shadow-orange-600/30 active:scale-[0.98] transition-all disabled:opacity-70 disabled:active:scale-100"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="size-5 animate-spin" />
              Creating account...
            </>
          ) : (
            <>
              Create Account <ArrowRight className="size-4" />
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
            Or join with
          </span>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        <GoogleLoginButton label="Continue with Google" />
      </div>

      <p className="mt-8 text-center text-xs text-amber-800/60 font-ui">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-bold text-orange-600 hover:text-orange-700 transition-colors"
        >
          Sign in here
        </Link>
      </p>
    </div>
  );
};
