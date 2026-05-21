"use client";

import React, {
  useEffect,
  useState,
} from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";


const MyAppointments = () => {
  const [bookings, setBookings] =
    useState([]);
  const [loading, setLoading] =
    useState(true);
  const [actionLoading, setActionLoading] =
    useState(false);

  const [toast, setToast] = useState({
    type: "",
    message: "",
  });

  const [selectedBooking, setSelectedBooking] =
    useState(null);

  const [formData, setFormData] =
    useState({
      patientName: "",
      phone: "",
      gender: "Male",
      appointmentDate: "",
      appointmentTime: "",
    });

  const {
    data: session,
    isPending: sessionLoading,
  } = authClient.useSession();

  const userEmail =
    session?.user?.email;

  // Fetch Bookings
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
          throw new Error(
            "Failed to fetch bookings"
          );
        }
        return res.json();
      })
      .then((data) => {
        setBookings(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [userEmail]);

  // Toast
  const showToast = (
    type,
    message
  ) => {
    setToast({ type, message });

    setTimeout(() => {
      setToast({
        type: "",
        message: "",
      });
    }, 3000);
  };

  // Delete Booking
  const handleDelete = async (
    id
  ) => {
    const confirmDelete =
      window.confirm(
        "Delete this appointment?"
      );

    if (!confirmDelete) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/bookings/${id}`,
        {
          method: "DELETE",
          credentials:
            "include",
        }
      );

      if (res.ok) {
        setBookings(
          bookings.filter(
            (item) =>
              item._id !== id
          )
        );

        showToast(
          "success",
          "Appointment deleted successfully!"
        );
      } else {
        showToast(
          "error",
          "Failed to delete appointment."
        );
      }
    } catch (error) {
      showToast(
        "error",
        "Something went wrong."
      );
    }
  };

  // Open Modal
  const openModal = (
    booking
  ) => {
    setSelectedBooking(
      booking
    );

    setFormData({
      patientName:
        booking.patientName ||
        "",
      phone:
        booking.phone || "",
      gender:
        booking.gender ||
        "Male",
      appointmentDate:
        booking.appointmentDate ||
        "",
      appointmentTime:
        booking.appointmentTime ||
        booking.timeSlot ||
        "",
    });

    document
      .getElementById(
        "edit_booking_modal"
      )
      .showModal();
  };

  // Update Booking
  const handleUpdate = async (
    e
  ) => {
    e.preventDefault();

    setActionLoading(true);

    const updatedData = {
      ...formData,
      timeSlot:
        formData.appointmentTime,
    };

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/bookings/${selectedBooking._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type":
              "application/json",
          },
          credentials:
            "include",
          body: JSON.stringify(
            updatedData
          ),
        }
      );

      if (res.ok) {
        setBookings(
          bookings.map(
            (item) =>
              item._id ===
              selectedBooking._id
                ? {
                    ...item,
                    ...updatedData,
                  }
                : item
          )
        );

        document
          .getElementById(
            "edit_booking_modal"
          )
          .close();

        showToast(
          "success",
          "Appointment updated successfully!"
        );
      } else {
        showToast(
          "error",
          "Failed to update appointment."
        );
      }
    } catch (error) {
      showToast(
        "error",
        "Something went wrong."
      );
    } finally {
      setActionLoading(false);
    }
  };

  // Loading
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

  // Not Logged In
  if (!userEmail) {
    return (
      <div className="bg-white rounded-3xl border border-slate-200 p-10 text-center shadow-sm">
        <div className="text-5xl mb-4">
          🔐
        </div>

        <h2 className="text-3xl font-bold text-slate-900 mb-3">
          Login Required
        </h2>

        <p className="text-slate-500 mb-8">
          Please sign in to view
          your appointments.
        </p>

        <Link
          href="/login"
          className="inline-flex px-6 py-3 rounded-2xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition"
        >
          Go to Login
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Toast */}
      {toast.message && (
        <div className="fixed top-6 right-6 z-50">
          <div
            className={`px-5 py-3 rounded-2xl shadow-xl text-white font-medium ${
              toast.type ===
              "success"
                ? "bg-emerald-600"
                : "bg-rose-600"
            }`}
          >
            {toast.message}
          </div>
        </div>
      )}

      {/* Header */}
      <section className="rounded-[32px] bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-900 p-8 md:p-10 text-white">
        <span className="inline-block px-4 py-2 rounded-full bg-white/10 border border-white/10 text-xs font-semibold uppercase tracking-widest mb-5">
          Appointment Center
        </span>

        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          My Appointments
        </h1>

        <p className="mt-4 text-slate-300 max-w-2xl leading-8">
          Review, update, and
          manage all your booked
          appointments from one
          convenient place.
        </p>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
          <p className="text-slate-500 text-sm">
            Total Appointments
          </p>
          <h3 className="text-4xl font-bold text-slate-900 mt-2">
            {bookings.length}
          </h3>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
          <p className="text-slate-500 text-sm">
            Pending
          </p>
          <h3 className="text-4xl font-bold text-amber-600 mt-2">
            {
              bookings.filter(
                (item) =>
                  !item.status ||
                  item.status
                    ?.toLowerCase()
                    .includes(
                      "pending"
                    )
              ).length
            }
          </h3>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
          <p className="text-slate-500 text-sm">
            Completed
          </p>
          <h3 className="text-4xl font-bold text-emerald-600 mt-2">
            {
              bookings.filter(
                (item) =>
                  [
                    "approved",
                    "completed",
                    "confirmed",
                  ].includes(
                    item.status?.toLowerCase()
                  )
              ).length
            }
          </h3>
        </div>
      </section>

      {/* Appointment Cards */}
      {bookings.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center shadow-sm">
          <div className="text-6xl mb-4">
            📭
          </div>

          <h3 className="text-2xl font-bold text-slate-900 mb-3">
            No Appointments Found
          </h3>

          <p className="text-slate-500 mb-8">
            You have not booked any
            appointments yet.
          </p>

          <Link
            href="/appointments"
            className="inline-flex px-6 py-3 rounded-2xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition"
          >
            Book Appointment
          </Link>
        </div>
      ) : (
        <div className="grid gap-6">
          {bookings.map(
            (
              booking,
              index
            ) => (
              <div
                key={
                  booking._id ||
                  index
                }
                className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                  {/* Left */}
                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold text-slate-900">
                      {booking.doctorName ||
                        "Doctor Appointment"}
                    </h3>

                    <div className="grid sm:grid-cols-2 gap-2 text-sm text-slate-500">
                      <p>
                        👤{" "}
                        {
                          booking.patientName
                        }
                      </p>
                      <p>
                        📞{" "}
                        {
                          booking.phone
                        }
                      </p>
                      <p>
                        📅{" "}
                        {
                          booking.appointmentDate
                        }
                      </p>
                      <p>
                        🕒{" "}
                        {booking.timeSlot ||
                          booking.appointmentTime}
                      </p>
                    </div>
                  </div>

                  {/* Right */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                    <span
                      className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider ${
                        booking.status
                          ?.toLowerCase() ===
                          "approved" ||
                        booking.status
                          ?.toLowerCase() ===
                          "completed"
                          ? "bg-emerald-50 text-emerald-600"
                          : "bg-amber-50 text-amber-600"
                      }`}
                    >
                      {booking.status ||
                        "Pending"}
                    </span>

                    <button
                      onClick={() =>
                        openModal(
                          booking
                        )
                      }
                      className="px-5 py-2.5 rounded-xl bg-sky-50 text-sky-600 font-semibold hover:bg-sky-100 transition"
                    >
                      Update
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(
                          booking._id
                        )
                      }
                      className="px-5 py-2.5 rounded-xl bg-rose-50 text-rose-600 font-semibold hover:bg-rose-100 transition"
                    >
                      
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      )}

      {/* Edit Modal */}
      <dialog
        id="edit_booking_modal"
        className="modal"
      >
        <div className="modal-box max-w-2xl rounded-3xl bg-white p-8">
          <h3 className="text-2xl font-bold text-slate-900 mb-6">
            Update Appointment
          </h3>

          {selectedBooking && (
            <form
              onSubmit={
                handleUpdate
              }
              className="space-y-5"
            >
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">
                  Doctor Name
                </label>
                <input
                  type="text"
                  value={
                    selectedBooking.doctorName
                  }
                  readOnly
                  className="w-full h-12 px-4 rounded-xl bg-slate-100 border border-slate-200 text-slate-500"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Patient Name"
                  value={
                    formData.patientName
                  }
                  onChange={(
                    e
                  ) =>
                    setFormData({
                      ...formData,
                      patientName:
                        e.target
                          .value,
                    })
                  }
                  className="w-full h-12 px-4 rounded-xl border border-slate-200 outline-none"
                  required
                />

                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={
                    formData.phone
                  }
                  onChange={(
                    e
                  ) =>
                    setFormData({
                      ...formData,
                      phone:
                        e.target
                          .value,
                    })
                  }
                  className="w-full h-12 px-4 rounded-xl border border-slate-200 outline-none"
                  required
                />

                <input
                  type="date"
                  value={
                    formData.appointmentDate
                  }
                  onChange={(
                    e
                  ) =>
                    setFormData({
                      ...formData,
                      appointmentDate:
                        e.target
                          .value,
                    })
                  }
                  className="w-full h-12 px-4 rounded-xl border border-slate-200 outline-none"
                  required
                />

                <input
                  type="text"
                  placeholder="Appointment Time"
                  value={
                    formData.appointmentTime
                  }
                  onChange={(
                    e
                  ) =>
                    setFormData({
                      ...formData,
                      appointmentTime:
                        e.target
                          .value,
                    })
                  }
                  className="w-full h-12 px-4 rounded-xl border border-slate-200 outline-none"
                  required
                />
              </div>

              <select
                value={
                  formData.gender
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    gender:
                      e.target
                        .value,
                  })
                }
                className="w-full h-12 px-4 rounded-xl border border-slate-200 outline-none"
              >
                <option value="Male">
                  Male
                </option>
                <option value="Female">
                  Female
                </option>
              </select>

              <div className="modal-action">
                <button
                  type="button"
                  onClick={() =>
                    document
                      .getElementById(
                        "edit_booking_modal"
                      )
                      .close()
                  }
                  className="px-6 py-3 rounded-xl bg-slate-100 text-slate-600 font-semibold"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={
                    actionLoading
                  }
                  className="px-6 py-3 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition"
                >
                  {actionLoading
                    ? "Saving..."
                    : "Save Changes"}
                </button>
              </div>
            </form>
          )}
        </div>
      </dialog>
    </div>
  );
};

export default MyAppointments;