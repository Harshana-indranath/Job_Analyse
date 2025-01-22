export const generatePDF = async () => {
  const doc = new jsPDF();
  // Show the spinner when the process starts

  // Capture the content you want to export as a PDF
  const reportContent = document.getElementById("job-analysis-report");

  return await doc.html(reportContent, {
    callback: function (doc) {
      doc.save("job_analysis_report.pdf");
    },
    x: 10,
    y: 10,
    width: 180,
    windowWidth: 800,
    scale: 0.8,
  });
};
