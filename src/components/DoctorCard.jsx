"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const DoctorCard = ({ doctor }) => {
  const router = useRouter();

  const { data: session } =
    authClient.useSession();

  const {
    _id,
    id,
    name,
    specialty,
    image,
    experience,
  } = doctor;

  const doctorId = _id || id;

  const handleDetailsClick = () => {
    const targetUrl = `/appointments/${doctorId}`;

    if (session) {
      router.push(targetUrl);
    } else {
      router.push(
        `/login?redirect=${targetUrl}`
      );
    }
  };

  return (
    <div className="group bg-white rounded-[32px] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500">

      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-[360px] object-cover object-top group-hover:scale-105 transition duration-500"
        />

        <div className="absolute top-5 right-5">
          <span className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-sm font-semibold text-yellow-600 shadow">
            ⭐ 4.9
          </span>
        </div>
      </div>

      <div className="p-6">

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-900 leading-tight">
            {name}
          </h2>

          <p className="text-emerald-600 font-medium mt-2">
            {specialty}
          </p>

          <p className="text-slate-500 text-sm mt-1">
            {experience} Experience
          </p>
        </div>

        <button
          onClick={handleDetailsClick}
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold transition-all duration-300 active:scale-[0.98] cursor-pointer shadow-md"
        >
          View Details
        </button>

      </div>
    </div>
  );
};

export default DoctorCard;