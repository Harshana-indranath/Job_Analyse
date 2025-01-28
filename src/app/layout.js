import { Geist, Geist_Mono } from "next/font/google";
import Head from "next/head";
import AdSense from "./components/AdSense";
import Content from "./components/Content";
import Footer from "./components/Footer";
import Header from "./components/Header";
import "./globals.css";

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
          {/* Include the AdSense script */}
          <AdSense  />
        {/* Navbar */}
        <Header />
        {/* Main Content */}
        <Content>{children}</Content>
        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}
