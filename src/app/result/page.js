"use client"; // This line ensures the component runs on the client-side

// pages/result.js
import React, { useState } from "react";
import JobAnalysisReport from "../components/JobAnalysisReport";
import Link from "next/link";
import jsPDF from "jspdf";
import Image from "next/image";
import { useRouter } from "next/navigation";

const ResultPage = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const generatePDF = () => {
    const doc = new jsPDF();
    setLoading(true); // Show the spinner when the process starts

    // Capture the content you want to export as a PDF
    const reportContent = document.getElementById("job-analysis-report");

    doc.html(reportContent, {
      callback: function (doc) {
        setLoading(false); // Hide the spinner once PDF is generated
        doc.save("job_analysis_report.pdf");
      },
      x: 10,
      y: 10,
      width: 180,
      windowWidth: 800,
      scale: 1,
    });
  };

  const goBack = () => {
    // removing sessions
    sessionStorage.removeItem("jobAnalysisResult");
    sessionStorage.removeItem("invalidJobPost");
    sessionStorage.removeItem("originalJobPost");
    // redirecting to home page
    router.push("/");
  };

  return (
    <div className="w-full max-w-[90rem] flex flex-col lg:flex-row justify-center">
      {/* Left Ad Space */}
      <aside className="hidden lg:block w-1/6">
        <div className="sticky top-8">
          <div className="ad-placeholder  h-[600px]  flex items-center justify-center">
            {/* Ad Space Left */}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="max-w-3xl flex-grow px-4">
        <div className="space-y-6">
          {/* Buttons */}
          <div className="flex justify-between items-center">
            <button
              onClick={goBack}
              className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors"
            >
              <Image
                alt="contact"
                width={20}
                height={20}
                src="/backArrow.svg"
              />
              Back to Analysis
            </button>
            <button
              onClick={generatePDF}
              disabled={loading}
              className="flex items-center gap-2 bg-primary text-white py-2 px-4 rounded-lg hover:bg-[#004580] transition-all duration-200 disabled:bg-primary/40 disabled:cursor-not-allowed shadow-sm hover:shadow-md disabled:shadow-none"
            >
              {loading ? (
                <div className="w-5 h-5 border-t-4 border-b-4 border-white rounded-full animate-spin"></div>
              ) : (
                <Image alt="contact" width={20} height={20} src="/print.svg" />
              )}
              Save as PDF
            </button>
          </div>

          {/* Job Analysis Report */}
          <JobAnalysisReport />
        </div>
      </div>

      {/* Right Ad Space */}
      <aside className="hidden lg:block w-1/6">
        <div className="sticky top-8">
          <div className="ad-placeholder  h-[600px]  flex items-center justify-center">
            {/* Ad Space Right */}
          </div>
        </div>
      </aside>
    </div>
  );
};

export default ResultPage;
