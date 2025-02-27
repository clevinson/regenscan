"use client";

import SearchBar from "@/components/Search";
import MainStats from "@/components/MainStats";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col">
      <header className="px-4 py-3 md:px-6 md:py-4 text-md flex justify-end space-x-4 md:space-x-6">
        <div>
          <Link href="/stats">Stats</Link>
        </div>
        <div>
          <Link href="/about">About</Link>
        </div>
      </header>
      <div className="flex flex-col items-center mx-auto w-full px-4 md:w-4xl md:px-0 space-y-4 grow">
        <div className="md:mt-24" />
        <h1 className="text-3xl md:text-4xl font-bold  text-center text-primary">
          Regen Network
          <br />
          Dataset Explorer
        </h1>
        <SearchBar />
        <div className="mt-4" />
        <MainStats />
      </div>
    </div>
  );
}
