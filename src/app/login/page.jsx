"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

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

        window.location.href =
          redirectUrl;

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
      <div className="min-h-screen flex items-center justify-center">

        Loading...

      </div>
    );
  }

  if (session) return null;

  return (
    <section className="min-h-screen flex items-center justify-center">

      <form
        onSubmit={handleLogin}
        className="w-full max-w-md p-6 space-y-4"
      >

        <h1 className="text-3xl font-bold">
          Login
        </h1>

        {error && (
          <p className="text-red-500">
            {error}
          </p>
        )}

        <input
          type="email"
          required
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
          className="w-full border p-3 rounded-xl"
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
          className="w-full border p-3 rounded-xl"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-emerald-600 text-white p-3 rounded-xl"
        >
          {loading
            ? "Loading..."
            : "Login"}
        </button>

        <button
          type="button"
          onClick={
            handleGoogleLogin
          }
          className="w-full border p-3 rounded-xl"
        >
          Continue with Google
        </button>

        <p>
          No account?{" "}

          <Link
            href="/register"
            className="text-emerald-600"
          >
            Register
          </Link>
        </p>

      </form>
    </section>
  );
}