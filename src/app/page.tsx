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
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-8 text-[rgb(var(--text-primary))]">
        Regen Network Dataset Explorer
      </h1>
      <SearchBar />
    </div>
  );
}
