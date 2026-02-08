import { Link } from "react-router-dom";
import { SignUp } from "@clerk/clerk-react";
import { ShieldAlert, Zap } from "lucide-react";
import Header from "../components/layout/Header";

const SuperAdminRegister = () => {
  return (
    <div className="h-screen flex flex-col bg-slate-950 overflow-hidden">
      <Header />
      <main className="flex-1 flex overflow-hidden">
        {/* Left Side: Registration Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12 bg-slate-900">
          <div className="w-full max-w-md">
            <div className="bg-slate-800 rounded-[2rem] shadow-2xl shadow-black border border-slate-700 p-8 lg:p-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="size-12 rounded-xl bg-red-600 flex items-center justify-center text-white shadow-lg shadow-red-900/50">
                  <Zap className="size-6" />
                </div>
                <div>
                  <h1 className="font-helper text-2xl font-semibold text-white">
                    Initialize Root
                  </h1>
                  <p className="font-ui text-xs text-red-500 font-bold uppercase tracking-widest">
                    Super Admin Registration
                  </p>
                </div>
              </div>

              <div className="flex justify-center">
                <SignUp
                  routing="path"
                  path="/super-admin/register"
                  forceRedirectUrl="/super-admin/dashboard"
                  signInUrl="/super-admin/login"
                />
              </div>

              <div className="mt-6 text-center">
                <Link
                  to="/super-admin/login"
                  className="text-[10px] font-bold text-slate-500 hover:text-white uppercase tracking-widest transition-colors"
                >
                  Already have root access? Login
                </Link>
              </div>

              <p className="mt-8 text-center text-[10px] font-bold text-red-900 uppercase tracking-[0.2em] animate-pulse">
                Authorized Personnel Only
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Visual */}
        <div className="hidden lg:block lg:w-1/2 relative bg-black">
          <div className="absolute inset-0 opacity-20">
            <div className="h-full w-full bg-[radial-gradient(#ff0000_1px,transparent_1px)] [background-size:20px_20px]"></div>
          </div>
          <div className="relative h-full flex items-center justify-center p-20">
            <div className="space-y-6">
              <div className="size-24 rounded-3xl bg-red-600/10 border border-red-600/20 flex items-center justify-center text-red-600">
                <ShieldAlert className="size-12" />
              </div>
              <h2 className="font-helper text-5xl font-semibold text-white leading-tight">
                System <br />
                Genesis
              </h2>
              <p className="text-slate-400 font-ui text-lg max-w-sm">
                Establish the primary administrative authority for the
                Parthasarathi Musical ecosystem.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SuperAdminRegister;
