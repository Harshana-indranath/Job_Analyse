import React from "react";

const Header = () => {
  return (
    <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-10">
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <a href="/" className="w-fit">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-[#003566] to-[#004580] text-transparent bg-clip-text hover:from-[#004580] hover:to-[#005599] transition-all">
            Job Analysis
          </h1>
        </a>
      </div>
    </header>
  );
};

export default Header;
