"use client";
import React, { useState } from "react";
import Link from "next/link";
import SearchBar from "./Search";
import HamburgerIcon from "./HamburgerIcon";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="mb-4 text-md">
      <div className="container mx-auto flex justify-between items-center px-0">
        <div className="flex items-center space-x-4 md:hidden">
          <button onClick={toggleMenu} className="focus:outline-none mr-0">
            <HamburgerIcon />
          </button>
          {isMenuOpen && (
            <div className="absolute top-18 left-4 bg-primary-green z-2 shadow-md rounded-md p-2">
              <Link className="block px-4 py-2" href="/">
                Home
              </Link>
              <Link className="block px-4 py-2" href="/stats">
                Stats
              </Link>
              <Link className="block px-4 py-2" href="/about">
                About
              </Link>
            </div>
          )}
        </div>
        <div className="hidden md:flex items-center w-full space-x-4">
          <Link className="" href="/">
            Home
          </Link>
          <Link className="" href="/stats">
            Stats
          </Link>
          <Link className="" href="/about">
            About
          </Link>
        </div>
        <div className="w-full">
          <SearchBar />
        </div>
      </div>
    </header>
  );
};

export default Header;
