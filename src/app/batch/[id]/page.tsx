import axios from "axios";
import React from "react";
import MetadataLink from "@/components/MetadataLink";
import AddressLink from "@/components/AddressLink";
import { InfoTable, KeyColumn, ValueColumn } from "@/components/InfoTable";
import ResolvedMetadata from "@/components/ResolvedMetadata";
import Header from "@/components/Header";
import { CreditBatch } from "@/utils/types";
import ProjectLink from "@/components/ProjectLink";
import InfoStats from "@/components/InfoStats";

interface CreditBatchPageProps {
  params: {
    id: string;
  };
}

export default async function CreditBatchPage({
  params,
}: CreditBatchPageProps) {
  let { id } = params;
  let creditBatch: CreditBatch | null = null;
  let error: string | null = null;
  let supply: {
    tradable_amount: number;
    retired_amount: number;
    cancelled_amount: number;
  } | null = null;

  const parseSupply = (supplyResponse: any) => {
    return {
      tradable_amount: parseFloat(supplyResponse.tradable_amount),
      retired_amount: parseFloat(supplyResponse.retired_amount),
      cancelled_amount: parseFloat(supplyResponse.cancelled_amount),
    };
  };

  try {
    const creditBatchResponse = await axios.get(
      `http://mainnet.regen.network:1317/regen/ecocredit/v1/batch/${id}`
    );
    creditBatch = creditBatchResponse.data["batch"];

    const supplyResponse = await axios.get(
      `http://mainnet.regen.network:1317/regen/ecocredit/v1/supply/${id}`
    );
    supply = parseSupply(supplyResponse.data);
  } catch (err) {
    error = "Error fetching dataset. Please check the denom.";
  }

  if (error) return <div>{error}</div>;
  if (!creditBatch || !supply) return <div>Loading...</div>;

  const stats = [
    { header: "Tradable Credits", value: supply.tradable_amount },
    { header: "Retired Credits", value: supply.retired_amount },
    { header: "Cancelled Credits", value: supply.cancelled_amount },
  ];

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Header />
      {creditBatch && (
        <>
          <h3 className="mb-2 text-lg font-semibold">
            Credit Batch: {creditBatch.denom}
          </h3>
          <div className="text-xs p-4 bg-gray-50 rounded-lg border border-gray-300">
            <InfoTable>
              <KeyColumn>Issuer:</KeyColumn>
              <ValueColumn>
                <AddressLink address={creditBatch.issuer} />
              </ValueColumn>
              <KeyColumn>Project ID:</KeyColumn>
              <ValueColumn>
                {<ProjectLink id={creditBatch.project_id} />}
              </ValueColumn>
              <KeyColumn>Start Date:</KeyColumn>
              <ValueColumn>{creditBatch.start_date}</ValueColumn>
              <KeyColumn>End Date:</KeyColumn>
              <ValueColumn>{creditBatch.end_date}</ValueColumn>
              <KeyColumn>Issuance Date:</KeyColumn>
              <ValueColumn>{creditBatch.issuance_date}</ValueColumn>
              <KeyColumn>Open:</KeyColumn>
              <ValueColumn>{creditBatch.open ? "Yes" : "No"}</ValueColumn>
              <KeyColumn>Metadata:</KeyColumn>
              <ValueColumn>
                <MetadataLink iri={creditBatch.metadata} />
              </ValueColumn>
            </InfoTable>
          </div>
          <div className="mt-4">
            <h3 className="mb-2 text-lg font-semibold">Credit Supply</h3>
            <InfoStats stats={stats} />
          </div>
          <ResolvedMetadata iri={creditBatch.metadata} />
        </>
      )}
    </div>
  );
}
