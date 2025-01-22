import Image from "next/image";
import React, { useState } from "react";

export default function ContactForm({ onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true); // Show loading spinner
    // Simulate a message submission process (you can replace this with actual submission logic)
    setTimeout(() => {
      setIsLoading(false); // Hide loading spinner
      setSubmitted(true); // Show success message after submission
    }, 2000); // Simulate a 2-second delay
  };

  return (
    <div className="mb-12">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-primary mb-2">Contact Us</h2>
        <p className="text-gray-600">
          Have questions? We'd love to hear from you.
        </p>
      </div>
      {submitted ? (
        <div className="text-center p-6 bg-green-50 rounded-lg">
          <h3 className="text-lg font-semibold text-green-800 mb-2">
            Message Sent!
          </h3>
          <p className="text-green-600">
            Thank you for your message. We'll get back to you soon.
          </p>
        </div>
      ) : (
        <form className="space-y-4 max-w-md mx-auto" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full px-4 py-2 text-black border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#003566] focus:border-transparent"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-4 py-2 text-black border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#003566] focus:border-transparent"
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows="4"
              className="w-full px-4 py-2 text-black border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#003566] focus:border-transparent resize-none"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-[#003566] text-white py-2 px-4 rounded-lg hover:bg-[#004580] transition-all duration-200 disabled:bg-[#003566]/40 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-t-4 border-b-4 border-white rounded-full animate-spin"></div>
            ) : (
              <Image alt="contact" width={20} height={20} src="/send.svg" />
            )}
            Send Message
          </button>
        </form>
      )}
      <button
        onClick={onClose}
        className="mt-4 text-gray-500 hover:text-primary block mx-auto"
      >
        Close Form
      </button>
    </div>
  );
}
