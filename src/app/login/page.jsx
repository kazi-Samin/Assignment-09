"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
// import { authClient } from "@/lib/auth-client";
import {
  loginUser,
  getCurrentUser,
} from "@/lib/auth-client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] =
    useState(false);
  const [redirectUrl, setRedirectUrl] =
    useState("/home");
    useEffect(() => {
  async function checkUser() {
    const user =
      await getCurrentUser();

    setSession(user);

    setIsPending(false);
  }

  checkUser();
}, []);

    const [session, setSession] =
  useState(null);

const [isPending, setIsPending] =
  useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(
        window.location.search
      );

      setRedirectUrl(
        params.get("redirect") || "/home"
      );
    }
  }, []);

  useEffect(() => {
    if (!isPending && session) {
      window.location.href = redirectUrl;
    }
  }, [session, isPending, redirectUrl]);

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      // const result =
      //   await authClient.signIn.email({
      //     email,
      //     password,
      //   });
      const result =
  await loginUser(
    email,
    password
  );

      // if (result.error) {
      //   setError(
      //     result.error.message ||
      //       "Invalid email or password."
      //   );
      //   setLoading(false);
      //   return;
      // }
if (!result.success) {

  setError(
    result.message ||
      "Invalid email or password."
  );

  setLoading(false);

  return;
}
      window.location.href = redirectUrl;
    } catch (err) {
      console.error("Login Error:", err);
      setError(
        "Something went wrong. Please try again."
      );
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: redirectUrl,
      });
    } catch (err) {
      console.error(
        "Google login failed:",
        err
      );
    }
  };

  if (isPending) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center">
        <span className="loading loading-spinner loading-lg text-emerald-600"></span>
        <p className="mt-3 text-sm font-medium text-slate-500">
          Checking your session...
        </p>
      </div>
    );
  }

  if (session) return null;

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 px-4 py-8 flex items-center justify-center">
      <div className="w-full max-w-6xl bg-white border border-slate-100 rounded-[40px] overflow-hidden shadow-[0_30px_80px_rgba(15,23,42,0.10)] grid lg:grid-cols-2">
        {/* Left Panel */}
        <div className="hidden lg:flex relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-900 text-white p-12 xl:p-16 flex-col justify-between">
          {/* Glow Effects */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl"></div>

          {/* Grid Pattern */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] bg-[size:24px_24px]"></div>

          {/* Logo */}
          <Link
            href="/home"
            className="relative z-10 flex items-center gap-4"
          >
            <div className="w-14 h-14 rounded-3xl bg-white/10 border border-white/10 backdrop-blur-xl flex items-center justify-center">
              <svg
                className="w-7 h-7 text-emerald-400"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M10 4h4v6h6v4h-6v6h-4v-6H4v-4h6V4z" />
              </svg>
            </div>

            <div>
              <h2 className="text-3xl font-bold tracking-tight">
                Medi
                <span className="text-emerald-400">
                  Care
                </span>
              </h2>
              <p className="text-sm text-slate-300">
                Smart Healthcare Platform
              </p>
            </div>
          </Link>

          {/* Main Content */}
          <div className="relative z-10 max-w-xl">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 text-sm font-medium mb-8">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              Trusted by Thousands of Patients
            </span>

            <h1 className="text-5xl xl:text-6xl font-bold leading-tight tracking-tight">
              Secure Access to
              <span className="block text-emerald-400">
                Better Healthcare
              </span>
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-slate-300 max-w-lg">
              Sign in to manage your
              appointments, update your
              profile, and connect with trusted
              medical specialists anytime.
            </p>
          </div>

          {/* Stats */}
          <div className="relative z-10 grid grid-cols-3 gap-4">
            {[
              ["250+", "Doctors"],
              ["50K+", "Patients"],
              ["24/7", "Support"],
            ].map(([value, label]) => (
              <div
                key={label}
                className="rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl p-5"
              >
                <h3 className="text-2xl font-bold">
                  {value}
                </h3>
                <p className="text-sm text-slate-300 mt-1">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel */}
        <div className="p-6 sm:p-10 lg:p-14 flex items-center bg-white">
          <div className="w-full max-w-md mx-auto">
            {/* Mobile Logo */}
            <Link
              href="/home"
              className="lg:hidden flex items-center gap-3 mb-8"
            >
              <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-200">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M10 4h4v6h6v4h-6v6h-4v-6H4v-4h6V4z" />
                </svg>
              </div>

              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  MediCare
                </h2>
                <p className="text-xs text-slate-500">
                  Smart Healthcare
                </p>
              </div>
            </Link>

            {/* Header */}
            <div className="mb-8">
              <span className="text-sm font-semibold text-emerald-600 uppercase tracking-widest">
                Welcome Back
              </span>

              <h1 className="mt-3 text-4xl font-bold text-slate-900 tracking-tight">
                Sign In
              </h1>

              <p className="mt-2 text-slate-500 leading-relaxed">
                Access your account to manage
                appointments and healthcare
                records.
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-5 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                {error}
              </div>
            )}

            {/* Google Login */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold transition-all duration-300"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="w-5 h-5"
              />
              Continue with Google
            </button>

            {/* Divider */}
            <div className="flex items-center gap-4 my-7">
              <div className="h-px bg-slate-200 flex-1"></div>
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Or continue with email
              </span>
              <div className="h-px bg-slate-200 flex-1"></div>
            </div>

            {/* Form */}
            <form
              onSubmit={handleLogin}
              className="space-y-5"
            >
              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Email Address
                </label>

                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="w-full px-5 py-4 rounded-2xl border border-slate-200 bg-slate-50 text-slate-700 placeholder-slate-400 outline-none transition-all duration-300 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                />
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-semibold text-slate-700">
                    Password
                  </label>

                  <Link
                    href="#"
                    className="text-sm font-medium text-emerald-600 hover:text-emerald-700 transition"
                  >
                    Forgot Password?
                  </Link>
                </div>

                <input
                  type="password"
                  required
                  placeholder="Enter your password"
                  className="w-full px-5 py-4 rounded-2xl border border-slate-200 bg-slate-50 text-slate-700 placeholder-slate-400 outline-none transition-all duration-300 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                  value={password}
                  onChange={(e) =>
                    setPassword(
                      e.target.value
                    )
                  }
                />
              </div>

              {/* Sign In Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-lg shadow-lg shadow-emerald-200 transition-all duration-300 disabled:opacity-70"
              >
                {loading ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>

            {/* Register Link */}
            <p className="text-center text-sm text-slate-500 mt-8">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="font-semibold text-emerald-600 hover:underline"
              >
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}