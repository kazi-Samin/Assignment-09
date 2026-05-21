"use client";

import React, { useEffect, useState } from "react";
import DoctorCard from "@/components/DoctorCard";
import { useSearchParams } from "next/navigation";


const AllAppointments = () => {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

 
  const [priceFilter, setPriceFilter] = useState("all");

  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  

const searchParams =
  useSearchParams();

const search =
  searchParams.get("search") || "";
  const [searchText, setSearchText] =
  useState(search);

  useEffect(() => {
    fetch(`${API_URL}/doctors`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch doctors");
        }
        return res.json();
      })
      .then((data) => {
        setDoctors(data);
        setFilteredDoctors(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching doctors:", err);
        setLoading(false);
      });
  }, [API_URL]);

  useEffect(() => {
    let result = [...doctors];

    // Search by doctor name
    if (searchText.trim()) {
      result = result.filter((doctor) =>
        doctor.name
          ?.toLowerCase()
          .includes(searchText.toLowerCase())
      );
    }

    // Fee filter
    if (priceFilter === "budget") {
      result = result.filter(
        (doctor) => Number(doctor.fee) <= 800
      );
    } else if (priceFilter === "standard") {
      result = result.filter(
        (doctor) =>
          Number(doctor.fee) > 800 &&
          Number(doctor.fee) <= 1500
      );
    } else if (priceFilter === "premium") {
      result = result.filter(
        (doctor) => Number(doctor.fee) > 1500
      );
    }

    setFilteredDoctors(result);
  }, [searchText, priceFilter, doctors]);

  if (loading) {
    return (
      <section className="min-h-screen bg-slate-50 flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-emerald-600"></span>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-slate-50 py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 text-emerald-700 text-sm font-semibold border border-emerald-100">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            Appointment Directory
          </span>

          <h1 className="mt-6 text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
            Explore Our
            <span className="block text-emerald-600">
              Medical Specialists
            </span>
          </h1>

          <p className="mt-4 text-slate-600 text-base md:text-lg leading-relaxed">
            Search doctors, compare consultation fees,
            and choose the right specialist for your needs.
          </p>
        </div>

        {/* Search & Filter Box */}
        <div className="bg-white border border-slate-100 rounded-[32px] shadow-sm p-5 md:p-6 mb-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Search */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3">
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
                  placeholder="Search by doctor name..."
                  className="w-full bg-transparent outline-none text-slate-700 placeholder-slate-400"
                  value={searchText}
                  onChange={(e) =>
                    setSearchText(e.target.value)
                  }
                />
              </div>
            </div>

            {/* Filter */}
            <div>
              <select
                value={priceFilter}
                onChange={(e) =>
                  setPriceFilter(e.target.value)
                }
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-slate-700 outline-none"
              >
                <option value="all">
                  All Price Ranges
                </option>
                <option value="budget">
                  Budget Friendly
                </option>
                <option value="standard">
                  Standard Care
                </option>
                <option value="premium">
                  Premium Specialists
                </option>
              </select>
            </div>
          </div>
        </div>

        {/* Result Info */}
        <div className="flex items-center justify-between mb-8">
          <p className="text-sm text-slate-500">
            Showing{" "}
            <span className="font-bold text-emerald-600">
              {filteredDoctors.length}
            </span>{" "}
            specialists
          </p>

          {(searchText || priceFilter !== "all") && (
            <button
              onClick={() => {
                setSearchText("");
                setPriceFilter("all");
              }}
              className="text-sm font-medium text-emerald-600 hover:text-emerald-700"
            >
              Clear Filters
            </button>
          )}
        </div>

        {/* Doctors Grid */}
        {filteredDoctors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDoctors.map((doctor) => (
              <DoctorCard
                key={doctor._id || doctor.id}
                doctor={doctor}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white border border-slate-100 rounded-[32px] py-20 px-6 text-center shadow-sm">
            <div className="w-16 h-16 mx-auto rounded-full bg-slate-100 flex items-center justify-center text-3xl mb-5">
              🔍
            </div>

            <h3 className="text-2xl font-bold text-slate-900 mb-2">
              No Doctors Found
            </h3>

            <p className="text-slate-500 max-w-md mx-auto">
              No doctors matched your current search
              criteria.
            </p>

            <button
              onClick={() => {
                setSearchText("");
                setPriceFilter("all");
              }}
              className="mt-6 px-6 py-3 rounded-full bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition"
            >
              View All Doctors
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default AllAppointments;