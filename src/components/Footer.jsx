


"use client";

import Link from "next/link";
import {
  FaFacebookF,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  const quickLinks = [
    { label: "Home", href: "/home" },
    { label: "All Appointments", href: "/appointments" },
    { label: "Dashboard", href: "/dashboard" },
    { label: "Login", href: "/login" },
  ];

  const services = [
    "Cardiology",
    "Neurology",
    "Pediatrics",
    "Dermatology",
  ];

  return (
    <footer className="bg-slate-950 text-white">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link
              href="/home"
              className="flex items-center gap-3 mb-6"
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center shadow-lg">
                <svg
                  className="w-6 h-6 text-white"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M10 4h4v6h6v4h-6v6h-4v-6H4v-4h6V4z" />
                </svg>
              </div>

              <div>
                <h2 className="text-2xl font-bold">
                  Medi<span className="text-emerald-400">Care</span>
                </h2>
                <p className="text-sm text-slate-400">
                  Smart Healthcare Platform
                </p>
              </div>
            </Link>

            <p className="text-slate-400 leading-relaxed max-w-xl mb-6">
              Book appointments with experienced doctors, manage your
              schedules, and access quality healthcare services from
              anywhere, anytime.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {[
                {
                  icon: <FaFacebookF />,
                  href: "https://facebook.com",
                },
                {
                  icon: <FaInstagram />,
                  href: "https://instagram.com",
                },
                {
                  icon: <FaLinkedinIn />,
                  href: "https://linkedin.com",
                },
                {
                  icon: <FaGithub />,
                  href: "https://github.com",
                },
                {
                  icon: <FaXTwitter />,
                  href: "https://x.com",
                },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 hover:border-emerald-500 hover:text-emerald-400 flex items-center justify-center transition-all duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-5">
              Quick Links
            </h3>

            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-emerald-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-5">
              Specialties
            </h3>

            <ul className="space-y-3">
              {services.map((service) => (
                <li
                  key={service}
                  className="text-slate-400"
                >
                  {service}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500 text-center md:text-left">
            © {new Date().getFullYear()} MediCare. All rights reserved.
          </p>

          <div className="flex items-center gap-6 text-sm text-slate-500">
            <Link
              href="/privacy"
              className="hover:text-emerald-400 transition-colors"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms"
              className="hover:text-emerald-400 transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;