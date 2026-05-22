"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import { authClient }
from "@/lib/auth-client";

export default function LoginPage() {

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [redirectUrl, setRedirectUrl] =
    useState("/home");

  const {
    data: session,
    isPending,
  } = authClient.useSession();

  useEffect(() => {

    if (
      typeof window !== "undefined"
    ) {

      const params =
        new URLSearchParams(
          window.location.search
        );

      setRedirectUrl(
        params.get("redirect") ||
          "/home"
      );
    }
  }, []);

  useEffect(() => {

    if (
      !isPending &&
      session
    ) {

      window.location.href =
        redirectUrl;
    }

  }, [
    session,
    isPending,
    redirectUrl,
  ]);

  const handleLogin =
    async (e) => {

      e.preventDefault();

      setError("");

      setLoading(true);

      try {

        await authClient.signIn.email({

          email,

          password,

          callbackURL:
            redirectUrl,
        });

        // window.location.href =
        //   redirectUrl;

      } catch (err) {

        console.error(
          "Login Error:",
          err
        );

        setError(
          "Invalid email or password."
        );

        setLoading(false);
      }
    };

  const handleGoogleLogin =
    async () => {

      try {

        await authClient.signIn.social({

          provider: "google",

          callbackURL:
            redirectUrl,
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

  // if (session) return null;

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 px-4 py-8 md:py-12 flex items-center justify-center">

      <div className="w-full max-w-6xl bg-white border border-slate-100 rounded-[40px] overflow-hidden shadow-[0_30px_80px_rgba(15,23,42,0.10)] grid lg:grid-cols-2">

        {/* LEFT SIDE */}

        <div className="hidden lg:flex relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-900 text-white p-12 xl:p-16 flex-col justify-between">

          <div className="absolute inset-0 overflow-hidden">

            <div className="absolute top-0 left-0 w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl"></div>

            <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>

          </div>

          <div className="relative z-10">

            <Link
              href="/home"
              className="flex items-center gap-4"
            >

              <div className="w-16 h-16 rounded-3xl bg-white/10 border border-white/10 backdrop-blur-xl flex items-center justify-center">

                <svg
                  className="w-8 h-8 text-emerald-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >

                  <path d="M10 4h4v6h6v4h-6v6h-4v-6H4v-4h6V4z" />

                </svg>

              </div>

              <div>

                <h2 className="text-4xl font-bold tracking-tight">

                  Medi
                  <span className="text-emerald-400">
                    Care
                  </span>

                </h2>

                <p className="text-slate-300 mt-1">

                  Smart Healthcare Platform

                </p>

              </div>

            </Link>

            <div className="mt-20">

              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 text-xs uppercase tracking-[0.2em] font-semibold text-emerald-300">

                Trusted Medical Service

              </span>

              <h1 className="mt-8 text-5xl font-bold leading-tight">

                Your Health,
                <br />

                Simplified
                <span className="text-emerald-400">
                  .
                </span>

              </h1>

              <p className="mt-6 text-lg leading-8 text-slate-300 max-w-lg">

                Book appointments, manage your schedules,
                and connect with experienced doctors from anywhere.

              </p>

            </div>

          </div>

          <div className="relative z-10 grid grid-cols-3 gap-4">

            <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-5">

              <h3 className="text-3xl font-bold">
                50+
              </h3>

              <p className="text-sm text-slate-300 mt-2">
                Expert Doctors
              </p>

            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-5">

              <h3 className="text-3xl font-bold">
                24/7
              </h3>

              <p className="text-sm text-slate-300 mt-2">
                Patient Support
              </p>

            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-5">

              <h3 className="text-3xl font-bold">
                99%
              </h3>

              <p className="text-sm text-slate-300 mt-2">
                Satisfaction
              </p>

            </div>

          </div>

        </div>

        {/* RIGHT SIDE */}

        <div className="p-6 sm:p-10 lg:p-14 flex items-center bg-white">

          <div className="w-full max-w-md mx-auto">

            <div className="mb-8">

              <span className="text-sm font-semibold text-emerald-600 uppercase tracking-widest">

                Welcome Back

              </span>

              <h1 className="mt-3 text-4xl font-bold text-slate-900 tracking-tight">

                Sign In

              </h1>

              <p className="mt-4 text-slate-500 leading-7">

                Login to continue managing your appointments and healthcare profile.

              </p>

            </div>

            {error && (

              <div className="mb-5 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">

                {error}

              </div>
            )}

            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full h-14 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center gap-3 text-slate-700 font-semibold transition-all duration-300"
            >

              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="w-5 h-5"
              />

              Continue with Google

            </button>

            <div className="flex items-center gap-4 my-8">

              <div className="flex-1 h-px bg-slate-200"></div>

              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">

                Or Continue With Email

              </span>

              <div className="flex-1 h-px bg-slate-200"></div>

            </div>

            <form
              onSubmit={handleLogin}
              className="space-y-5"
            >

              <input
                type="email"
                required
                placeholder="Email Address"
                value={email}
                onChange={(e) =>
                  setEmail(
                    e.target.value
                  )
                }
                className="w-full h-14 px-5 rounded-2xl border border-slate-200 text-slate-800 placeholder:text-slate-400"
              />

              <input
                type="password"
                required
                placeholder="Password"
                value={password}
                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }
                className="w-full h-14 px-5 rounded-2xl border border-slate-200 text-slate-800 placeholder:text-slate-400"
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full h-14 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-lg transition-all duration-300"
              >

                {loading
                  ? "Loading..."
                  : "Sign In"}

              </button>

            </form>

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