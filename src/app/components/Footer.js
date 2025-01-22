"use client";
import { Fragment, useState } from "react";
import ContactForm from "./ContactForm";
import Image from "next/image";
export default function Footer() {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  const handleOpenForm = () => setIsContactFormOpen(true);
  const handleCloseForm = () => setIsContactFormOpen(false);

  return (
    <footer className="mt-auto bg-white/80 backdrop-blur-sm border-t border-gray-200">
      <div className="max-w-[90rem] mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Contact Form (Conditional) */}
        {(!isContactFormOpen && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <Fragment>
              <div>
                <h3 className="text-lg font-semibold text-primary mb-4">
                  About
                </h3>
                <p className="text-gray-600">
                  Job Analysis helps job seekers analyze job postings with AI to
                  improve their applications and interview preparation.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-primary mb-4">
                  Legal
                </h3>
                <div className="space-y-2">
                  <a
                    href="/privacy"
                    className="block text-gray-600 hover:text-primary"
                  >
                    Privacy Policy
                  </a>
                  <a
                    href="/terms"
                    className="block text-gray-600 hover:text-primary"
                  >
                    Terms of Service
                  </a>
                  <button
                    className="flex items-center gap-2 text-gray-600 hover:text-primary"
                    onClick={handleOpenForm}
                  >
                    <Image
                      alt="contact"
                      width={20}
                      height={20}
                      src="/mail.svg"
                    />
                    Contact Us
                  </button>
                </div>
              </div>
            </Fragment>
          </div>
        )) || <ContactForm onClose={handleCloseForm} />}
        <div className="text-center text-gray-500 pt-8 border-t border-gray-200">
          <p>© 2025 Job Analysis. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
