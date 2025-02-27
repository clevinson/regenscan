import React, { useEffect, useState } from "react";
import axios from "axios";
import JsonViewer from "./JsonViewer";

interface ResolvedMetadataProps {
  iri: string;
}

export default async function ResolvedMetadata({ iri }: ResolvedMetadataProps) {
  let metadata: any = null;
  let error: string | null = null;

  try {
    const metadataResponse = await axios.get(
      `http://api.registry.regen.network/data/v1/metadata-graph/${iri}`
    );
    metadata = metadataResponse.data;
  } catch (err) {
    error = "Error fetching dataset. Please check the IRI.";
  }

  if (error) return <div>{error}</div>;
  if (!metadata) return <div>Loading...</div>;

  return (
    <div className="">
      <h3 className="my-2 text-lg font-semibold">Resolved Metadata</h3>
      <div className="text-xs overflow-y-auto p-4 bg-gray-50 rounded-lg border border-gray-300">
        <JsonViewer payload={metadata} />
      </div>
    </div>
  );
}
