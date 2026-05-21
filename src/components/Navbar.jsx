

"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  const {
    data: session,
    isPending,
  } = authClient.useSession();

  const user = session?.user;

  const handleLogout = async () => {
    try {
      await authClient.signOut();
      router.refresh();
      window.location.href = "/home";
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const navItems = [
  {
    label: "Home",
    href: "/home",
    active: pathname === "/home",
  },
  {
    label: "Appointments",
    href: "/appointments",
    active: pathname === "/appointments",
  },
  {
    label: "Dashboard",
    href: "/dashboard",
    active: pathname.startsWith("/dashboard"),
  },
];
  // if (user) {
  //   navItems.push({
  //     label: "Dashboard",
  //     href: "/dashboard",
  //     active: pathname.startsWith("/dashboard"),
  //   });
  // }

  return (
    <nav className="w-full border-b border-emerald-100/70 bg-white/95 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link
            href="/home"
            className="flex items-center gap-3 select-none"
          >
            <div className="relative">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-200">
                <svg
                  className="w-6 h-6 text-white"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M10 4h4v6h6v4h-6v6h-4v-6H4v-4h6V4z" />
                </svg>
              </div>
              <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-300 border-2 border-white"></span>
            </div>

            <div className="leading-tight">
              <h1 className="text-xl font-bold text-slate-900">
                Medi<span className="text-emerald-600">Care</span>
              </h1>
              <p className="text-[11px] text-slate-500 font-medium">
                Smart Healthcare
              </p>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-2 bg-slate-50 border border-slate-100 rounded-full px-2 py-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  item.active
                    ? "bg-white text-emerald-600 shadow-sm"
                    : "text-slate-600 hover:text-emerald-600"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Desktop Right Side */}
          <div className="hidden md:flex items-center gap-3">
            {isPending ? (
              <span className="loading loading-spinner loading-sm text-emerald-600"></span>
            ) : user ? (
              <>
                <div className="flex items-center gap-3 bg-slate-50 border border-slate-100 rounded-full pl-2 pr-4 py-1.5">
                  {user.image ? (
                    <img
                      src={user.image}
                      alt="profile"
                      className="w-10 h-10 rounded-full object-cover border-2 border-emerald-500"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 border-2 border-emerald-500 flex items-center justify-center font-bold uppercase text-sm">
                      {user.name?.[0] || "U"}
                    </div>
                  )}

                  <div className="max-w-[130px]">
                    <p className="text-xs text-slate-500">
                      Welcome back
                    </p>
                    <p className="text-sm font-semibold text-slate-800 truncate">
                      {user.name || "User"}
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleLogout}
                  className="px-5 py-2.5 rounded-full border border-rose-200 text-rose-500 hover:bg-rose-50 font-medium text-sm transition-all cursor-pointer"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-5 py-2.5 rounded-full text-sm font-medium text-slate-600 border border-slate-300 hover:border-emerald-500 hover:text-emerald-600 transition-all"
                >
                  Sign In
                </Link>

                <Link
                  href="/register"
                  className="px-6 py-2.5 rounded-full text-sm font-semibold bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg shadow-emerald-200 transition-all"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden w-10 h-10 rounded-xl border border-slate-200 bg-white flex items-center justify-center text-slate-600"
          >
            {menuOpen ? (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 7h16M4 12h16M4 17h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden pb-5">
            <div className="bg-white border border-slate-100 rounded-3xl shadow-xl p-5 space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={`block px-4 py-3 rounded-2xl text-sm font-medium transition-all ${
                    item.active
                      ? "bg-emerald-50 text-emerald-600"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {item.label}
                </Link>
              ))}

              <div className="border-t border-slate-100 pt-4">
                {isPending ? (
                  <div className="flex justify-center py-2">
                    <span className="loading loading-spinner loading-sm text-emerald-600"></span>
                  </div>
                ) : user ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 px-2">
                      {user.image ? (
                        <img
                          src={user.image}
                          alt="profile"
                          className="w-10 h-10 rounded-full object-cover border-2 border-emerald-500"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 border-2 border-emerald-500 flex items-center justify-center font-bold uppercase text-sm">
                          {user.name?.[0] || "U"}
                        </div>
                      )}

                      <div>
                        <p className="text-xs text-slate-500">
                          Signed in as
                        </p>
                        <p className="text-sm font-semibold text-slate-800">
                          {user.name || "User"}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        handleLogout();
                        setMenuOpen(false);
                      }}
                      className="w-full px-5 py-3 rounded-2xl border border-rose-200 text-rose-500 hover:bg-rose-50 font-medium text-sm transition-all"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    <Link
                      href="/login"
                      onClick={() => setMenuOpen(false)}
                      className="text-center px-4 py-3 rounded-2xl border border-slate-300 text-slate-600 font-medium text-sm"
                    >
                      Login
                    </Link>

                    <Link
                      href="/register"
                      onClick={() => setMenuOpen(false)}
                      className="text-center px-4 py-3 rounded-2xl bg-emerald-600 text-white font-medium text-sm"
                    >
                      Register
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}


