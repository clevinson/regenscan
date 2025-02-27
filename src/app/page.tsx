"use client";

import SearchBar from "@/components/Search";
import MainStats from "@/components/MainStats";
import HomeHeader from "@/components/HomeHeader";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <HomeHeader />
      <div className="flex flex-col items-center mx-auto w-full px-4 md:w-4xl md:px-0 space-y-4 grow">
        <div className="md:mt-24" />
        <h1 className="text-3xl md:text-4xl font-bold  text-center text-primary">
          Regen Network
          <span className="block md:inline"> </span>
          Dataset Explorer
        </h1>
        <SearchBar />
        <div className="mt-4" />
        <MainStats />
      </div>
    </div>
  );
}
