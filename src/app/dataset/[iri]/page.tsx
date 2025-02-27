import axios from "axios";
import JsonViewer from "../../../components/JsonViewer";
import DatasetInfo from "@/components/DatasetInfo";
import { Reference } from "../../../utils/types";
import React from "react";
import dayjs from "dayjs";
import Header from "@/components/Header";

interface DatasetProps {
  params: {
    iri: string;
  };
}

export default async function Dataset({ params }: DatasetProps) {
  let { iri } = params;
  iri = decodeURIComponent(iri);
  let dataset: any | null = null;
  let usedIn: Array<Reference> | null = [];
  let anchorTimestamp: string | null = null;
  let attestations: string | null = null;
  let resolvers: string[] | null = null;
  let datasetId: string | null = null;
  let datasetType: string | null = null;
  let error: string | null = null;

  try {
    const [
      dataServerResponse,
      anchorResponse,
      attestationsResponse,
      resolversResponse,
    ] = await Promise.all([
      axios.get(
        `http://api.registry.regen.network/data/v1/metadata-graph/${iri}`
      ),
      axios.get(
        `http://mainnet.regen.network:1317/regen/data/v1/anchor-by-iri/${iri}`
      ),
      axios.get(
        `http://mainnet.regen.network:1317/regen/data/v1/attestations-by-iri/${iri}`
      ),
      axios.get(
        `http://mainnet.regen.network:1317/regen/data/v1/resolvers-by-iri/${iri}`
      ),
    ]);

    // Extract and format data
    const payload = dataServerResponse.data;
    datasetId = payload["@id"] || null;
    datasetType = payload["@type"] || null;

    if (datasetId && datasetId.includes("app.regen.network/project/")) {
      const projectId = datasetId.split("app.regen.network/project/")[1];
      const response = await axios.get(
        `http://mainnet.regen.network:1317/regen/ecocredit/v1/project/${projectId}`
      );
      if (response.data["project"]["metadata"] == iri) {
        usedIn.push({ refType: "project", id: projectId });
      }
    } else if (
      datasetType &&
      datasetType.match(/^regen:[A-Z]{1,3}\d{2}-CreditClass$/)
    ) {
      const match = datasetType.match(/^regen:([A-Z]{1,3}\d{2})-CreditClass$/);
      const creditClassId = match ? match[1] : "";
      const response = await axios.get(
        `http://mainnet.regen.network:1317/regen/ecocredit/v1/class/${creditClassId}`
      );
      if (response.data["class"]["metadata"] == iri) {
        usedIn.push({ refType: "creditClass", id: creditClassId });
      }
    }

    anchorTimestamp = anchorResponse.data?.anchor?.timestamp
      ? dayjs(anchorResponse.data.anchor.timestamp).format(
          "MMMM D, YYYY h:mm A"
        )
      : null;

    attestations = attestationsResponse.data?.attestations?.join(", ") || null;

    resolvers =
      resolversResponse.data?.resolvers?.map(
        (resolver: { url: string }) => resolver.url
      ) || null;

    dataset = {
      payload: payload,
    };
  } catch (err) {
    error = "Error fetching dataset. Please check the IRI.";
  }

  if (error) return <div>{error}</div>;
  if (!dataset) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Header />
      <DatasetInfo
        iri={iri}
        usedIn={usedIn}
        datasetId={datasetId}
        datasetType={datasetType}
        anchorTimestamp={anchorTimestamp}
        attestations={attestations}
        resolvers={resolvers}
      />

      <h3 className="mb-2 text-lg font-semibold">Anchored Dataset</h3>
      <div className="text-xs max-h-96 overflow-y-auto p-4 bg-gray-50 rounded-lg border border-gray-300">
        <JsonViewer payload={dataset.payload} />
      </div>
    </div>
  );
}
