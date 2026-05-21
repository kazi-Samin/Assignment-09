
"use client";

import React, { useEffect, useState, useRef } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const AnimatedCounter = ({
  endValue,
  duration = 2000,
  suffix = "",
}) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (
          entry.isIntersecting &&
          !hasAnimated.current
        ) {
          hasAnimated.current = true;

          let start = 0;
          const end = parseInt(endValue);

          let totalMilliseconds = duration;
          let incrementTime = Math.max(
            Math.floor(totalMilliseconds / end),
            15
          );

          let timer = setInterval(() => {
            start += Math.ceil(
              end /
                (totalMilliseconds /
                  incrementTime)
            );

            if (start >= end) {
              clearInterval(timer);
              setCount(end);
            } else {
              setCount(start);
            }
          }, incrementTime);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [endValue, duration]);

  return (
    <span ref={elementRef}>
      {count}
      {suffix}
    </span>
  );
};

const DataStatsSection = () => {
  const [mounted, setMounted] =
    useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const chartData = [
    { name: "Jan", percentage: 20 },
    { name: "Feb", percentage: 35 },
    { name: "Mar", percentage: 55 },
    { name: "Apr", percentage: 72 },
    { name: "May", percentage: 96 },
  ];

  if (!mounted) {
    return (
      <div className="w-full h-[500px] bg-white animate-pulse rounded-3xl" />
    );
  }

  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 text-emerald-700 text-sm font-semibold border border-emerald-100">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            Trusted Performance
          </span>

          <h2 className="mt-6 text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
            Healthcare Results
            <span className="block text-emerald-600">
              You Can Trust
            </span>
          </h2>

          <p className="mt-5 text-slate-600 text-base md:text-lg leading-relaxed">
            Our platform connects thousands of
            patients with expert doctors every
            month.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Chart Card */}
          <div className="lg:col-span-2 bg-white rounded-[32px] p-6 md:p-8 border border-slate-100 shadow-sm">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-slate-900">
                Recovery Progress
              </h3>
              <p className="text-sm text-slate-500 mt-1">
                Monthly improvement based on
                patient follow-up data.
              </p>
            </div>

            <div className="w-full h-72">
              <ResponsiveContainer
                width="100%"
                height="100%"
              >
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient
                      id="colorStats"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor="#10b981"
                        stopOpacity={0.35}
                      />
                      <stop
                        offset="95%"
                        stopColor="#10b981"
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>

                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#e2e8f0"
                  />

                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                  />

                  <YAxis
                    axisLine={false}
                    tickLine={false}
                  />

                  <Area
                    type="monotone"
                    dataKey="percentage"
                    stroke="#10b981"
                    strokeWidth={3}
                    fill="url(#colorStats)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
              <h3 className="text-4xl font-bold text-emerald-600">
                <AnimatedCounter
                  endValue="98"
                  suffix="%"
                />
              </h3>
              <p className="text-lg font-semibold text-slate-800 mt-2">
                Satisfaction Rate
              </p>
              <p className="text-sm text-slate-500 mt-1">
                Patients highly rate our doctors
                and services.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
              <h3 className="text-4xl font-bold text-cyan-600">
                <AnimatedCounter
                  endValue="50"
                  suffix="K+"
                />
              </h3>
              <p className="text-lg font-semibold text-slate-800 mt-2">
                Happy Patients
              </p>
              <p className="text-sm text-slate-500 mt-1">
                Trusted by thousands across the
                country.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
              <h3 className="text-4xl font-bold text-indigo-600">
                <AnimatedCounter
                  endValue="250"
                  suffix="+"
                />
              </h3>
              <p className="text-lg font-semibold text-slate-800 mt-2">
                Specialist Doctors
              </p>
              <p className="text-sm text-slate-500 mt-1">
                Certified doctors from multiple
                specialties.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DataStatsSection;