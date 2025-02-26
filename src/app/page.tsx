"use client";

import SearchBar from "@/components/Search";
import MainStats from "@/components/MainStats";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col h-screen">
      <header className="px-4 py-4 md:px-8 md:py-6 text-md flex justify-end space-x-4 md:space-x-6">
        <div>
          <Link href="/stats">Stats</Link>
        </div>
        <div>
          <Link href="/about">About</Link>
        </div>
      </header>
      <div className="flex flex-col items-center mx-auto w-full px-4 md:w-4xl md:px-0 space-y-4 grow">
        <div className="md:mt-24" />
        <h1 className="text-xl md:text-4xl font-bold  text-center text-primary">
          Regen Network Dataset Explorer
        </h1>
        <SearchBar />
        <div className="mt-8" />
        <MainStats />
      </div>
    </div>
  );
}
