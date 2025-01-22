import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";
import Footer from "./components/Footer";
import Header from "./components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Job Analysis",
  description: "AI-powered job post analysis for job seekers",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`flex flex-col min-h-screen ${geistSans.variable} ${geistMono.variable} antialiased bg-foreground ui-sans-serif`}
      >
        {/* Navbar */}
        <Header />
        {/* Main Content */}
        <main className="flex-grow">
          <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </div>
        </main>
        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}
