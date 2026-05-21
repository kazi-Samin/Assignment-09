"use client";

import React, {
  useEffect,
  useState,
} from "react";
import { authClient } from "@/lib/auth-client";

const DEFAULT_AVATAR =
  "https://i.ibb.co/4pDNDk1/avatar.png";

export default function MyProfile() {
  const {
    data: session,
    isPending,
  } = authClient.useSession();

  const user = session?.user;

  const [name, setName] =
    useState("");
  const [photoUrl, setPhotoUrl] =
    useState(DEFAULT_AVATAR);

  const [loading, setLoading] =
    useState(false);

  const [toast, setToast] =
    useState("");

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setPhotoUrl(
        user.image ||
          DEFAULT_AVATAR
      );
    }
  }, [user]);

  const showToast = (message) => {
    setToast(message);

    setTimeout(() => {
      setToast("");
    }, 3000);
  };

  const handleUpdateProfile =
    async (e) => {
      e.preventDefault();
      setLoading(true);

      try {
        await authClient.updateUser({
          name,
          image:
            photoUrl ||
            DEFAULT_AVATAR,
        });

        document
          .getElementById(
            "edit_profile_modal"
          )
          .close();

        showToast(
          "Profile updated successfully!"
        );
      } catch (error) {
        console.error(
          "Profile update error:",
          error
        );

        showToast(
          "Failed to update profile."
        );
      } finally {
        setLoading(false);
      }
    };

  if (isPending) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-emerald-600"></span>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="bg-white rounded-3xl border border-slate-200 p-10 text-center shadow-sm">
        <div className="text-5xl mb-4">
          🔐
        </div>

        <h2 className="text-3xl font-bold text-slate-900 mb-3">
          Login Required
        </h2>

        <p className="text-slate-500">
          Please sign in to view
          your profile information.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Toast */}
      {toast && (
        <div className="fixed top-6 right-6 z-50">
          <div className="px-5 py-3 rounded-2xl bg-emerald-600 text-white shadow-xl font-medium">
            {toast}
          </div>
        </div>
      )}

      {/* Header Banner */}
      <section className="rounded-[32px] bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-900 p-8 md:p-10 text-white">
        <span className="inline-block px-4 py-2 rounded-full bg-white/10 border border-white/10 text-xs font-semibold uppercase tracking-widest mb-5">
          Account Settings
        </span>

        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          My Profile
        </h1>

        <p className="mt-4 text-slate-300 max-w-2xl leading-8">
          View and update your
          personal information,
          profile photo, and
          account details.
        </p>
      </section>

      {/* Profile Card */}
      <section className="bg-white border border-slate-200 rounded-[32px] p-8 md:p-10 shadow-sm">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10">
          {/* Avatar */}
          <div className="relative">
            <div className="w-40 h-40 rounded-full p-1 bg-gradient-to-r from-emerald-500 to-teal-500">
              <img
                src={
                  photoUrl ||
                  DEFAULT_AVATAR
                }
                alt="Profile"
                className="w-full h-full rounded-full object-cover bg-white"
              />
            </div>

            <div className="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-lg">
              ✓
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 text-center lg:text-left">
            <h2 className="text-3xl font-bold text-slate-900">
              {name ||
                "Patient User"}
            </h2>

            <p className="text-slate-500 mt-2">
              {user.email}
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mt-8">
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  Full Name
                </p>
                <p className="font-semibold text-slate-900">
                  {name ||
                    "Not Provided"}
                </p>
              </div>

              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  Email Address
                </p>
                <p className="font-semibold text-slate-900 break-all">
                  {user.email}
                </p>
              </div>
            </div>

            <button
              onClick={() =>
                document
                  .getElementById(
                    "edit_profile_modal"
                  )
                  .showModal()
              }
              className="mt-8 px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-lg shadow-emerald-200 transition"
            >
              Update Profile
            </button>
          </div>
        </div>
      </section>

      {/* Edit Modal */}
      <dialog
        id="edit_profile_modal"
        className="modal"
      >
        <div className="modal-box max-w-2xl rounded-[32px] bg-white p-8">
          <h3 className="text-2xl font-bold text-slate-900 mb-6">
            Update Profile
          </h3>

          <form
            onSubmit={
              handleUpdateProfile
            }
            className="space-y-5"
          >
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={
                  user.email
                }
                readOnly
                className="w-full h-12 px-4 rounded-xl bg-slate-100 border border-slate-200 text-slate-500"
              />
            </div>

            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">
                Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(
                  e
                ) =>
                  setName(
                    e.target
                      .value
                  )
                }
                className="w-full h-12 px-4 rounded-xl border border-slate-200 outline-none focus:border-emerald-500"
              />
            </div>

            {/* Photo URL */}
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">
                Profile Photo URL
              </label>
              <input
                type="url"
                required
                value={
                  photoUrl
                }
                onChange={(
                  e
                ) =>
                  setPhotoUrl(
                    e.target
                      .value
                  )
                }
                className="w-full h-12 px-4 rounded-xl border border-slate-200 outline-none focus:border-emerald-500"
              />
            </div>

            {/* Buttons */}
            <div className="modal-action">
              <button
                type="button"
                onClick={() =>
                  document
                    .getElementById(
                      "edit_profile_modal"
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
                  loading
                }
                className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold transition"
              >
                {loading
                  ? "Saving..."
                  : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
}