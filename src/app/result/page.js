"use client"; // This line ensures the component runs on the client-side

// pages/result.js
import React, { useState } from "react";
import JobAnalysisReport from "../components/JobAnalysisReport";
import Link from "next/link";
import jsPDF from "jspdf";
import Image from "next/image";

const ResultPage = () => {
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
  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-3xl space-y-6">
        {/* Buttons */}
        <div className="flex justify-between items-center">
          <Link
            href="/"
            className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors"
          >
            <Image alt="contact" width={20} height={20} src="/backArrow.svg" />
            Back to Analysis
          </Link>
          <button
            onClick={generatePDF}
            disabled={loading}
            className="flex items-center gap-2 bg-primary text-white py-2 px-4 rounded-lg hover:bg-[#004580] transition-all duration-200 disabled:bg-primary/40 disabled:cursor-not-allowed shadow-sm hover:shadow-md disabled:shadow-none"
          >
            {" "}
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
  );
};

export default ResultPage;
