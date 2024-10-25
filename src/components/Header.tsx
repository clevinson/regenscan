"use client";
import React from "react";
import Link from "next/link";

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
        <form className="flex items-center text-xs space-x-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-[320px]"
            placeholder="Enter Regen IRI, Project ID, Credit Class ID, or Batch ID"
          />
          <button type="submit" className="bg-blue-500 p-2 rounded text-white">
            Search
          </button>
        </form>
      </div>
    </header>
  );
};

export default Header;
