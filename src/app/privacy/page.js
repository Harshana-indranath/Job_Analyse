import Image from "next/image";
import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <div className="max-w-3xl mx-auto px-4">
      {/* Back to Home Link */}
      <Link
        className="flex items-center gap-2 text-gray-600 hover:text-primary mb-8 w-fit"
        href="/"
      >
        <Image alt="contact" width={20} height={20} src="/backArrow.svg" />
        Back to Home
      </Link>

      {/* Privacy Policy Content */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <h1 className="text-3xl font-bold text-primary mb-6">Privacy Policy</h1>
        <div className="prose max-w-none text-gray-700 space-y-6">
          <p>
            This Privacy Policy describes how we collect, use, and protect your
            information when you visit our website.
          </p>

          {/* Sections */}
          <section>
            <h2 className="text-xl font-semibold text-primary mt-8 mb-4">
              Information We Collect
            </h2>
            <p>
              We do not collect any personal information from visitors to our
              website. Our website does not use cookies or any other tracking
              technologies.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-primary mt-8 mb-4">
              Third-Party Services
            </h2>
            <p>
              We do not use any third-party services that collect data on our
              behalf.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-primary mt-8 mb-4">
              Use of ChatGPT API
            </h2>
            <p>
              Our website utilizes OpenAI's ChatGPT API to enhance user
              experience and provide interactive services.
            </p>
          </section>

          {/* Add other sections as necessary */}
          <section>
            <h2 className="text-xl font-semibold text-primary mt-8 mb-4">
              Advertising
            </h2>
            <p>
              This website uses Google AdSense and third-party advertisements to
              monetize content. These services may use cookies and other
              tracking technologies to collect information about your browsing
              behavior.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-primary mt-8 mb-4">
              Opt-Out Options
            </h2>
            <p>
              You can opt out of personalized advertising by visiting Google's
              Ad Settings page or the Network Advertising Initiative opt-out
              page.
            </p>
          </section>

          <p className="mt-8 text-sm text-gray-500">
            Last updated: Thursday, January 16, 2025
          </p>
        </div>
      </div>
    </div>
  );
}
