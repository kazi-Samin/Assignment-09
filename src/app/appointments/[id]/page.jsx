
"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const DoctorDetails = () => {
  const { id } = useParams();
  const router = useRouter();

  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] =
    useState(false);

  const [patientName, setPatientName] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [appointmentDate, setAppointmentDate] =
    useState("");

  const [timeSlot, setTimeSlot] =
    useState("05:00 PM");

  const [problem, setProblem] =
    useState("");

  const [gender, setGender] =
    useState("Male");

  const [alertMessage, setAlertMessage] =
    useState({
      type: "",
      text: "",
    });

  const { data: session } =
    authClient.useSession();

  const userEmail =
    session?.user?.email;

  const API_URL =
    process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    if (!id) return;

    fetch(`${API_URL}/doctors/${id}`)
      .then((res) => {
        if (!res.ok)
          throw new Error(
            "Doctor not found"
          );

        return res.json();
      })
      .then((data) => {
        setDoctor(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(
          "Error fetching doctor:",
          err
        );

        setLoading(false);
      });
  }, [id, API_URL]);

  const handleBookingSubmit = async (
    e
  ) => {
    e.preventDefault();

    if (!userEmail) {
      setAlertMessage({
        type: "error",
        text: "Please login first!",
      });

      return;
    }

    setBookingLoading(true);

    const bookingData = {
      userEmail,
      doctorName: doctor.name,
      doctorId:
        doctor._id || doctor.id,
      specialty: doctor.specialty,
      fee: doctor.fee,
      patientName,
      gender,
      phone,
      appointmentDate,
      appointmentTime: timeSlot,
      timeSlot,
      problem,
      status: "Approve",
    };

    try {
      const res = await fetch(
        `${API_URL}/bookings`,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(
            bookingData
          ),
        }
      );

      if (res.ok) {
        setAlertMessage({
          type: "success",
          text: "Appointment booked successfully!",
        });

        setPatientName("");
        setPhone("");
        setAppointmentDate("");
        setProblem("");

        setTimeout(() => {
          document
            .getElementById(
              "booking_modal"
            )
            .close();

          router.push(
            "/dashboard/my-appointments"
          );
        }, 1800);
      } else {
        setAlertMessage({
          type: "error",
          text: "Booking failed!",
        });
      }
    } catch (error) {
      console.error(error);

      setAlertMessage({
        type: "error",
        text: "Server error!",
      });
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-slate-50">
        <span className="loading loading-spinner loading-lg text-emerald-600"></span>
      </section>
    );
  }

  if (!doctor) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
        <div className="bg-white rounded-[32px] p-10 border border-slate-100 shadow-sm text-center max-w-md w-full">

          <div className="text-5xl mb-5">
            🩺
          </div>

          <h2 className="text-3xl font-bold text-slate-900 mb-3">
            Doctor Not Found
          </h2>

          <p className="text-slate-500 mb-8">
            We couldn't find the
            requested doctor profile.
          </p>

          <button
            onClick={() =>
              router.push(
                "/appointments"
              )
            }
            className="px-7 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold transition"
          >
            Back to Doctors
          </button>

        </div>
      </section>
    );
  }

  return (
    <main className="bg-slate-50 min-h-screen py-12 md:py-16 px-4">

      <div className="max-w-6xl mx-auto">

        {alertMessage.text && (
          <div className="toast toast-top toast-center z-50">

            <div
              className={`alert ${
                alertMessage.type ===
                "success"
                  ? "alert-success text-white"
                  : "alert-error text-white"
              } rounded-2xl shadow-lg`}
            >
              <span>
                {alertMessage.text}
              </span>

            </div>
          </div>
        )}

        <div className="bg-white rounded-[36px] overflow-hidden border border-slate-100 shadow-sm">

          <div className="grid lg:grid-cols-2">

            <div className="relative min-h-[450px] bg-slate-100">

              <img
                src={
                  doctor.image ||
                  "https://via.placeholder.com/600"
                }
                alt={doctor.name}
                className="w-full h-full object-cover object-top"
              />

              <div className="absolute top-6 left-6">

                <span className="px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm text-emerald-700 text-sm font-semibold shadow">
                  {doctor.specialty}
                </span>

              </div>
            </div>

            <div className="p-8 md:p-10 flex flex-col justify-between">

              <div>

                <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
                  {doctor.name}
                </h1>

                <p className="mt-4 text-slate-500 text-lg">
                  📍{" "}
                  {doctor.hospital ||
                    doctor.location}
                </p>

                <div className="grid grid-cols-2 gap-4 mt-10">

                  <div className="bg-slate-50 rounded-2xl p-5">

                    <p className="text-xs text-slate-500 mb-2">
                      Experience
                    </p>

                    <p className="font-semibold text-slate-900">
                      {
                        doctor.experience
                      }
                    </p>

                  </div>

                  <div className="bg-slate-50 rounded-2xl p-5">

                    <p className="text-xs text-slate-500 mb-2">
                      Rating
                    </p>

                    <p className="font-semibold text-slate-900">
                      ⭐{" "}
                      {doctor.rating ||
                        "4.9"}
                    </p>

                  </div>

                  <div className="bg-slate-50 rounded-2xl p-5">

                    <p className="text-xs text-slate-500 mb-2">
                      Consultation Fee
                    </p>

                    <p className="text-2xl font-bold text-emerald-600">
                      $
                      {doctor.fee}
                    </p>

                  </div>

                  <div className="bg-slate-50 rounded-2xl p-5">

                    <p className="text-xs text-slate-500 mb-2">
                      Availability
                    </p>

                    <p className="font-semibold text-emerald-600">
                      Available
                    </p>

                  </div>

                </div>

                <div className="mt-10">

                  <h3 className="text-xl font-bold text-slate-900 mb-4">
                    About Doctor
                  </h3>

                  <p className="text-slate-600 leading-relaxed">
                    {doctor.description}
                  </p>

                </div>

              </div>

              <button
                onClick={() =>
                  document
                    .getElementById(
                      "booking_modal"
                    )
                    .showModal()
                }
                className="mt-10 w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold text-lg shadow-lg shadow-emerald-200 transition-all"
              >
                Schedule Appointment
              </button>

            </div>
          </div>
        </div>

        <dialog
          id="booking_modal"
          className="modal modal-bottom sm:modal-middle"
        >

          <div className="modal-box bg-white max-w-2xl rounded-[36px] p-6 md:p-8 border border-slate-100 shadow-2xl">

            <div className="mb-8">

              <h3 className="text-3xl font-bold text-slate-900">
                Schedule Appointment
              </h3>

              <p className="text-slate-500 mt-2">
                Complete the form
                below to confirm
                your consultation
                with{" "}

                <span className="font-semibold text-emerald-600">
                  {doctor.name}
                </span>

              </p>

            </div>

            <form
              onSubmit={
                handleBookingSubmit
              }
              className="space-y-5"
            >

              <div>

                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Patient Name
                </label>

                <input
                  type="text"
                  required
                  placeholder="Enter full patient name"
                  className="input input-bordered w-full h-14 rounded-2xl bg-slate-50 border-slate-200 focus:border-emerald-500 focus:outline-none text-slate-800"
                  value={patientName}
                  onChange={(e) =>
                    setPatientName(
                      e.target.value
                    )
                  }
                />

              </div>

              <div className="grid md:grid-cols-2 gap-4">

                <div>

                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Phone Number
                  </label>

                  <input
                    type="tel"
                    required
                    placeholder="Enter phone number"
                    className="input input-bordered w-full h-14 rounded-2xl bg-slate-50 border-slate-200 focus:border-emerald-500 focus:outline-none text-slate-800"
                    value={phone}
                    onChange={(e) =>
                      setPhone(
                        e.target.value
                      )
                    }
                  />

                </div>

                <div>

                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Gender
                  </label>

                  <select
                    className="select select-bordered w-full h-14 rounded-2xl bg-slate-50 border-slate-200 focus:border-emerald-500 focus:outline-none text-slate-800"
                    value={gender}
                    onChange={(e) =>
                      setGender(
                        e.target.value
                      )
                    }
                  >
                    <option>
                      Male
                    </option>

                    <option>
                      Female
                    </option>

                  </select>

                </div>

              </div>

              <div className="grid md:grid-cols-2 gap-4">

                <div>

                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Appointment Date
                  </label>

                  <input
                    type="date"
                    required
                    className="input input-bordered w-full h-14 rounded-2xl bg-slate-50 border-slate-200 focus:border-emerald-500 focus:outline-none text-slate-800"
                    value={
                      appointmentDate
                    }
                    onChange={(e) =>
                      setAppointmentDate(
                        e.target.value
                      )
                    }
                  />

                </div>

                <div>

                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Time Slot
                  </label>

                  <select
                    className="select select-bordered w-full h-14 rounded-2xl bg-slate-50 border-slate-200 focus:border-emerald-500 focus:outline-none text-slate-800"
                    value={timeSlot}
                    onChange={(e) =>
                      setTimeSlot(
                        e.target.value
                      )
                    }
                  >
                    <option>
                      05:00 PM
                    </option>

                    <option>
                      06:00 PM
                    </option>

                    <option>
                      07:00 PM
                    </option>

                    <option>
                      08:00 PM
                    </option>

                  </select>

                </div>

              </div>

              <div>

                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Symptoms /
                  Health Concerns
                </label>

                <textarea
                  rows="4"
                  placeholder="Briefly describe your symptoms or health concerns..."
                  className="textarea textarea-bordered w-full rounded-2xl bg-slate-50 border-slate-200 focus:border-emerald-500 focus:outline-none text-slate-800"
                  value={problem}
                  onChange={(e) =>
                    setProblem(
                      e.target.value
                    )
                  }
                ></textarea>

              </div>

              <div className="modal-action flex justify-end gap-3 pt-5">

                <button
                  type="button"
                  onClick={() =>
                    document
                      .getElementById(
                        "booking_modal"
                      )
                      .close()
                  }
                  className="px-6 py-3 rounded-2xl border border-slate-200 text-slate-600 font-medium hover:bg-slate-50 transition"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={
                    bookingLoading
                  }
                  className="px-7 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold shadow-lg shadow-emerald-200 transition-all"
                >
                  {bookingLoading ? (
                    <span className="loading loading-spinner loading-sm"></span>
                  ) : (
                    "Confirm Appointment"
                  )}

                </button>

              </div>

            </form>

          </div>
        </dialog>

      </div>
    </main>
  );
};

export default DoctorDetails;