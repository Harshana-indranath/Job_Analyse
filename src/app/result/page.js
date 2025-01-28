"use client"; // This line ensures the component runs on the client-side

// pages/result.js
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import JobAnalysisReport from "../components/JobAnalysisReport";
import JobAnalysisReport2 from "../components/JobAnalysisReport2";

const ResultPage = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [isForPDF, setIsForPDF] = useState(false);

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

  const generatePDF = async () => {
    setIsForPDF(true);
    const reportContent1 = document.getElementById("job-report-page1");
    const reportContent2 = document.getElementById("job-report-page2");
    const reportContent3 = document.getElementById("job-report-page3");

    // Initialize jsPDF instance
    const pdf = new jsPDF("p", "mm", "a4");

    // Helper function to render HTML content into a PDF page
    const renderContentToPDF = async (element, pdfInstance, pageNumber) => {
      const canvas = await html2canvas(element, {
        scale: 2,
        backgroundColor: "white",
      });
      const imgData = canvas.toDataURL("image/png");

      const pageWidth = pdfInstance.internal.pageSize.getWidth();
      const pageHeight = pdfInstance.internal.pageSize.getHeight();

      const imgWidth = pageWidth - 20; // Add 10mm margin on each side
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // Add image to the PDF
      if (pageNumber > 0) pdfInstance.addPage(); // Add a new page for subsequent content
      pdfInstance.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
    };

    // Render each content block as a separate page
    setLoading(true);
    try {
      await renderContentToPDF(reportContent1, pdf, 0);
      await renderContentToPDF(reportContent2, pdf, 1);
      await renderContentToPDF(reportContent3, pdf, 2);

      // Save the PDF
      pdf.save("job_analysis_report.pdf");
    } catch (error) {
      console.error("PDF Generation Error:", error);
    } finally {
      setLoading(false);
      setIsForPDF(false);
    }
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
          {/* <JobAnalysisReport /> */}
          <div>
            {" "}
            <JobAnalysisReport2 isForPDF={isForPDF} />
          </div>
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
