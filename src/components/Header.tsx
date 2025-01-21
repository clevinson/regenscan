"use client";
import React from "react";
import Link from "next/link";
import SearchBar from "./Search";

const Header = () => {
  const [searchQuery, setSearchQuery] = React.useState("");

  return (
    <header className="pb-2 mb-2 text-md border-b border-gray-900">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link className="" href="/">
            Home
          </Link>
          <Link className="" href="/about">
            About
          </Link>
        </div>
        <div className="w-1/2">
          <SearchBar />
        </div>
      </div>
    </header>
  );
};

export default Header;
