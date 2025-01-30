"use client"; // This line ensures the component runs on the client-side

// pages/result.js
import jsPDF from "jspdf";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import JobAnalysisReport from "../components/JobAnalysisReport";

const ResultPage = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [isForPDF, setIsForPDF] = useState(false);
  const [invalidJobPost, setInvalidJobPost] = useState(false);

  // checking invalid JobPost
  useEffect(() => {
    const invalidJobPost = sessionStorage.getItem("invalidJobPost");
    setInvalidJobPost(invalidJobPost === "true");
  }, []);

  useEffect(() => {
    const initializeAds = () => {
      document.querySelectorAll(".adsbygoogle").forEach((slot) => {
        if (slot.offsetWidth > 0) {
          try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
          } catch (e) {
            console.error("AdSense error:", e);
          }
        }
      });
    };

    const handleResize = () => initializeAds();

    initializeAds();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const generatePDF = () => {
    const doc = new jsPDF();
    setLoading(true); // Show the spinner when the process starts
    setIsForPDF(true);

    // Capture the content you want to export as a PDF
    const reportContent = document.getElementById("job-analysis-report");

    doc.html(reportContent, {
      callback: function (doc) {
        setLoading(false); // Hide the spinner once PDF is generated
        doc.save("job_analysis_report.pdf");
        setIsForPDF(false);
      },
      margin: [15, 5, 15, 5],
      paddding: 20,
      x: 10,
      y: 10,
      width: 180,
      windowWidth: 800,
      scale: 1,
      autoPaging: "text",
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
          <div className="ad-placeholder h-[600px] flex items-center justify-center">
            {/* Ad Space Left */}
            <ins
              className="adsbygoogle"
              style={{ display: "block" }}
              data-ad-client="ca-pub-8394717406255113"
              data-ad-slot="7104720583"
              data-ad-format="auto"
              data-full-width-responsive="true"
            ></ins>
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
              disabled={loading || invalidJobPost}
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
          <JobAnalysisReport isForPDF={isForPDF} />
        </div>
      </div>

      {/* Right Ad Space */}
      <aside className="hidden lg:block w-1/6">
        <div className="sticky top-8">
          <div className="ad-placeholder  h-[600px]  flex items-center justify-center">
            {/* Ad Space Right */}
            <ins
              className="adsbygoogle"
              style={{ display: "block" }}
              data-ad-client="ca-pub-8394717406255113"
              data-ad-slot="7104720583"
              data-ad-format="auto"
              data-full-width-responsive="true"
            ></ins>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default ResultPage;
