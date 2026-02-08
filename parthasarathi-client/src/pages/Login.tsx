import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Mail,
  Lock,
  ArrowRight,
  Music,
  Eye,
  EyeOff,
  AlertCircle,
} from "lucide-react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });

  const validateForm = () => {
    const newErrors = { email: "", password: "" };
    let isValid = true;

    if (!email) {
      newErrors.email = "Required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email format";
      isValid = false;
    }

    if (!password) {
      newErrors.password = "Required";
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = "Min 6 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Login attempt with:", { email, password, rememberMe });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fffaf5]">
      <Header />
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-5xl">
          <div className="bg-white rounded-3xl shadow-md border border-amber-100 overflow-hidden">
            <div className="grid lg:grid-cols-12">
              {/* Left Side - Form (7 Columns) */}
              <div className="lg:col-span-5 p-6 lg:p-10 flex flex-col justify-center bg-white">
                <div className="max-w-md mx-auto w-full">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="size-10 rounded-lg bg-orange-600 flex items-center justify-center text-white ">
                      <Music className="size-5" />
                    </div>
                    <div>
                      <h1 className="font-helper text-2xl font-bold text-amber-950 leading-tight">
                        Welcome Back
                      </h1>
                      <p className="text-sm text-amber-700/60 font-medium">
                        Continue your musical journey
                      </p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Email Field */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-amber-950/40 uppercase tracking-wider ml-1">
                        Email Address
                      </label>
                      <div className="relative group">
                        <Mail
                          className={`absolute left-4 top-1/2 -translate-y-1/2 size-4.5 transition-colors ${errors.email ? "text-red-400" : "text-amber-400 group-focus-within:text-orange-500"}`}
                        />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            setErrors({ ...errors, email: "" });
                          }}
                          placeholder="Enter your email"
                          className={`w-full pl-11 pr-4 py-3 rounded-xl border-2 transition-all outline-none text-sm ${
                            errors.email
                              ? "border-red-100 bg-red-50/30 focus:border-red-400"
                              : "border-amber-50 bg-amber-50/50 focus:bg-white focus:border-orange-500"
                          }`}
                        />
                      </div>
                      {errors.email && (
                        <p className="text-[11px] text-red-500 font-bold ml-1">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    {/* Password Field */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center px-1">
                        <label className="text-xs font-bold text-amber-950/40 uppercase tracking-wider">
                          Password
                        </label>
                        <Link
                          to="/forgot-password"
                          size-sm
                          className="text-[11px] font-bold text-orange-600 hover:text-orange-700 transition-colors"
                        >
                          Forgot?
                        </Link>
                      </div>
                      <div className="relative group">
                        <Lock
                          className={`absolute left-4 top-1/2 -translate-y-1/2 size-4.5 transition-colors ${errors.password ? "text-red-400" : "text-amber-400 group-focus-within:text-orange-500"}`}
                        />
                        <input
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => {
                            setPassword(e.target.value);
                            setErrors({ ...errors, password: "" });
                          }}
                          placeholder="••••••••"
                          className={`w-full pl-11 pr-11 py-3 rounded-xl border-2 transition-all outline-none text-sm ${
                            errors.password
                              ? "border-red-100 bg-red-50/30 focus:border-red-400"
                              : "border-amber-50 bg-amber-50/50 focus:bg-white focus:border-orange-500"
                          }`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-amber-400 hover:text-orange-600"
                        >
                          {showPassword ? (
                            <EyeOff className="size-4.5" />
                          ) : (
                            <Eye className="size-4.5" />
                          )}
                        </button>
                      </div>
                      {errors.password && (
                        <p className="text-[11px] text-red-500 font-bold ml-1">
                          {errors.password}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      <input
                        type="checkbox"
                        id="remember"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="size-4 accent-orange-600"
                      />
                      <label
                        htmlFor="remember"
                        className="text-xs font-medium text-amber-800/70 cursor-pointer"
                      >
                        Stay signed in
                      </label>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-amber-950 text-white py-3.5 rounded-xl font-bold text-sm hover:bg-orange-600 transition-all shadow-lg shadow-amber-950/20 active:scale-[0.98] flex items-center justify-center gap-2"
                    >
                      Sign In Account
                      <ArrowRight className="size-4" />
                    </button>
                  </form>

                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-amber-100"></div>
                    </div>
                    <div className="relative flex justify-center">
                      <span className="bg-white px-3 text-[10px] font-bold text-amber-300 uppercase tracking-widest">
                        Or login with
                      </span>
                    </div>
                  </div>

                  <button className="w-full border-2 border-amber-100 py-2.5 rounded-xl font-bold text-amber-950 text-xs hover:bg-amber-50 transition-all flex items-center justify-center gap-2">
                    <img
                      src="https://www.svgrepo.com/show/475656/google-color.svg"
                      className="size-4"
                      alt="Google"
                    />
                    Continue with Google
                  </button>

                  <p className="mt-6 text-center text-xs font-medium text-amber-800/60">
                    New here?{" "}
                    <Link
                      to="/register"
                      className="text-orange-600 font-bold hover:underline"
                    >
                      Create an account
                    </Link>
                  </p>

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
              <div className="hidden lg:block lg:col-span-7 relative bg-amber-950 min-h-[550px]">
                <img
                  src="https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&q=80"
                  alt="Instruments"
                  className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-overlay"
                />
                <div className="absolute inset-0 bg-linear-to-t from-amber-950 via-transparent to-amber-950/20" />
                <div className="relative h-full flex flex-col justify-end p-10 text-white">
                  <div className="space-y-2">
                    <div className="h-1 w-10 bg-orange-500 rounded-full mb-4" />
                    <h2 className="font-helper text-3xl font-bold leading-tight tracking-tight">
                      Crafting Sounds,
                      <br />
                      Inspiring Souls.
                    </h2>
                    <p className="text-amber-100/70 text-sm font-medium leading-relaxed">
                      Join the Parthasarathi family and access premium musical
                      treasures.
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

export default Login;
