"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function DashboardLayout({
  children,
}) {
  const pathname = usePathname();

  const { data: session, isPending } =
    authClient.useSession();

  const user = session?.user;

  const getInitial = (name) =>
    name
      ? name.charAt(0).toUpperCase()
      : "U";

  const navItems = [
    {
      title: "Overview",
      href: "/dashboard",
      icon: "🏠",
    },
    {
      title: "My Bookings",
      href:
        "/dashboard/my-appointments",
      icon: "📅",
    },
    {
      title: "My Profile",
      href: "/dashboard/my-profile",
      icon: "👤",
    },
  ];

  return (
    <ProtectedRoute>

    
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="hidden lg:flex w-72 bg-white border-r border-slate-200 flex-col">
        {/* Logo */}
        <div className="px-6 py-8 border-b border-slate-100">
          <Link
            href="/home"
            className="flex items-center gap-3"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-200">
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M10 4h4v6h6v4h-6v6h-4v-6H4v-4h6V4z" />
              </svg>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                Medi
                <span className="text-emerald-600">
                  Care
                </span>
              </h2>
              <p className="text-xs text-slate-500">
                Dashboard Panel
              </p>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2 flex-1">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-medium transition-all ${
                  isActive
                    ? "bg-emerald-600 text-white shadow-lg shadow-emerald-200"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                <span className="text-lg">
                  {item.icon}
                </span>
                {item.title}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Button */}
        <div className="p-4 border-t border-slate-100">
          <Link
            href="/home"
            className="w-full flex items-center justify-center py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold transition"
          >
            ← Back to Home
          </Link>
        </div>
      </aside>

      {/* Main Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-20 bg-white border-b border-slate-200 px-6 lg:px-10 flex items-center justify-between">
          {/* Mobile Logo */}
          <Link
            href="/home"
            className="lg:hidden flex items-center gap-2"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
              +
            </div>
            <span className="font-bold text-slate-900">
              MediCare
            </span>
          </Link>

          {/* Header Text */}
          <div className="hidden md:block">
            <h1 className="text-xl font-bold text-slate-900">
              Patient Dashboard
            </h1>
            <p className="text-sm text-slate-500">
              Manage appointments and
              profile
            </p>
          </div>

          {/* User Area */}
          <div className="flex items-center gap-4">
            {!user && !isPending && (
              <Link
                href="/login"
                className="hidden sm:inline-flex px-5 py-2.5 rounded-full border border-slate-200 text-slate-600 font-medium hover:border-emerald-500 hover:text-emerald-600 transition"
              >
                Sign In
              </Link>
            )}

            {user && (
              <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-full pl-2 pr-4 py-2 shadow-sm">
                <div className="w-11 h-11 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center overflow-hidden">
                  {user.image ? (
                    <img
                      src={user.image}
                      alt={user.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span>
                      {getInitial(
                        user.name
                      )}
                    </span>
                  )}
                </div>

                <div className="hidden md:block">
                  <p className="text-sm font-semibold text-slate-800">
                    {user.name}
                  </p>
                  <p className="text-xs text-slate-500">
                    Patient Account
                  </p>
                </div>
              </div>
            )}

            {isPending && (
              <span className="loading loading-spinner loading-sm text-emerald-600"></span>
            )}
          </div>
        </header>

        {/* Mobile Navigation */}
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-3 flex gap-2 overflow-x-auto">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-semibold ${
                  isActive
                    ? "bg-emerald-600 text-white"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                {item.icon} {item.title}
              </Link>
            );
          })}
        </div>

        {/* Page Content */}
        <main className="flex-1 p-6 lg:p-10">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
    
    
</ProtectedRoute>
  );
}