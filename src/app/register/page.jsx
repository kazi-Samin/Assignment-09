"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import { authClient }
from "@/lib/auth-client";

export default function RegisterPage() {

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [photoUrl, setPhotoUrl] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const {
    data: session,
    isPending,
  } = authClient.useSession();

  const hasUppercase =
    /[A-Z]/.test(password);

  const hasLowercase =
    /[a-z]/.test(password);

  const isLongEnough =
    password.length >= 6;

  useEffect(() => {

    if (
      !isPending &&
      session
    ) {

      window.location.href =
        "/home";
    }

  }, [
    session,
    isPending,
  ]);

  const handleRegister =
    async (e) => {

      e.preventDefault();

      setError("");

      if (
        !hasUppercase ||
        !hasLowercase ||
        !isLongEnough
      ) {

        setError(
          "Password must contain uppercase, lowercase and minimum 6 characters."
        );

        return;
      }

      setLoading(true);

      try {

        await authClient.signUp.email({

          name,

          email,

          password,

          image:
            photoUrl ||
            undefined,

          callbackURL:
            "/home",
        });

        // window.location.href =
        //   "/home";

      } catch (err) {

        console.error(
          "Register Error:",
          err
        );

        setError(
          "Registration failed."
        );

        setLoading(false);
      }
    };

  const handleGoogleSignup =
    async () => {

      try {

        await authClient.signIn.social({

          provider: "google",

          callbackURL:
            "/home",
        });

      } catch (err) {

        console.error(
          "Google signup failed:",
          err
        );
      }
    };

  if (isPending) {

    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">

        <span className="loading loading-spinner loading-lg text-emerald-600"></span>

      </div>
    );
  }

  if (session) return null;

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 px-4 py-8 md:py-12 flex items-center justify-center">

      <div className="w-full max-w-2xl">

        <div className="bg-white rounded-[36px] border border-slate-200 shadow-[0_25px_80px_rgba(15,23,42,0.08)] p-6 sm:p-10 lg:p-12">

          <div className="flex flex-col items-center text-center mb-8">

            <Link
              href="/home"
              className="flex items-center gap-3 mb-6"
            >

              <div className="w-14 h-14 rounded-3xl bg-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-200">

                <svg
                  className="w-7 h-7 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >

                  <path d="M10 4h4v6h6v4h-6v6h-4v-6H4v-4h6V4z" />

                </svg>

              </div>

              <div className="text-left">

                <h2 className="text-3xl font-bold text-slate-900 leading-none">
                  Medi
                  <span className="text-emerald-600">
                    Care
                  </span>
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  Smart Healthcare Platform
                </p>

              </div>

            </Link>

            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-600 mb-5">

              Patient Registration

            </span>

            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 leading-tight tracking-tight">

              Create Your Account

            </h1>

            <p className="mt-4 text-slate-500 text-base leading-8 max-w-xl">

              Register to book appointments,
              manage your healthcare profile,
              and connect with trusted doctors.

            </p>

          </div>

          {error && (

            <div className="mb-6 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">

              {error}

            </div>
          )}

          <button
            type="button"
            onClick={handleGoogleSignup}
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
            onSubmit={handleRegister}
            className="space-y-5"
          >

            <input
              type="text"
              required
              placeholder="Full Name"
              value={name}
              onChange={(e) =>
                setName(
                  e.target.value
                )
              }
              className="w-full h-14 px-5 rounded-2xl border border-slate-200 text-slate-800 placeholder:text-slate-400"
            />

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
              type="url"
              placeholder="Photo URL"
              value={photoUrl}
              onChange={(e) =>
                setPhotoUrl(
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
                : "Create Account"}

            </button>

          </form>

          <p className="text-center text-sm text-slate-500 mt-8">

            Already have an account?{" "}

            <Link
              href="/login"
              className="font-semibold text-emerald-600 hover:underline"
            >

              Sign In

            </Link>

          </p>

        </div>

      </div>

    </section>
  );
}