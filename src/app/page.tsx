"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  regenIRIRegex,
  projectRegex,
  classRegex,
  batchRegex,
} from "@/utils/constants";
import SearchBar from "@/components/Search";
import MainStats from "@/components/MainStats";
import Link from "next/link";

export default function Home() {
  const [iri, setIri] = useState<string>("");
  const router = useRouter();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (iri) {
      if (iri.match(regenIRIRegex)) {
        router.push(`/dataset/${iri}`);
      } else if (iri.match(projectRegex)) {
        router.push(`/project/${iri}`);
      } else if (iri.match(classRegex)) {
        router.push(`/class/${iri}`);
      } else if (iri.match(batchRegex)) {
        router.push(`/batch/${iri}`);
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-8 py-6 text-md flex justify-end space-x-6">
        <div>
          <Link href="/stats">Stats</Link>
        </div>
        <div>
          <Link href="/about">About</Link>
        </div>
      </header>
      <div className="flex flex-col items-center justify-center flex-grow">
        <h1 className="text-4xl font-bold mb-8 text-[rgb(var(--text-primary))]">
          Regen Network Dataset Explorer
        </h1>
        <SearchBar />
        <div className="mt-12"></div>
        <MainStats />
        <div className="mt-48"></div>
      </div>
    </div>
  );
}
