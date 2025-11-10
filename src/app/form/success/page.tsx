"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Navbar from "../../components/Navbar";
import Image from "next/image";
import Logo from "../../../../public/images/logo.svg";
import { FaCheckCircle, FaHome, FaHistory } from "react-icons/fa";

export default function SuccessPage() {
  const router = useRouter();

  return (
    <div className="bg-[#e1eaf8] min-h-screen w-screen">
      <Navbar />
      <main className="pt-12 max-w-4xl mx-auto px-4 flex flex-col items-center justify-center min-h-[60vh]">
        {/* Success Icon and Message */}
        <div className="text-center mb-8">
          <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
          <h1 className="text-3xl md:text-4xl font-bold text-[#374995] mb-4">
            Survey Submitted Successfully!
          </h1>
          <p className="text-lg text-[#374995] mb-6">
            Thank you for participating in Speed Data-ing!
          </p>
          <p className="text-[#374995] opacity-75">
            Your responses have been recorded and will be used for matching.
            <br />
            Please wait for the matching process to complete.
          </p>
        </div>

        {/* Logo */}
        <div className="mb-8">
          <Image src={Logo} alt="Logo" className="w-32 h-auto" />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
          <button
            onClick={() => router.push("/dashboard")}
            className="flex items-center justify-center gap-2 bg-[#374995] text-white px-6 py-3 rounded-full hover:bg-[#5989fc] transition-colors"
          >
            <FaHome />
            Back to Dashboard
          </button>
          <button
            onClick={() => router.push("/history")}
            className="flex items-center justify-center gap-2 bg-[#A6C3EA] text-white px-6 py-3 rounded-full hover:bg-[#8bb3e8] transition-colors"
          >
            <FaHistory />
            View Previous Matches
          </button>
        </div>

        {/* Additional Info */}
        <div className="mt-8 text-center text-sm text-[#374995] opacity-75">
          <p>
            You can check your dashboard for updates on the matching process.
            <br />
            Matches will be available once the algorithm completes.
          </p>
        </div>
      </main>
    </div>
  );
}
