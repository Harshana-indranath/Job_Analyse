"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleChange = (e) => setPrompt(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/generate-text", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();
      sessionStorage.setItem("originalJobPost", JSON.stringify(prompt));
      sessionStorage.setItem("jobAnalysisResult", JSON.stringify(data.text));

      router.push("/result");
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-3xl">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-primary mb-3">
            AI-Powered Job Post Analysis
          </h2>
          <p className="text-gray-600">
            Paste a job posting below to get detailed insights for your resume
            preparation and job interview tips.
          </p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <div className="flex items-center gap-2 mb-4">
              <Image alt="contact" width={20} height={20} src="/file.svg" />
              <h3 className="font-medium text-primary">Job Posting Content</h3>
            </div>
            <textarea
              value={prompt}
              onChange={handleChange}
              className="w-full h-[40rem] p-6 text-black border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary bg-gray-50/50"
              placeholder="Paste the complete job posting here..."
              required
            ></textarea>
          </div>
          <button
            disabled={!prompt || loading}
            type="submit"
            className="w-full flex items-center justify-center bg-primary text-white py-3 px-4 rounded-lg hover:bg-[#004580] disabled:bg-primary/40  disabled:cursor-not-allowed shadow-sm hover:shadow-md disabled:shadow-none"
          >
            {loading ? (
              <div className="w-5 h-5 border-t-4 border-b-4 border-white rounded-full animate-spin"></div>
            ) : (
              <Image alt="contact" width={20} height={20} src="/send.svg" />
            )}
            <span className="ml-2">
              {loading ? "Analyzing Job Post..." : "Analyze Job Post"}
            </span>
          </button>
        </form>
      </div>
    </div>
  );
}
