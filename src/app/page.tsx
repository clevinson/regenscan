"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [iri, setIri] = useState<string>("");
  const router = useRouter();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (iri) {
      router.push(`/dataset/${iri}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">
        Regen Network Dataset Explorer
      </h1>
      <form onSubmit={handleSubmit} className="flex text-xs items-center">
        <input
          type="text"
          value={iri}
          onChange={(e) => setIri(e.target.value)}
          placeholder="Enter IRI"
          className="px-4 py-2 w-[480px] border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Explore Dataset
        </button>
      </form>
    </div>
  );
}
