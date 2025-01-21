"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  regenIRIRegex,
  projectRegex,
  classRegex,
  batchRegex,
} from "@/utils/constants";

export default function SearchBar() {
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
    <form onSubmit={handleSubmit} className="flex text-xs items-center">
      <input
        type="text"
        value={iri}
        onChange={(e) => setIri(e.target.value)}
        placeholder="Enter Regen IRI, Project ID, Credit Class ID, or Batch ID"
        className="px-4 py-2 w-[480px] 
                   bg-[rgb(var(--primary-green))] 
                   text-[rgb(var(--text-primary))]
                   border border-[rgb(var(--primary-grey))] 
                   rounded-l-md 
                   focus:outline-0
                   focus:border-[rgb(var(--accent-blue))]
                   placeholder-[rgb(var(--text-secondary))]"
      />
      <button
        type="submit"
        className="px-4 py-2 
                   bg-[rgb(var(--primary-grey))]
                   text-[rgb(var(--text-primary))] 
                   rounded-r-md 
                   hover:bg-[rgb(var(--highlight-green))]
                   focus:outline-0
                   border border-[rgb(var(--primary-grey))]
                   focus:border-[rgb(var(--accent-blue))]
                   transition-all"
      >
        Search
      </button>
    </form>
  );
}
