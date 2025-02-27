"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  regenIRIRegex,
  projectRegex,
  classRegex,
  batchRegex,
  typeRegex,
} from "@/utils/constants";

export default function SearchBar() {
  const [iri, setIri] = useState<string>("");
  const router = useRouter();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (iri) {
      if (iri.match(typeRegex)) {
        router.push(`/credit-type/${iri}`);
      } else if (iri.match(regenIRIRegex)) {
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
    <form
      onSubmit={handleSubmit}
      className="flex flex-row text-s md:text-xs items-center w-full md:w-lg"
    >
      <input
        type="text"
        value={iri}
        onChange={(e) => setIri(e.target.value)}
        placeholder="Enter Regen IRI, Project ID, Credit Class ID, or Batch ID"
        className="px-4 py-2 w-full 
                   bg-primary-green 
                   text-primary 
                   border border-primary-grey 
                   rounded-l-md 
                   focus:outline-0
                   focus:border-accent-blue
                   placeholder-text-secondary"
      />
      <button
        type="submit"
        className="px-4 py-2 
                   bg-primary-grey
                   text-primary 
                   rounded-r-md 
                   hover:bg-highlight
                   focus:outline-0
                   border border-primary-grey 
                   focus:border-accent-blue
                   transition-all"
      >
        Search
      </button>
    </form>
  );
}
