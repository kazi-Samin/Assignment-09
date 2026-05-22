"use client";

import { useEffect, useState }
from "react";

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
          "Password must contain uppercase, lowercase and 6 characters."
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

        window.location.href =
          "/home";

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
      <div className="min-h-screen flex items-center justify-center">

        Loading...

      </div>
    );
  }

  if (session) return null;

  return (
    <section className="min-h-screen flex items-center justify-center">

      <form
        onSubmit={
          handleRegister
        }
        className="w-full max-w-md p-6 space-y-4"
      >

        <h1 className="text-3xl font-bold">
          Register
        </h1>

        {error && (
          <p className="text-red-500">
            {error}
          </p>
        )}

        <input
          type="text"
          required
          placeholder="Name"
          value={name}
          onChange={(e) =>
            setName(
              e.target.value
            )
          }
          className="w-full border p-3 rounded-xl"
        />

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
          type="url"
          placeholder="Photo URL"
          value={photoUrl}
          onChange={(e) =>
            setPhotoUrl(
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
            : "Register"}
        </button>

        <button
          type="button"
          onClick={
            handleGoogleSignup
          }
          className="w-full border p-3 rounded-xl"
        >
          Continue with Google
        </button>

        <p>
          Already have account?{" "}

          <Link
            href="/login"
            className="text-emerald-600"
          >
            Login
          </Link>
        </p>

      </form>
    </section>
  );
}