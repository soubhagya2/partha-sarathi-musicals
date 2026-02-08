import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Lock, ArrowRight, Music, User, Sparkles } from "lucide-react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    instrument: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Registering:", formData);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fffaf5]">
      <Header />
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-5xl">
          <div className="bg-white rounded-3xl shadow-md border border-amber-100 overflow-hidden">
            <div className="grid lg:grid-cols-12">
              <div className="lg:col-span-5 p-6 lg:p-10 flex flex-col justify-center bg-white">
                <div className="max-w-md mx-auto w-full">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="size-10 rounded-lg bg-orange-600 flex items-center justify-center text-white">
                      <Sparkles className="size-5" />
                    </div>
                    <div>
                      <h1 className="font-helper text-2xl font-bold text-amber-950 leading-tight">
                        Create Account
                      </h1>
                      <p className="text-sm text-amber-700/60 font-medium">
                        Begin your musical legacy
                      </p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-amber-950/40 uppercase tracking-wider ml-1">
                        Full Name
                      </label>
                      <div className="relative group">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 size-4.5 text-amber-400 group-focus-within:text-orange-500 transition-colors" />
                        <input
                          type="text"
                          required
                          placeholder="Maestro Name"
                          className="w-full pl-11 pr-4 py-3 rounded-xl border-2 border-amber-50 bg-amber-50/50 focus:bg-white focus:border-orange-500 outline-none text-sm transition-all"
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-amber-950/40 uppercase tracking-wider ml-1">
                        Email Address
                      </label>
                      <div className="relative group">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-4.5 text-amber-400 group-focus-within:text-orange-500 transition-colors" />
                        <input
                          type="email"
                          required
                          placeholder="email@example.com"
                          className="w-full pl-11 pr-4 py-3 rounded-xl border-2 border-amber-50 bg-amber-50/50 focus:bg-white focus:border-orange-500 outline-none text-sm transition-all"
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-amber-950/40 uppercase tracking-wider ml-1">
                        Password
                      </label>
                      <div className="relative group">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 size-4.5 text-amber-400 group-focus-within:text-orange-500 transition-colors" />
                        <input
                          type="password"
                          required
                          placeholder="••••••••"
                          className="w-full pl-11 pr-4 py-3 rounded-xl border-2 border-amber-50 bg-amber-50/50 focus:bg-white focus:border-orange-500 outline-none text-sm transition-all"
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              password: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-amber-950 text-white py-3.5 rounded-xl font-bold text-sm hover:bg-orange-600 transition-all shadow-lg shadow-amber-950/20 active:scale-[0.98] flex items-center justify-center gap-2"
                    >
                      Create Account
                      <ArrowRight className="size-4" />
                    </button>
                  </form>

                  <p className="mt-6 text-center text-xs font-medium text-amber-800/60">
                    Already have an account?{" "}
                    <Link
                      to="/login"
                      className="text-orange-600 font-bold hover:underline"
                    >
                      Sign in
                    </Link>
                  </p>
                </div>
              </div>

              <div className="hidden lg:block lg:col-span-7 relative bg-amber-950 min-h-[550px]">
                <img
                  src="https://images.unsplash.com/photo-1514466750727-39f2f283f577?w=800&q=80"
                  alt="Musical Heritage"
                  className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-overlay"
                />
                <div className="absolute inset-0 bg-linear-to-t from-amber-950 via-transparent to-amber-950/20" />
                <div className="relative h-full flex flex-col justify-end p-10 text-white">
                  <div className="space-y-2">
                    <div className="h-1 w-10 bg-orange-500 rounded-full mb-4" />
                    <h2 className="font-helper text-3xl font-bold leading-tight tracking-tight">
                      Your Journey
                      <br />
                      Starts Here.
                    </h2>
                    <p className="text-amber-100/70 text-sm font-medium leading-relaxed">
                      Join a community of 50,000+ musicians worldwide.
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

export default Register;
