"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const SkyBluePrescriptionSection = () => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearch = () => {

  if (!searchQuery)
    return;

  router.push(
    `/appointments?search=${searchQuery}`
  );

};

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-[700px] bg-slate-50 animate-pulse rounded-3xl" />
    );
  }

  const steps = [
    {
      number: "01",
      title: "Search Doctors",
      description:
        "Find specialists by name, category, or medical expertise.",
    },
    {
      number: "02",
      title: "Choose Schedule",
      description:
        "Select your preferred date and appointment time.",
    },
    {
      number: "03",
      title: "Confirm Booking",
      description:
        "Submit your information and receive instant confirmation.",
    },
  ];

  const benefits = [
    "Verified and licensed doctors",
    "Secure online booking system",
    "Instant appointment confirmation",
    "24/7 patient support",
  ];

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Box */}
        <div className="max-w-3xl mx-auto mb-20">
          <div className="flex items-center gap-4 bg-slate-50 border border-slate-200 rounded-full px-6 py-4 shadow-sm ">
            <svg
              className="w-5 h-5 text-emerald-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z"
              />
            </svg>

            <input
              type="text"
              value={searchQuery}
              onChange={(e) =>
                setSearchQuery(e.target.value)
              }
              placeholder="Search doctors or specialties..."
              className="w-full bg-transparent outline-none text-slate-700 placeholder-slate-400"
            />
            <button
  onClick={handleSearch}
  className="px-5 py-2 rounded-full bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-all"
>
  Search
</button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Left Side */}
          <div>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 text-emerald-700 text-sm font-semibold border border-emerald-100">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Simple Booking Process
            </span>

            <h2 className="mt-6 text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
              Book Your Appointment
              <span className="block text-emerald-600">
                In 3 Easy Steps
              </span>
            </h2>

            <p className="mt-5 text-slate-600 text-lg leading-relaxed">
              Our platform makes it easy to connect with
              trusted doctors and schedule your consultation
              within minutes.
            </p>

            {/* Steps */}
            <div className="mt-10 space-y-6">
              {steps.map((step) => (
                <div
                  key={step.number}
                  className="flex gap-4"
                >
                  <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white font-bold flex items-center justify-center flex-shrink-0">
                    {step.number}
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">
                      {step.title}
                    </h3>
                    <p className="text-slate-600 mt-1">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side */}
          <div className="space-y-6">
            {/* Benefits Card */}
            <div className="bg-slate-50 rounded-[32px] p-8 border border-slate-100">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">
                Why Patients Choose Us
              </h3>

              <div className="space-y-4">
                {benefits.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3"
                  >
                    <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                      ✓
                    </div>
                    <span className="text-slate-700 font-medium">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Card */}
            <div className="bg-gradient-to-r from-emerald-600 to-cyan-600 rounded-[32px] p-8 text-white shadow-xl">
              <h3 className="text-2xl font-bold mb-3">
                Ready to Book?
              </h3>
              <p className="text-white/90 mb-6">
                Schedule your consultation with a
                specialist today.
              </p>

              <Link href="/appointments">
  <button className="px-10 py-4 rounded-2xl bg-white text-emerald-600 hover:bg-slate-100 font-bold transition-all duration-300 shadow-md">
    Book Consultation
  </button>
</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkyBluePrescriptionSection;