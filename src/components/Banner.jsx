"use client";
import React from "react";
import Link from "next/link";

const Banner = () => {
  return (
    <main>
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-cyan-50 min-h-screen flex items-center">
        {/* Background Blur */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-emerald-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-200/30 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-24 w-full relative z-10">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            {/* Left Content */}
            <div>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-white border border-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold shadow-sm mb-6">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                Trusted by 15,000+ Patients
              </div>

              {/* Heading */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
                Find the Right
                <span className="block text-emerald-600 mt-2">
                  Doctor for You
                </span>
              </h1>

              {/* Description */}
              <p className="mt-6 text-lg text-slate-600 leading-relaxed max-w-xl">
                Book appointments with experienced doctors, compare available
                schedules, and receive quality healthcare from the comfort of
                your home.
              </p>

              {/* Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link href="/appointments">
  <button className="px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold shadow-lg shadow-emerald-200 transition-all duration-300">
    Book Appointment →
  </button>
</Link>
<Link href="/appointments">
  <button className="px-8 py-4 rounded-2xl border border-slate-300 hover:border-emerald-500 hover:text-emerald-600 text-slate-700 font-semibold transition-all duration-300 bg-white">
    Explore Doctors
  </button>
</Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mt-10">
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 text-center">
                  <h3 className="text-2xl font-bold text-emerald-600">250+</h3>
                  <p className="text-sm text-slate-500">Doctors</p>
                </div>

                <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 text-center">
                  <h3 className="text-2xl font-bold text-emerald-600">15K+</h3>
                  <p className="text-sm text-slate-500">Patients</p>
                </div>

                <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 text-center">
                  <h3 className="text-2xl font-bold text-emerald-600">24/7</h3>
                  <p className="text-sm text-slate-500">Support</p>
                </div>
              </div>
            </div>

            {/* Right Content */}
            <div className="flex items-center justify-center gap-4 relative mt-12 lg:mt-0">
              {/* Large Card */}
             <div className="w-44 h-64 sm:w-56 sm:h-80 lg:w-64 lg:h-96 rounded-[2rem] overflow-hidden shadow-2xl bg-white p-2">
                <img
                  src="doctor1.jpg"
                  alt="Doctor"
                  className="w-full h-full object-cover rounded-[1.5rem]"
                />
              </div>

              {/* Small Card */}
              <div className="w-32 h-52 sm:w-40 sm:h-64 lg:w-48 lg:h-72 rounded-[2rem] overflow-hidden shadow-xl bg-white p-2 mt-16">
                <img
                  src="doctor.jpg"
                  alt="Medical Specialist"
                  className="w-full h-full object-cover rounded-[1.5rem]"
                />
              </div>

              {/* Floating Card Top */}
              <div className="absolute -top-4 left-8 bg-white px-4 py-3 rounded-2xl shadow-lg border border-slate-100">
                <p className="text-xs text-slate-500">Patient Satisfaction</p>
                <h4 className="text-lg font-bold text-emerald-600">98%</h4>
              </div>

              {/* Floating Card Bottom */}
              <div className="absolute bottom-6 right-0 bg-white px-4 py-3 rounded-2xl shadow-lg border border-slate-100">
                <p className="text-xs text-slate-500">Instant Booking</p>
                <h4 className="text-lg font-bold text-emerald-600">Available</h4>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Banner;