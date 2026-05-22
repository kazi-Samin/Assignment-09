"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

export default function DashboardPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const {
    data: session,
    isPending: sessionLoading,
  } = authClient.useSession();

  const user = session?.user;
  const userEmail = user?.email;

  // Fetch real bookings from backend
  useEffect(() => {
    if (!userEmail) {
      setLoading(false);
      return;
    }

    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/bookings?email=${userEmail}`,
      {
        credentials: "include",
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch bookings");
        }
        return res.json();
      })
      .then((data) => {
        setBookings(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Dashboard fetch error:", error);
        setLoading(false);
      });
  }, [userEmail]);

  // Loading state
  if (
    sessionLoading ||
    (userEmail && loading)
  ) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-emerald-600"></span>
      </div>
    );
  }

  // Not logged in
  if (!userEmail) {
    return (
      <div className="bg-white border border-slate-200 rounded-3xl p-10 text-center shadow-sm">
        <div className="text-5xl mb-4">🔐</div>

        <h2 className="text-3xl font-bold text-slate-900 mb-3">
          Login Required
        </h2>

        <p className="text-slate-500 max-w-md mx-auto mb-8 leading-relaxed">
          Please sign in to access your dashboard,
          view bookings, and manage your profile.
        </p>

        <Link
          href="/login"
          className="inline-flex items-center px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-lg shadow-emerald-200 transition"
        >
          Go to Login
        </Link>
      </div>
    );
  }

  // Real stats from backend
  const totalBookings = bookings.length;

  const pendingBookings =
    bookings.filter(
      (booking) =>
        !booking.status ||
        booking.status
          ?.toLowerCase()
          .includes("pending")
    ).length;

  const completedBookings =
    bookings.filter((booking) =>
      ["approved", "completed", "confirmed"].includes(
        booking.status?.toLowerCase()
      )
    ).length;

  const stats = [
    {
      title: "Total Bookings",
      value: totalBookings,
      icon: "📅",
      color:
        "from-blue-500 to-cyan-500",
    },
    {
      title: "Pending",
      value: pendingBookings,
      icon: "⏳",
      color:
        "from-amber-500 to-orange-500",
    },
    {
      title: "Completed",
      value: completedBookings,
      icon: "✅",
      color:
        "from-emerald-500 to-teal-500",
    },
  ];

  const actions = [
    {
      title: "Book Appointment",
      href: "/appointments",
      icon: "➕",
    },
    {
      title: "My Bookings",
      href:
        "/dashboard/my-appointments",
      icon: "📅",
    },
    {
      title: "Edit Profile",
      href: "/dashboard/my-profile",
      icon: "👤",
    },
  ];

  return (
  <div className="w-full max-w-full overflow-x-hidden space-y-6 md:space-y-8">

    {/* Hero Section */}
    <section className="rounded-[24px] md:rounded-[32px] bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-900 p-5 sm:p-6 md:p-10 text-white overflow-hidden">

      <span className="inline-block px-3 py-2 md:px-4 rounded-full bg-white/10 border border-white/10 text-[10px] md:text-xs font-semibold uppercase tracking-widest mb-4 md:mb-5">
        Dashboard Overview
      </span>

      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight break-words">
        Welcome Back,
        <span className="block text-emerald-300 mt-2 break-words">
          {user?.name || "Patient"}
        </span>
      </h1>

      <p className="mt-4 text-sm md:text-base text-slate-300 max-w-2xl leading-7">
        Track your appointments, manage your
        profile, and stay connected with your
        healthcare journey.
      </p>
    </section>

    {/* Stats */}
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">

      {stats.map((stat) => (

        <div
          key={stat.title}
          className="bg-white border border-slate-200 rounded-3xl p-5 md:p-6 shadow-sm w-full"
        >

          <div
            className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-r ${stat.color} flex items-center justify-center text-xl md:text-2xl text-white mb-4 md:mb-5`}
          >
            {stat.icon}
          </div>

          <p className="text-sm text-slate-500">
            {stat.title}
          </p>

          <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2">
            {stat.value}
          </h3>

        </div>
      ))}
    </section>

    {/* Quick Actions */}
    <section className="bg-white border border-slate-200 rounded-3xl p-5 md:p-6 shadow-sm overflow-hidden">

      <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-5 md:mb-6">
        Quick Actions
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        {actions.map((action) => (

          <Link
            key={action.title}
            href={action.href}
            className="flex items-center justify-between p-4 md:p-5 rounded-2xl bg-slate-50 hover:bg-slate-100 transition w-full"
          >

            <div className="flex items-center gap-3 min-w-0">

              <span className="text-lg md:text-xl">
                {action.icon}
              </span>

              <span className="font-medium text-slate-700 truncate">
                {action.title}
              </span>

            </div>

            <span className="shrink-0">
              →
            </span>

          </Link>
        ))}
      </div>
    </section>

  </div>
);
}