"use client";

import React, { useEffect, useState } from "react";
import DoctorCard from "./DoctorCard";
import Link from "next/link";

const TopDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const API_BASE_URL =
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

    fetch(`${API_BASE_URL}/doctors`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch doctors");
        return res.json();
      })
      .then((data) => {
        setDoctors(data.slice(0, 3));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching doctors:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 flex justify-center items-center min-h-[300px]">
          <span className="loading loading-spinner loading-lg text-emerald-600"></span>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-24 bg-white overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-10 left-0 w-72 h-72 bg-emerald-100/40 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-100/40 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 text-emerald-700 text-sm font-semibold border border-emerald-100">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            Our Specialists
          </span>

          <h2 className="mt-6 text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
            Meet Our Trusted
            <span className="block text-emerald-600">
              Medical Experts
            </span>
          </h2>

          <p className="mt-5 text-slate-600 text-base md:text-lg leading-relaxed">
            Connect with highly qualified doctors from various specialties and
            book your appointment with confidence.
          </p>
        </div>

        {/* Doctor Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {doctors.map((doctor) => (
            <DoctorCard
              key={doctor._id || doctor.id}
              doctor={doctor}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-14">
          <Link href="/appointments">
  <button className="px-10 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold shadow-lg shadow-emerald-200 transition-all duration-300">
    View All Doctors
  </button>
</Link>
        </div>
      </div>
    </section>
  );
};

export default TopDoctors;