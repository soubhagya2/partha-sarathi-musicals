import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { ShieldCheck, Loader2, ArrowLeft } from "lucide-react";
import { useNavigate, useLocation, Link } from "react-router-dom";

interface OTPVerificationProps {
  email?: string;
  type?: "register" | "reset";
}

export const OTPVerification: React.FC<OTPVerificationProps> = ({
  email: propEmail,
  type = "register",
}) => {
  const { verifyEmail, resendEmailVerificationOTP, error, clearError } =
    useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const email = propEmail || location.state?.email || "";
  const [otp, setOtp] = useState("");
  const [localError, setLocalError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [timer, setTimer] = useState(30);
  const [showResendMessage, setShowResendMessage] = useState(false);

  if (!email) {
    return (
      <div className="w-full max-w-md mx-auto p-8 bg-white rounded-2xl border border-amber-100 shadow-2xl text-center">
        <p className="text-red-600 mb-4">No email provided</p>
        <Link
          to={type === "register" ? "/register" : "/forgot-password"}
          className="inline-flex items-center gap-2 font-ui font-bold text-orange-600 hover:text-orange-700 transition-colors"
        >
          <ArrowLeft className="size-4" />
          Go Back
        </Link>
      </div>
    );
  }

  useEffect(() => {
    let interval: any;
    if (timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError("");
    clearError();

    if (otp.length !== 6) {
      setLocalError("Please enter a 6-digit code");
      return;
    }

    setIsSubmitting(true);
    try {
      if (type === "register") {
        await verifyEmail(email, otp);
        navigate("/");
      } else {
        // For reset password flow, navigate to reset password page with email
        navigate("/reset-password", { state: { email, otp } });
      }
    } catch (err: any) {
      setLocalError(err.message || "Invalid verification code");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendOTP = async () => {
    setLocalError("");
    clearError();
    setTimer(30);
    try {
      await resendEmailVerificationOTP(email);
      setShowResendMessage(true);
      setTimeout(() => setShowResendMessage(false), 3000);
    } catch (err: any) {
      setLocalError(err.message || "Failed to resend code");
    }
  };

  const displayError = localError || error;

  return (
    <div className="w-full max-w-md mx-auto p-8 bg-white rounded-2xl border border-amber-100 shadow-2xl">
      <div className="text-center mb-8">
        <div className="size-20 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
          <ShieldCheck className="size-10 text-orange-600" />
        </div>
        <h2 className="font-brand text-3xl italic text-amber-900 mb-2">
          Verify {type === "register" ? "Email" : "Identity"}
        </h2>
        <p className="font-ui text-sm text-amber-800/60">
          We've sent a 6-digit code to{" "}
          <span className="font-bold text-amber-950">{email}</span>
        </p>
      </div>

      {displayError && (
        <div className="mb-6 p-3 bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl text-center animate-in slide-in-from-top-2 duration-200">
          {displayError}
        </div>
      )}

      {showResendMessage && (
        <div className="mb-6 p-3 bg-green-50 border border-green-100 text-green-600 text-sm rounded-xl text-center animate-in slide-in-from-top-2 duration-200">
          Code resent successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex justify-center">
          <input
            type="text"
            maxLength={6}
            className="w-56 text-center text-4xl font-bold tracking-[0.4em] py-4 bg-amber-50/30 border border-amber-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 transition-all shadow-inner placeholder:text-amber-900/20"
            placeholder="000000"
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting || otp.length !== 6}
          className="w-full bg-orange-600 text-white py-4 rounded-xl font-ui font-bold flex items-center justify-center gap-2 hover:bg-orange-700 hover:shadow-xl hover:shadow-orange-600/30 active:scale-[0.98] transition-all disabled:opacity-70 disabled:active:scale-100"
        >
          {isSubmitting ? (
            <Loader2 className="size-5 animate-spin" />
          ) : (
            "Verify & Continue"
          )}
        </button>
      </form>

      <p className="mt-8 text-center text-xs text-amber-800/40 uppercase font-bold tracking-widest">
        Didn't receive the code?{" "}
        <button
          type="button"
          disabled={timer > 0 || isSubmitting}
          onClick={handleResendOTP}
          className="text-orange-600 hover:underline disabled:text-amber-800/20 disabled:no-underline transition-colors"
        >
          {timer > 0 ? `Resend in ${timer}s` : "Resend"}
        </button>
      </p>
    </div>
  );
};
