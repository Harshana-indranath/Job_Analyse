// components/JobAnalysisReport.js
import { parseResponse } from "../../util/parseResponse";
import { useRouter } from "next/navigation";
import React, { Fragment, useEffect, useState } from "react";

const JobAnalysisReport2 = ({ isForPDF = false }) => {
  const router = useRouter();
  const [result, setResult] = useState("");
  const [originalPost, setOriginalPost] = useState("");
  const [invalidJobPost, setInvalidJobPost] = useState(false);
  const [invalidJobPostText, setInvalidJobPostText] = useState("");

  // redirecting back to home page if no analysis saved
  useEffect(() => {
    const storedResult = sessionStorage.getItem("jobAnalysisResult");
    if (!storedResult) router.push("/");
  }, []);

  // checking invalid JobPost
  useEffect(() => {
    const invalidJobPost = sessionStorage.getItem("invalidJobPost");
    setInvalidJobPost(invalidJobPost === "true");
  }, []);

  useEffect(() => {
    // Retrieve result from sessionStorage
    const storedResult = sessionStorage.getItem("jobAnalysisResult");
    const jobPost = sessionStorage.getItem("originalJobPost");
    const invalidJobPost = sessionStorage.getItem("invalidJobPost");
    const inValid = invalidJobPost === "true";
    if (inValid) setInvalidJobPostText(JSON.parse(storedResult));

    if (storedResult && !inValid) {
      const parsedResponse = parseResponse(JSON.parse(storedResult));
      setResult(parsedResponse);
    }

    if (jobPost) setOriginalPost(JSON.parse(jobPost));
  }, []);

  const verticalLineClass = `h-6 w-1 bg-[#003566] rounded-full ${
    isForPDF ? "hidden" : ""
  }`;

  return (
    <div className="bg-white  space-y-6">
      <div className="space-y-6">
        <div
          className="rounded-xl shadow-sm border border-gray-200 p-8"
          id="job-report-page1"
        >
          {/* Original Job Posting */}
          <div className="border-b border-gray-200 pb-6">
            <h2 className="text-2xl font-bold text-[#003566] mb-2">
              Job Analysis Report
            </h2>
            <p className="text-gray-500 text-sm">Job Insights Powered by AI</p>
          </div>

          {/* Original Job Posting */}
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-[#003566] mb-3">
                Original Job Posting
              </h3>
              <div className="text-gray-600 whitespace-pre-wrap">
                {originalPost}
              </div>
            </div>

            {/* Job Summary */}
            <h3 className="text-xl font-bold text-[#003566] mt-8 mb-4 flex items-center gap-2">
              <div className={verticalLineClass}></div>
              Job Summary
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {invalidJobPost ? invalidJobPostText : result["Job Summary"]}
            </p>
          </div>
        </div>

        <div className="prose max-w-none">
          {!invalidJobPost && (
            <Fragment>
              <div
                className="rounded-xl shadow-sm border border-gray-200 p-8"
                id="job-report-page2"
              >
                {/* Suggested Relevant Skills */}
                <h3 className="text-xl font-bold text-[#003566] mt-8 mb-4 flex items-center gap-2">
                  <div className={verticalLineClass}></div>
                  Suggested Relevant Skills and Model Achievements
                </h3>
                {result["Suggested Relevant Skills and Model Achievements"]
                  ?.split("\n")
                  .map((item, index) => (
                    <p key={index} className="text-gray-700 leading-relaxed">
                      {item}
                    </p>
                  ))}

                {/* Typical Pain Points */}
                <h3 className="text-xl font-bold text-[#003566] mt-8 mb-4 flex items-center gap-2">
                  <div className={verticalLineClass}></div>
                  Typical Pain Points for This Role
                </h3>
                {result["Typical Pain Points for This Role"]
                  ?.split("\n")
                  .map((item, index) => (
                    <p key={index} className="text-gray-700 leading-relaxed">
                      {item}
                    </p>
                  ))}

                {/* Relevant Keywords */}
                <h3 className="text-xl font-bold text-[#003566] mt-8 mb-4 flex items-center gap-2">
                  <div className={verticalLineClass}></div>
                  Relevant Keywords for ATS Optimization
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {result["Relevant Keywords for ATS Optimization"]}
                </p>
              </div>
              <div
                className="rounded-xl shadow-sm border border-gray-200 p-8 mt-5"
                id="job-report-page3"
              >
                {/* Action Verbs */}
                <h3 className="text-xl font-bold text-[#003566] mt-8 mb-4 flex items-center gap-2">
                  <div className={verticalLineClass}></div>
                  Action Verbs and Language Refinement
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {result["Action Verbs and Language Refinement"]}
                </p>

                {/* Questions to Ask the Interviewer */}
                <h3 className="text-xl font-bold text-[#003566] mt-8 mb-4 flex items-center gap-2">
                  <div className={verticalLineClass}></div>
                  Questions to Ask the Interviewer
                </h3>
                {result["Questions to Ask the Interviewer"]
                  ?.split("\n")
                  .map((item, index) => (
                    <p key={index} className="text-gray-700 leading-relaxed">
                      {item}
                    </p>
                  ))}
              </div>
            </Fragment>
          )}{" "}
        </div>
      </div>
    </div>
  );
};

export default JobAnalysisReport2;
